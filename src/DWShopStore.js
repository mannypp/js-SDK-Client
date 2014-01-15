/**
 * This class is used for retrieving store resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopStore = (function () {

/**
 * @constructor
 */
function DWShopStore() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopStore.prototype = new DWAPIResource();
DWShopStore.prototype.constructor = DWShopStore;

/**
 * Override the base class implementation of this method to return the stores resource identifier.
 *
 * @memberOf DWShopStore
 * @returns the resource identifier for stores
 */
DWShopStore.prototype.resourceUrl = function(id) {
    return "stores";
};

return {
    /**
     * This method creates and/or returns an instance of DWShopStore.
     *
     * @name DWShopStore.getInstance()
     * @returns an instance of DWShopStore
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopStore();
		return instance;
	}
};

})();