var DWShopCategory = (function() {

function DWShopCategory() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopCategory.prototype = new DWAPIResource();
DWShopCategory.prototype.constructor = DWShopCategory;

DWShopCategory.prototype.resourceUrl = function() {
	return "categories";
};

DWShopCategory.prototype.findById = function(id, subresource) {
	if (subresource !== undefined && subresource !== null && subresource.trim().length > 0)
		return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithIdAndSubresource(id, subresource) + "?levels=1");
	
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) + "?levels=1");
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopCategory();
		return instance;
	}
};

})();