function DWAPIResource() {
}

DWAPIResource.prototype.errorFunctions = null;

/**
 * Registers an error handler method whose signature is handleError(jqXHR, status, errmsg)
 *
 * @param errorHandler the error handler function to use
 */
DWAPIResource.prototype.registerErrorHandler = function(errorHandler) {
	if (this.errorFunctions === null)
		this.errorFunctions = [];
    this.errorFunctions.push(errorHandler);
};

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

DWAPIResource.prototype.resourceUrl = function() {
	return null;
};

DWAPIResource.prototype.resourceUrlWithId = function(id) {
    return this.resourceUrl() + "/" + id;
};

DWAPIResource.prototype.resourceUrlWithMultipleIds = function(ids) {
	if (DWAPIManager.getInstance().dw.jquery.isArray(ids))
		return this.resourceUrl() + "/(" + ids.toString() + ")";

	this.errorFunction(null, "Error", "ids parameter must be an array.");
};

DWAPIResource.prototype.resourceUrlWithIdAndSubresource = function(id, subresource) {
	if (subresource !== undefined)
		return this.resourceUrlWithId(id) + "/" + subresource;
	
	this.errorFunction(null, "Error", "subresource parameter must be supplied.");
};

DWAPIResource.prototype.resourceUrlWithAction = function(action) {
    return this.resourceUrl() + "/" + action;
};

DWAPIResource.prototype.retrieveResource = function(urlParams) {
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrl() + this.convertParamsToString(urlParams));
};

DWAPIResource.prototype.findById = function(id, subresource, urlParams) {
	if (subresource !== undefined && subresource !== null && subresource.trim().length > 0)
		return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithIdAndSubresource(id, subresource) +
				this.convertParamsToString(urlParams));
	
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id) + this.convertParamsToString(urlParams));
};

DWAPIResource.prototype.findByMultipleIds = function(ids, urlParams) {
    return this.findWithUrl(this.getSecureBaseURL() + "/" + this.resourceUrlWithMultipleIds(ids) + this.convertParamsToString(urlParams));
};

DWAPIResource.prototype.findWithUrl = function(url) {
    return this.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      headers: {'x-dw-client-id': DWAPIManager.getInstance().clientId}
    });
};

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

DWAPIResource.prototype.getSecureBaseURL = function() {
	return DWAPIManager.getInstance().getSecureBaseURL();
};
