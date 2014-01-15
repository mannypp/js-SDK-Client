/**
 * This class is used for retrieving category resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopCategory = (function() {

/**
 * @constructor
 */
function DWShopCategory() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopCategory.prototype = new DWAPIResource();
DWShopCategory.prototype.constructor = DWShopCategory;

/**
 * Override the base class implementation of this method to return the categories resource identifier.
 *
 * @memberOf DWShopCategory
 * @returns the resource identifier for categories
 */
DWShopCategory.prototype.resourceUrl = function() {
	return "categories";
};

/**
 * Override the base class' implementation of findById to add the 'levels' URL parameter.
 *
 * @memberOf DWShopCategory
 * @param id {string} the resource identifier
 * @param subresource {string} an optional subresource (such as images, variations, etc)
 * @param urlParams {object} an optional object containing properties to be appended to the URL string as parameters
 * @returns the requested resource
 */
DWShopCategory.prototype.findById = function(id, subresource, urlParams) {
	if (urlParams !== undefined && urlParams !== null) {
		if (!urlParams.hasOwnProperty("levels"))
			urlParams[DWAPIConstants.get("LEVELS")] = 1;
	}
	else {
		urlParams = {};
		urlParams[DWAPIConstants.get("LEVELS")] = 1;
	}

	if (subresource !== undefined && subresource !== null && subresource.trim().length > 0)
		return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithIdAndSubresource(id, subresource) + "?" +
				this.convertParamsToString(urlParams));

	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) +
	        "?" + this.convertParamsToString(urlParams));
};

return {
	/**
	 * This method creates and/or returns an instance of DWShopCategory.
	 *
	 * @name DWShopCategory.getInstance()
	 * @returns an instance of DWShopCategory
	 */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopCategory();
		return instance;
	}
};

})();