var DWShopPromotion = (function() {

function DWShopPromotion() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopPromotion.prototype = new DWAPIResource();
DWShopPromotion.prototype.constructor = DWShopPromotion;

DWShopPromotion.prototype.resourceUrl = function(id) {
    return "promotions";
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopPromotion();
		return instance;
	}
};

})();