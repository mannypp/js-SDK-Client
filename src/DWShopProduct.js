var DWShopProduct = (function() {

function DWShopProduct() {
    DWAPIResource.call(this);
}

var instance = null;
	
DWShopProduct.prototype = new DWAPIResource();
DWShopProduct.prototype.constructor = DWShopProduct;

DWShopProduct.prototype.resourceUrl = function() {
	return "products";
};

DWShopProduct.prototype.findByIdWithExpand = function(id, expand) {
    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) + (expand === null ? "" : "?expand=" + expand));
};

DWShopProduct.prototype.loadProductLink = function(link) {
	return this.findWithUrl(link + "?expand=images,variations");
};

return {
	getInstance: function() {
        if (instance === undefined || instance === null)
            instance = new DWShopProduct();
        return instance;
	}
};

})();