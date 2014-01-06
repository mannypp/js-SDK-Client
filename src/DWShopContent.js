var DWShopContent = (function() {

function DWShopContent() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopContent.prototype = new DWAPIResource();
DWShopContent.prototype.constructor = DWShopContent;

DWShopContent.prototype.resourceUrl = function() {
    return "content";
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopContent();
		return instance;
	}
};

})();