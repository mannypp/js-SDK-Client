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
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?" + DWAPIConstants.get("QUERY") + "=" + query;

	if (start !== undefined && start !== null)
		url += "&" + DWAPIConstants.get("START") + "=" + start;
	if (count !== undefined && count !== null)
		url += "&" + DWAPIConstants.get("COUNT") + "=" + count;
	if (refine !== undefined && refine !== null)
		url += "&" + DWAPIConstants.get("REFINE") + "=" + refine;
	if (sort !== undefined && sort !== null)
		url += "&" + DWAPIConstants.get("SORT") + "=" + sort;

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