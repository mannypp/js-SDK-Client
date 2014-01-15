/**
 * This class is used for retrieving promotion resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopPromotion = (function() {

/**
 * @constructor
 */
function DWShopPromotion() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopPromotion.prototype = new DWAPIResource();
DWShopPromotion.prototype.constructor = DWShopPromotion;

/**
 * Override the base class implementation of this method to return the promotions resource identifier.
 *
 * @memberOf DWShopPromotion
 * @returns the resource identifier for promotions
 */
DWShopPromotion.prototype.resourceUrl = function(id) {
    return "promotions";
};

return {
    /**
     * This method creates and/or returns an instance of DWShopPromotion.
     *
     * @name DWShopPromotion.getInstance()
     * @returns an instance of DWShopPromotion
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopPromotion();
		return instance;
	}
};

})();