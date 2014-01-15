/**
 * This class is used for retrieving product resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopProduct = (function() {

/**
 * @constructor
 */
function DWShopProduct() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopProduct.prototype = new DWAPIResource();
DWShopProduct.prototype.constructor = DWShopProduct;

/**
 * Override the base class implementation of this method to return the product resource identifier.
 *
 * @memberOf DWShopProduct
 * @returns the resource identifier for categories
 */
DWShopProduct.prototype.resourceUrl = function() {
	return "products";
};

/**
 * Retrieves a resource by id. Optionally takes a comma separated list of expansions.
 *
 * @memberOf DWShopProduct
 * @param id {string} the resource identifier
 * @param expand {string} a comma separated list of expansions. For example: images,variations
 * @param urlParams {object} an optional object containing properties to be appended to the URL string as parameters
 * @returns the requested resource
 */
DWShopProduct.prototype.findByIdWithExpand = function(id, expand, urlParams) {
    if (expand === undefined || expand === null)
        return this.findById(id);

    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) + "?" + DWAPIConstants.get("EXPAND") + "=" + expand +
            "&" + this.convertParamsToString(urlParams));
};

/**
 * Loads the details of a product link.
 *
 * @memberOf DWShopProduct
 * @param link a URL of a product link
 * @returns the requested product link
 */
DWShopProduct.prototype.loadProductLink = function(link) {
	return this.findWithUrl(link + "?" + DWAPIConstants.get("EXPAND") + "=" + DWAPIConstants.get("IMAGES") + "," + DWAPIConstants.get("VARIATIONS"));
};

return {
    /**
     * This method creates and/or returns an instance of DWShopProduct.
     *
     * @name DWShopProduct.getInstance()
     * @returns an instance of DWShopProduct
     */
	getInstance: function() {
        if (instance === undefined || instance === null)
            instance = new DWShopProduct();
        return instance;
	}
};

})();