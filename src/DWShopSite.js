/**
 * This class is used for retrieving site resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopSite = (function() {

/**
 * @constructor
 */
function DWShopSite() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopSite.prototype = new DWAPIResource();
DWShopSite.prototype.constructor = DWShopSite;

/**
 * Override the base class implementation of this method to return the site resource identifier.
 *
 * @memberOf DWShopSite
 * @returns the resource identifier for site
 */
DWShopSite.prototype.resourceUrl = function(id) {
    return "site";
};

return {
    /**
     * This method creates and/or returns an instance of DWShopSite.
     *
     * @name DWShopSite.getInstance()
     * @returns an instance of DWShopSite
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopSite();
		return instance;
	}
};

})();