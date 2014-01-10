var DWShopBasket = (function() {

function DWShopBasket() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopBasket.prototype = new DWAPIResource();
DWShopBasket.prototype.constructor = DWShopBasket;

DWShopBasket.prototype.captureBasket = function(promise) {
	if (promise !== null) {		
	    promise.done(function(result, status, jqXHR) {
			if (result !== undefined && result !== null) {
				DWAPIManager.getInstance().currentBasket = result;
				console.log(JSON.stringify(result));
			}
		});
	}
	
	return promise;
};

DWShopBasket.prototype.resourceUrl = function() {
    return "basket/this";
};

DWShopBasket.prototype.getBasket = function() {
    var promise = this.retrieveResource();
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.checkout = function() {
	var promise = this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("checkout"));
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.getShippingMethods = function() {
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/shipping_methods"));
};

DWShopBasket.prototype.getPaymentMethods = function() {
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/payment_methods"));
};

DWShopBasket.prototype.addProduct = function(productId, quantity) {
	if (quantity === undefined)
		quantity = 1;
	
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: "{\"product_id\": \"" + productId + "\", \"quantity\": " + quantity + "}",
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("add"),
	  dataType: "json"
	});

    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.removeProduct = function(productId) {
    var patchData = null;
    var items = DWAPIManager.getInstance().currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{\"product_items\":[{_delete_at:" + i + "}]}";     
            break;
        }
    }
    
    if (patchData === null)
        return;
    
    return this.sendBasketUpdatesToServer(patchData);
};

DWShopBasket.prototype.updateQuantity = function(productId, quantity) {
    var patchData = null;
    var items = DWAPIManager.getInstance().currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{\"product_items\":[{_at:" + i + ", \"quantity\":" + quantity + "}]}";        
            break;
        }
    }
    
    if (patchData === null)
        return;
        
    return this.sendBasketUpdatesToServer(patchData);
};

DWShopBasket.prototype.updateQuantities = function(updates) {
    var patchData = "{product_items:[";
    var items = DWAPIManager.getInstance().currentBasket.product_items;
    
    for (var u = 0; u < updates.length; u++) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].product_id == updates[u].product_id) {
                patchData += "{\"_at\":" + i + ", \"quantity\":" + updates[u].quantity + "}";
                break;    
            }
        }
        if (u < updates.length - 1)
            patchData += ",";
    }
    
    patchData += "]}";
    
    return this.sendBasketUpdatesToServer(patchData);
};

DWShopBasket.prototype.addCoupon = function(couponCode) {
	return this.sendBasketUpdatesToServer("{\"coupon_items\": [{\"code\": \"" + couponCode + "\"}]}");	
};

DWShopBasket.prototype.removeCoupon = function(couponCode) {
    var patchData = null;
    var items = DWAPIManager.getInstance().currentBasket.coupon_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].code == couponCode) {
            patchData = "{\"coupon_items\":[{_delete_at: " + i + "}]}";     
            break;
        }
    }
    
    if (patchData === null)
        return;
    
    return this.sendBasketUpdatesToServer(patchData);
};

DWShopBasket.prototype.updateBundledProductVariantSelection = function(productId, bundledProductId, newProductId) {
    var patchData = null;
    var basket = DWAPIManager.getInstance().currentBasket;
    var items = basket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{\"product_items\": [{_at:" + i + ", \"bundled_product_items\": [{_at: ";
            
            var bundledItems = items[i].bundled_product_items;
            for (var j = 0; j < bundledItems.length; j++) {
                if (bundledItems[j].product_id == bundledProductId) {
					patchData += j + ", \"product_id\": \"" + newProductId + "\"}]}]}";
					break;
                }
            }
            break;
        }
    }
    
    if (patchData === null)
        return;
        
    return this.sendBasketUpdatesToServer(patchData);
};

DWShopBasket.prototype.updateOptionSelection = function(productId, optionId, newOptionValue) {
    var patchData = null;
    var basket = DWAPIManager.getInstance().currentBasket;
    var items = basket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{\"product_items\": [{_at:" + i + ", \"option_items\": [{_at: ";
            
            var optionItems = items[i].option_items;
            for (var j = 0; j < optionItems.length; j++) {
                if (optionItems[j].option_id == optionId) {
					patchData += j + ", \"option_value_id\": \"" + newOptionValue + "\"}]}]}";
					break;
                }
            }
            break;
        }
    }
    
    if (patchData === null)
        return;
        
    return this.sendBasketUpdatesToServer(patchData);
};

DWShopBasket.prototype.setCustomerInfo = function(customerInfo) {
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: JSON.stringify(customerInfo),
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_customer_info"),
	  dataType: "json"
	});
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.setPaymentMethod = function(paymentMethod) {
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: "{\"id\": \"" + paymentMethod + "\"}",
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_payment_method"),
	  dataType: "json"
	});
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.setBillingAddress = function(billingAddress) {
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: JSON.stringify(billingAddress),
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_billing_address"),
	  dataType: "json"
	});
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.setShippingMethod = function(shippingMethod) {
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: "{\"id\": \"" + shippingMethod + "\"}",
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_shipping_method"),
	  dataType: "json"
	});
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.setShippingAddress = function(shippingAddress) {
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: JSON.stringify(shippingAddress),
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_shipping_address"),
	  dataType: "json"
	});
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

DWShopBasket.prototype.submit = function() {
	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/submit"),
	  dataType: "json"
	});
    
    this.captureETag(promise);
    promise.done(function(result) {
		DWAPIManager.getInstance().currentBasket = null;
    });

    return promise;
};

DWShopBasket.prototype.sendBasketUpdatesToServer = function(patchData) {
    var promise = this.ajax({
      type: "PATCH",
      contentType: "application/json",
      data: patchData,
      headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
      url: this.getSecureBaseURL() + this.resourceUrl(),
      dataType: "json"
    });
    
    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopBasket();
		return instance;
	}
};

})();