function DWShopCategory() {
    DWAPIResource.call(this);
}

DWShopCategory.prototype = new DWAPIResource();
DWShopCategory.prototype.constructor = DWShopCategory;

DWShopCategory.prototype.resourceUrl = function() {
	return "categories";
};

DWShopCategory.prototype.findById = function(id) {
    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) + "?levels=1");
};
