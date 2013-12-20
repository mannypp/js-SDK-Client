function DWShopBasket() {
    DWAPIResource.call(this);
}

DWShopBasket.prototype = new DWAPIResource();
DWShopBasket.prototype.constructor = DWShopBasket;

DWShopBasket.prototype.currentBasket = null;
DWShopBasket.prototype.etag = null;

DWShopBasket.prototype.resourceUrl = function() {
    return "basket/this";
};

DWShopBasket.prototype.getBasket = function() {
    return this.retrieveResource();
};

DWShopBasket.prototype.checkout = function() {
	return this.ajax({
	  type: "GET",
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.getShippingMethods = function() {
	return this.ajax({
	  type: "GET",
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/shipping_methods"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.getPaymentMethods = function() {
	return this.ajax({
	  type: "GET",
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/payment_methods"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.addToBasket = function(productId, quantity) {
	return this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: "{product_id: \"" + productId + "\", quantity: " + quantity + "}",
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("add"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.removeFromBasket = function(productId) {
    var patchData = null;
    var items = this.currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{product_items:[{_delete_at:" + i + "}]}";     
            break;
        }
    }
    
    if (patchData === null)
        return;
    
    return this.sendUpdateToServer(patchData);
};

DWShopBasket.prototype.updateQuantity = function(productId, quantity) {
    var patchData = null;
    var items = this.currentBasket.product_items;
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].product_id == productId) {
            patchData = "{product_items:[{_at:" + i + ",quantity:" + quantity + "}]}";        
            break;
        }
    }
    
    if (patchData === null)
        return;
        
    return this.sendUpdateToServer(patchData);
};

DWShopBasket.prototype.updateQuantities = function(updates) {
    var patchData = "{product_items:[";
    var items = this.currentBasket.product_items;
    
    for (var u = 0; u < updates.length; u++) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].product_id == updates[u].product_id) {
                patchData += "{_at:" + i + ",quantity:" + updates[u].quantity + "}";
                break;    
            }
        }
        if (u < updates.length - 1)
            patchData += ",";
    }
    
    patchData += "]}";
    
    return this.sendUpdateToServer(patchData);
};

DWShopBasket.prototype.setCustomerInfo = function(customerInfo) {
	return this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: customerInfo,
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_customer_info"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.setPaymentMethod = function(paymentMethod) {
	return this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: paymentMethod,
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_payment_method"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.setBillingAddress = function(billingAddress) {
	return this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: billingAddress,
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_billing_address"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.setShippingAddress = function(shippingAddress) {
	return this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: shippingAddress,
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/set_shipping_address"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.submit = function() {
	return this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  headers: {"x-dw-client-id": clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/submit"),
	  dataType: "json"
	});
};

DWShopBasket.prototype.sendUpdateToServer = function(patchData) {
    return this.ajax({
      type: "PATCH",
      contentType: "application/json",
      data: patchData,
      headers: {"If-Match": this.etag, "x-dw-client-id": clientId},
      url: this.getSecureBaseURL() + this.resourceUrl(),
      dataType: "json"
    });
};
