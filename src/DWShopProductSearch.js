function DWShopProductSearch() {
    DWAPIResource.call(this);
}

DWShopProductSearch.prototype = new DWAPIResource();
DWShopProductSearch.prototype.constructor = DWShopProductSearch;

DWShopProductSearch.prototype.resourceUrl = function() {
	return "product_search";
};

DWShopProductSearch.prototype.search = function(query, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?q=" + query;
	return this.sendRequestToServer(url);
};

DWShopProductSearch.prototype.search = function(subresource, query, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "/" + subresource + "?q=" + query;
	return this.sendRequestToServer(url);
};

DWShopProductSearch.prototype.sendRequestToServer = function(url) {
	if (start != null)
		url += "&start=" + start;
	if (count != null)
		url += "&count=" + count;
	if (refine != null)
		url += "&refine=" + refine;
	if (sort != null)
		url += "&sort=" + sort;
	if (expand != null)
		url += "&expand=" + expand;

	return this.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: url,
	  dataType: "json"
	});	
};

