/**
 * This class is used for retrieving product search resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopProductSearch = (function() {

/**
 * @constructor
 */
function DWShopProductSearch() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopProductSearch.prototype = new DWAPIResource();
DWShopProductSearch.prototype.constructor = DWShopProductSearch;

/**
 * Override the base class implementation of this method to return the product search resource identifier.
 *
 * @memberOf DWShopProductSearch
 * @returns the resource identifier for product search
 */
DWShopProductSearch.prototype.resourceUrl = function() {
	return "product_search";
};

/**
 * Search for products.
 *
 * @memberOf DWShopProductSearch
 * @param query {string} the query string to search for
 * @param start {number} the first item in the results to return. Used in conjunction with count.
 * @param count {number} the number of result items to return. Server default is 25.
 * @param refine {string} parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and value(s) are separated by '='. Multiple values can be provided by separating them using a pipe (URL encoded = "|"). Value ranges can be specified like this: refine=foo=(100..500) Multiple refine parameters can be provided by adding an underscore in combination with an integer counter right behind the parameter name and a counter range 1..9. I.e. refine_1=c_refinementType=type1|type2|type3. The following system refinement attribute ids are supported: fdid: Allows to refine per content folder id.
 * @param sort {string} parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are separated by '='. The value describes the sort direction. Possible values are 'asc' and 'desc', for ascending or descending sort direction. I.e. sort=c_myAttribute=desc. Precondition: You have to select your sorting attributes in Business Manager > YourSite > Search Indexes > Content Index > Sorting Attributes.
 * @returns the requested content search results
 */
DWShopProductSearch.prototype.search = function(query, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "?" + DWAPIConstants.get("QUERY") + "=" + query;
	return this.sendRequestToServer(url, start, count, refine, sort, expand);
};

/**
 * Search for products.
 *
 * @memberOf DWShopProductSearch
 * @param query {string} the query string to search for
 * @param subresource {string} a comma separated list of subresources (such as images, variations, etc)
 * @param start {number} the first item in the results to return. Used in conjunction with count.
 * @param count {number} the number of result items to return. Server default is 25.
 * @param refine {string} parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and value(s) are separated by '='. Multiple values can be provided by separating them using a pipe (URL encoded = "|"). Value ranges can be specified like this: refine=foo=(100..500) Multiple refine parameters can be provided by adding an underscore in combination with an integer counter right behind the parameter name and a counter range 1..9. I.e. refine_1=c_refinementType=type1|type2|type3. The following system refinement attribute ids are supported: fdid: Allows to refine per content folder id.
 * @param sort {string} parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are separated by '='. The value describes the sort direction. Possible values are 'asc' and 'desc', for ascending or descending sort direction. I.e. sort=c_myAttribute=desc. Precondition: You have to select your sorting attributes in Business Manager > YourSite > Search Indexes > Content Index > Sorting Attributes.
 * @returns the requested content search results
 */
DWShopProductSearch.prototype.searchWithSubresource = function(query, subresource, start, count, refine, sort, expand) {
	var url = this.getSecureBaseURL() + this.resourceUrl() + "/" + subresource + "?" + DWAPIConstants.get("QUERY") + "=" + query;
	return this.sendRequestToServer(url, start, count, refine, sort, expand);
};

/**
 * Sends the search request to the server.
 *
 * @private
 * @memberOf DWShopProductSearch
 * @param url {string} the search request URL
 * @param start {number} the first item in the results to return. Used in conjunction with count.
 * @param count {number} the number of result items to return. Server default is 25.
 * @param refine {string} parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and value(s) are separated by '='. Multiple values can be provided by separating them using a pipe (URL encoded = "|"). Value ranges can be specified like this: refine=foo=(100..500) Multiple refine parameters can be provided by adding an underscore in combination with an integer counter right behind the parameter name and a counter range 1..9. I.e. refine_1=c_refinementType=type1|type2|type3. The following system refinement attribute ids are supported: fdid: Allows to refine per content folder id.
 * @param sort {string} parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are separated by '='. The value describes the sort direction. Possible values are 'asc' and 'desc', for ascending or descending sort direction. I.e. sort=c_myAttribute=desc. Precondition: You have to select your sorting attributes in Business Manager > YourSite > Search Indexes > Content Index > Sorting Attributes.
 * @param expand {string} an expansion string for customizing the search results
 * @returns the requested search resource
 */
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
    /**
     * This method creates and/or returns an instance of DWShopProductSearch.
     *
     * @name DWShopProductSearch.getInstance()
     * @returns an instance of DWShopProductSearch
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopProductSearch();
		return instance;
	}
};

})();
