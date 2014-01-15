/**
 * This class is used for retrieving content resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopContent = (function() {

/**
 * @constructor
 */
function DWShopContent() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopContent.prototype = new DWAPIResource();
DWShopContent.prototype.constructor = DWShopContent;

/**
 * Override the base class implementation of this method to return the content resource identifier.
 *
 * @memberOf DWShopContent
 * @returns the resource identifier for content
 */
DWShopContent.prototype.resourceUrl = function() {
    return "content";
};

return {
	/**
	 * This method creates and/or returns an instance of DWShopContent.
	 *
     * @name DWShopContent.getInstance()
	 * @returns an instance of DWShopContent
	 */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopContent();
		return instance;
	}
};

})();