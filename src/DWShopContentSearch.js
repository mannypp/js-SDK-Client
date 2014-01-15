/**
 * This class is used for searching content resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopContentSearch = (function() {

/**
 * @constructor
 */
function DWShopContentSearch() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopContentSearch.prototype = new DWAPIResource();
DWShopContentSearch.prototype.constructor = DWShopContentSearch;

/**
 * Override the base class implementation of this method to return the content search resource identifier.
 *
 * @memberOf DWShopContentSearch
 * @returns the resource identifier for content search
 */
DWShopContentSearch.prototype.resourceUrl = function() {
	return "content_search";
};

/**
 * Search for a content resource.
 *
 * @memberOf DWShopContentSearch
 * @param query {string} the query string to search for
 * @param start {number} the first item in the results to return. Used in conjunction with count.
 * @param count {number} the number of result items to return. Server default is 25.
 * @param refine {string} Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and value(s) are separated by '='. Multiple values can be provided by separating them using a pipe (URL encoded = "|"). Value ranges can be specified like this: refine=foo=(100..500) Multiple refine parameters can be provided by adding an underscore in combination with an integer counter right behind the parameter name and a counter range 1..9. I.e. refine_1=c_refinementType=type1|type2|type3. The following system refinement attribute ids are supported: fdid: Allows to refine per content folder id.
 * @param sort {string} Parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are separated by '='. The value describes the sort direction. Possible values are 'asc' and 'desc', for ascending or descending sort direction. I.e. sort=c_myAttribute=desc. Precondition: You have to select your sorting attributes in Business Manager > YourSite > Search Indexes > Content Index > Sorting Attributes.
 * @returns the requested content search results
 */
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
    /**
     * This method creates and/or returns an instance of DWShopContentSearch.
     *
     * @name DWShopContentSearch.getInstance()
     * @returns an instance of DWShopContentSearch
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopContentSearch();
		return instance;
	}
};

})();