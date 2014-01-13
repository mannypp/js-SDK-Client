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
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?" + DWAPIConstants.get("QUERY") + "=" + query;
	return this.sendRequestToServer(url, start, count, refine, sort, expand);
};

DWShopProductSearch.prototype.searchWithSubresource = function(query, subresource, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "/" + subresource + "?" + DWAPIConstants.get("QUERY") + "=" + query;
	return this.sendRequestToServer(url, start, count, refine, sort, expand);
};

DWShopProductSearch.prototype.sendRequestToServer = function(url, start, count, refine, sort, expand) {
	if (start !== undefined && start !== null)
		url += "&" + DWAPIConstants.get("START") + "=" + start;
	if (count !== undefined && count !== null)
		url += "&" + DWAPIConstants.get("COUNT") + "=" + count;
	if (refine !== undefined && refine !== null)
		url += "&" + DWAPIConstants.get("REFINE") + "=" + refine;
	if (sort !== undefined && sort !== null)
		url += "&" + DWAPIConstants.get("SORT") + "=" + sort;
	if (expand !== undefined && expand !== null)
		url += "&" + DWAPIConstants.get("EXPAND") + "=" + expand;

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
