function DWShopProduct() {
    DWAPIResource.call(this);
}

DWShopProduct.prototype = new DWAPIResource();
DWShopProduct.prototype.constructor = DWShopProduct;

DWShopProduct.prototype.resourceUrl = function() {
	return "products";
};

DWShopProduct.prototype.findByIdWithExpand = function(id, expand) {
    var url = this.getSecureBaseURL() + this.resourceUrlWithId(id) + (expand === null ? "" : "?expand=" + expand);
    
    return this.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: url,
      dataType: "json"
    });
};

DWShopProduct.prototype.loadProductLink = function(link) {
	return this.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: link + "?expand=images,variations",
	  dataType: "json"
	});
};
