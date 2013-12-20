function DWShopContentSearch() {
    DWAPIResource.call(this);
}

DWShopContentSearch.prototype = new DWAPIResource();
DWShopContentSearch.prototype.constructor = DWShopContentSearch;

DWShopContentSearch.prototype.resourceUrl = function() {
	return "content_search";
};

DWShopContentSearch.prototype.search = function(query, start, count, refine, sort) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?q=" + query;
	if (start != null)
		url += "&start=" + start;
	if (count != null)
		url += "&count=" + count;
	if (refine != null)
		url += "&refine=" + refine;
	if (sort != null)
		url += "&sort=" + sort;
	
	return this.ajax({
	  type: "GET",
      headers: {"x-dw-client-id": clientId},
	  url: url,
	  dataType: "json"
	});
};
