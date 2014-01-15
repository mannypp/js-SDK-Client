/**
 * This class is used for retrieving basket resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopBasket = (function() {

/**
 * @constructor
 */
function DWShopBasket() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopBasket.prototype = new DWAPIResource();
DWShopBasket.prototype.constructor = DWShopBasket;

/**
 * This method allows for the basket response object to be retrieved and stored into the DWAPIManager
 * instance.
 *
 * @memberOf DWShopBasket
 * @param promise {object} the jquery promise object to register the callback to
 * @returns {object} the given promise object in order to chain calls
 */
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

/**
 * Override the base class implementation of this method to return the basket resource identifier.
 *
 * @memberOf DWShopBasket
 * @returns {string} the resource identifier for basket
 */
DWShopBasket.prototype.resourceUrl = function() {
    return "basket/this";
};

/**
 * Retrieves the current user's basket.
 *
 * @memberOf DWShopBasket
 * @returns {object} the current user's basket
 */
DWShopBasket.prototype.getBasket = function() {
    var promise = this.retrieveResource();

    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

/**
 * Returns a complete representation of the basket.
 *
 * @memberOf DWShopBasket
 * @returns {object} a complete representation of the basket
 */
DWShopBasket.prototype.checkout = function() {
	var promise = this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("checkout"));

    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

/**
 * Returns all the available shipping methods.
 *
 * @memberOf DWShopBasket
 * @returns {object} all the available shipping methods
 */
DWShopBasket.prototype.getShippingMethods = function() {
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/shipping_methods"));
};

/**
 * Returns all the available payment methods.
 *
 * @memberOf DWShopBasket
 * @returns {object} all the available payment methods
 */
DWShopBasket.prototype.getPaymentMethods = function() {
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("checkout/payment_methods"));
};

/**
 * Adds a product to the basket.
 *
 * @memberOf DWShopBasket
 * @param productId {string} a required product id of the product to add
 * @param quantity {number} an optional quantity. If omitted, then 1 is assumed.
 * @param inventoryId {string} an optional inventory id
 * @returns {object} a jquery promise object
 */
DWShopBasket.prototype.addProduct = function(productId, quantity, inventoryId) {
	if (quantity === undefined)
		quantity = 1;

	var body = "{\"product_id\": \"" + productId + "\", \"quantity\": " + quantity;
	if (inventoryId !== undefined && inventoryId !== null)
		body += ", \"inventory_id\": \"" + inventoryId + "\"";
	body += "}";

	var promise = this.ajax({
	  type: "POST",
	  contentType: "application/json",
	  data: body,
	  headers: {'If-Match': DWAPIManager.getInstance().etag, 'x-dw-client-id': DWAPIManager.getInstance().clientId},
	  url: this.getSecureBaseURL() + this.resourceUrlWithAction("add"),
	  dataType: "json"
	});

    this.captureETag(promise);
    this.captureBasket(promise);

    return promise;
};

/**
 * Removes a product from the basket.
 *
 * @memberOf DWShopBasket
 * @param productId {string} the product id of the product to remove
 * @returns {object} a jquery promise object
 */
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

/**
 * Updates the quantity of a product in the basket.
 *
 * @memberOf DWShopBasket
 * @param productId {string} the product id of the product to update the quantity for
 * @param quantity {number} the quantity to update the product with
 * @returns {object} a jquery promise object
 */
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

/**
 * Updates multiple quantities in the basket in a single request
 *
 * @example [{"product_id": "abc", "quantity": 2},{"product_id": "def", "quantity": 3}]
 * @memberOf DWShopBasket
 * @param updates {array} an array of objects. Each object must have product_id and quantity properties
 * @returns {object} a jquery promise object
 */
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

/**
 * Adds a coupon to the basket.
 *
 * @memberOf DWShopBasket
 * @param couponCode {string} the coupon code of a valid coupon
 * @returns {object} a jquery promise object
 */
DWShopBasket.prototype.addCoupon = function(couponCode) {
	return this.sendBasketUpdatesToServer("{\"coupon_items\": [{\"code\": \"" + couponCode + "\"}]}");
};

/**
 * Removes a coupon from the basket.
 *
 * @memberOf DWShopBasket
 * @param couponCode {string} the coupon code of a coupon in the basket
 * @returns {object} a jquery promise object
 */
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

/**
 * Updates the variant selection of a bundled product in the basket.
 *
 * @memberOf DWShopBasket
 * @param productId {string} the id of the bundled product to update
 * @param bundledProductId {string} the id of the variant within the bundled product to update
 * @param newProductId {string} the product id of the new variant to replace in the bundled product
 * @returns {object} a jquery promise object
 */
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

/**
 * Updates an option of a product in the basket.
 *
 * @memberOf DWShopBasket
 * @param productId {string} the id of a product in the basket to update
 * @param optionId {string} the id of the option to update
 * @param newOptionValue {string} the new value for the option being updated
 * @returns {object} a jquery promise object
 */
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

/**
 * Sets the customer info into the basket.
 *
 * @example {
 *      "email": "someone@example.com"
 *    }
 * @memberOf DWShopBasket
 * @param customerInfo {object} a customer info object. Has a single property of 'email'.
 * @returns {object} a jquery promise object
 */
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

/**
 * Sets the payment method for the basket.
 *
 * @memberOf DWShopBasket
 * @param paymentMethod {string} the id of a valid payment method
 * @returns {object} a jquery promise object
 */
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

/**
 * Sets the billing address for the basket.
 *
 * @example {
 *     "address1":"10 Somewhere St.",
 *     "address2":"",
 *     "address_id":"8461948625703718"
 *     "address_name":"",
 *     "city":"Boston",
 *     "company_name":"",
 *     "country_code":"",
 *     "first_name":"Egon",
 *     "full_name":"Egon Krenz",
 *     "job_title":"",
 *     "last_name":"Krenz",
 *     "phone":"",
 *     "postal_code":"",
 *     "post_box":"",
 *     "preferred":true,
 *     "salutation":"",
 *     "second_name":"",
 *     "state_code":"",
 *     "suffix":"",
 *     "suite":"",
 *     "title":""
 *   }
 * @memberOf DWShopBasket
 * @param billingAddress {string} an object representing the billing address
 * @returns {object} a jquery promise object
 */
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

/**
 * Sets the shipping method for the basket.
 *
 * @memberOf DWShopBasket
 * @param shippingMethod {string} the id of a valid shipping method
 * @returns {object} a jquery promise object
 */
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

/**
 * Sets the shipping address for the basket.
 *
 * @example {
 *     "address1":"10 Somewhere St.",
 *     "address2":"",
 *     "address_id":"8461948625703718"
 *     "address_name":"",
 *     "city":"Boston",
 *     "company_name":"",
 *     "country_code":"",
 *     "first_name":"Egon",
 *     "full_name":"Egon Krenz",
 *     "job_title":"",
 *     "last_name":"Krenz",
 *     "phone":"",
 *     "postal_code":"",
 *     "post_box":"",
 *     "preferred":true,
 *     "salutation":"",
 *     "second_name":"",
 *     "state_code":"",
 *     "suffix":"",
 *     "suite":"",
 *     "title":""
 *   }
 * @memberOf DWShopBasket
 * @param shippingAddress {string} an object representing the shipping address
 * @returns {object} a jquery promise object
 */
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

/**
 * Submits the basket.
 *
 * @memberOf DWShopBasket
 * @returns {object} a jquery promise object
 */
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

/**
 * Sends a basket update request to the server.
 *
 * @memberOf DWShopBasket
 * @private
 * @param patchData {object} the body of the update request
 * @returns {object} a jquery promise object
 */
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
    /**
     * This method creates and/or returns an instance of DWShopBasket.
     *
     * @name DWShopBasket.getInstance()
     * @returns an instance of DWShopBasket
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopBasket();
		return instance;
	}
};

})();