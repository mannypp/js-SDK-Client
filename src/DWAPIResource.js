/**
 * DWAPIResource is the base class for all the resource classes. It contains functionality that
 * is common to all resources.
 *
 * @constructor
 * @class
 * @author Manny Parasirakis
 */
function DWAPIResource() {
}

DWAPIResource.prototype.errorFunctions = null;

/**
 * Registers an error handler method whose signature is handleError(jqXHR, status, errmsg)
 *
 * @param errorHandler {function} the error handler function to use
 */
DWAPIResource.prototype.registerErrorHandler = function(errorHandler) {
	if (this.errorFunctions === null)
		this.errorFunctions = [];
    this.errorFunctions.push(errorHandler);
};

/**
 * This method allows for the ETag response header to be retrieved and stored into the DWAPIManager
 * instance for the next operation which will require the ETag to be supplied in the If-Match request
 * header.
 *
 * @param promise {object} the jquery promise object to register the callback to
 * @returns the given promise object in order to chain calls
 */
DWAPIResource.prototype.captureETag = function(promise) {
	if (promise !== null) {
	    promise.done(function(result, status, jqXHR) {
			var etagHeader = jqXHR.getResponseHeader("ETag");
			if (etagHeader !== null) {
				DWAPIManager.getInstance().etag = etagHeader;
				console.log("ETag: " + etagHeader);
			}
		});
	}

	return promise;
};

/**
 * Utility method used to translate an object's properties to a url parameter string.
 *
 * @param urlParams {object} an object which contains key-value pairs of properties to be translated
 * @returns {string} a url parameter string
 */
DWAPIResource.prototype.convertParamsToString = function(urlParams) {
	var params = "";

	if (urlParams !== undefined && urlParams !== null) {
		for (var key in urlParams) {
			if (urlParams.hasOwnProperty(key)) {
				params += (params.length === 0 ? "?" : "&");
				params += key + "=" + urlParams[key];
			}
		}
	}

	return params;
};

/**
 * This method must be overridden by subclasses. It should return the resource's URL identifier.
 *
 * @returns the resource's URL identifier
 */
DWAPIResource.prototype.resourceUrl = function() {
	return null;
};

/**
 * Returns the resource's URL identifier concatenated with the given id string
 *
 * @param id {string} a valid resource identifier to concatenate
 * @returns the resource's URL identifier concatenated with the given id string
 */
DWAPIResource.prototype.resourceUrlWithId = function(id) {
    return this.resourceUrl() + "/" + id;
};

/**
 * Returns the resource's URL identifier concatenated with the given ids string
 *
 * @param ids {array} an array containing strings of valid resource identifiers
 * @returns {string} the resource's URL identifier concatenated with ids in the given array
 */
DWAPIResource.prototype.resourceUrlWithMultipleIds = function(ids) {
	if (DWAPIManager.getInstance().dw.jquery.isArray(ids))
		return this.resourceUrl() + "/(" + ids.toString() + ")";

	this.errorFunction(null, "Error", "ids parameter must be an array.");
};

/**
 * Returns the resource's URL identifier concatenated with the given id string and subresource string
 *
 * @param id {string} a valid resource identifier to concatenate
 * @param subresource {string} a valid subresource identifier to concatenate
 * @returns the resource's URL identifier concatenated with the given id string and subresource string
 */
DWAPIResource.prototype.resourceUrlWithIdAndSubresource = function(id, subresource) {
	if (subresource !== undefined)
		return this.resourceUrlWithId(id) + "/" + subresource;

	this.errorFunction(null, "Error", "subresource parameter must be supplied.");
};

/**
 * Returns the resource's URL identifier concatenated with the given action
 *
 * @param action {string} a valid resource action to concatenate
 * @returns {string} the resource's URL identifier concatenated with the given action
 */
DWAPIResource.prototype.resourceUrlWithAction = function(action) {
    return this.resourceUrl() + "/" + action;
};

/**
 * Retrieves a resource. This method should be used when retrieving a resource which does not have
 * an identifier. For example: "/site".
 *
 * @param urlParams {object} an object which contains properties to be converted to a URL parameter string
 * @returns the requested resource
 */
DWAPIResource.prototype.retrieveResource = function(urlParams) {
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrl() + this.convertParamsToString(urlParams));
};

/**
 * Retrieves a resource by id.
 *
 * @param id {string} the resource identifier
 * @param subresource {string} an optional subresource (such as images, variations, etc)
 * @param urlParams {object} an optional object containing properties to be appended to the URL string as parameters
 * @returns the requested resource
 */
DWAPIResource.prototype.findById = function(id, subresource, urlParams) {
	if (subresource !== undefined && subresource !== null && subresource.trim().length > 0)
		return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithIdAndSubresource(id, subresource) +
				this.convertParamsToString(urlParams));

	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) + this.convertParamsToString(urlParams));
};

/**
 * Retrieves multiple resources by id.
 *
 * @param ids {array} an array of resource identifiers
 * @param urlParams {object} an optional object containing properties to be appended to the URL string as parameters
 * @returns the requested resources
 */
DWAPIResource.prototype.findByMultipleIds = function(ids, urlParams) {
    return this.findWithUrl(this.getSecureBaseURL() + "/" + this.resourceUrlWithMultipleIds(ids) + this.convertParamsToString(urlParams));
};

/**
 * Returns the requested resource or resources using the given URL.
 *
 * @param url {string} a URL string
 * @returns the requested resource
 */
DWAPIResource.prototype.findWithUrl = function(url) {
    return this.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      headers: {'x-dw-client-id': DWAPIManager.getInstance().clientId}
    });
};

/**
 * This is a method which wraps all calls to jquery's ajax method.
 *
 * @private
 * @param json {object} a JSON object to pass to jquery's ajax method
 * @returns the requested resource
 */
DWAPIResource.prototype.ajax = function(json) {
	var apiManager = DWAPIManager.getInstance();

	json.timeout = apiManager.requestTimeout;
	var promise = apiManager.dw.jquery.ajax(json);

	if (this.errorFunctions !== null) {
		for (var i = 0; i < this.errorFunctions.length; i++)
			promise.fail(this.errorFunctions[i]);
    }

    return promise;
};

/**
 * A convenience method to get the secure base URL.
 *
 * @protected
 * @returns the secure base URL
 */
DWAPIResource.prototype.getSecureBaseURL = function() {
	return DWAPIManager.getInstance().getSecureBaseURL();
};

