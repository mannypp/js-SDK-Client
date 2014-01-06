var DWShopStore = (function () {

function DWShopStore() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopStore.prototype = new DWAPIResource();
DWShopStore.prototype.constructor = DWShopStore;

DWShopStore.prototype.resourceUrl = function(id) {
    return "stores";
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopStore();
		return instance;
	}
};

})();