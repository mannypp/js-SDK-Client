var DWShopContentSearch = (function() {

function DWShopContentSearch() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopContentSearch.prototype = new DWAPIResource();
DWShopContentSearch.prototype.constructor = DWShopContentSearch;

DWShopContentSearch.prototype.resourceUrl = function() {
	return "content_search";
};

DWShopContentSearch.prototype.search = function(query, start, count, refine, sort) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?q=" + query;

	if (start !== undefined && start !== null)
		url += "&start=" + start;
	if (count !== undefined && count !== null)
		url += "&count=" + count;
	if (refine !== undefined && refine !== null)
		url += "&refine=" + refine;
	if (sort !== undefined && sort !== null)
		url += "&sort=" + sort;

	return this.findWithUrl(url);	
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopContentSearch();
		return instance;
	}
};

})();