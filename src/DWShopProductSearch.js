var DWShopProductSearch = (function() {

function DWShopProductSearch() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopProductSearch.prototype = new DWAPIResource();
DWShopProductSearch.prototype.constructor = DWShopProductSearch;

DWShopProductSearch.prototype.resourceUrl = function() {
	return "product_search";
};

DWShopProductSearch.prototype.search = function(query, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?q=" + query;
	return this.sendRequestToServer(url, start, count, refine, sort, expand);
};

DWShopProductSearch.prototype.searchWithSubresource = function(query, subresource, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "/" + subresource + "?q=" + query;
	return this.sendRequestToServer(url, start, count, refine, sort, expand);
};

DWShopProductSearch.prototype.sendRequestToServer = function(url, start, count, refine, sort, expand) {
	if (start !== undefined && start !== null)
		url += "&start=" + start;
	if (count !== undefined && count !== null)
		url += "&count=" + count;
	if (refine !== undefined && refine !== null)
		url += "&refine=" + refine;
	if (sort !== undefined && sort !== null)
		url += "&sort=" + sort;
	if (expand !== undefined && expand !== null)
		url += "&expand=" + expand;

	return this.findWithUrl(url);	
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopProductSearch();
		return instance;
	}
};

})();
