var DWShopSite = (function() {

function DWShopSite() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopSite.prototype = new DWAPIResource();
DWShopSite.prototype.constructor = DWShopSite;

DWShopSite.prototype.resourceUrl = function(id) {
    return "site";
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopSite();
		return instance;
	}
};

})();