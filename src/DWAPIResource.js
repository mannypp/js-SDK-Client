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
	var params = "";
	
	if (urlParams !== undefined && urlParams !== null) {
		for (var key in urlParams) {
			if (urlParams.hasOwnProperty(key)) {
				params += (params.length === 0 ? "?" : "&");
				params += key + "=" + urlParams[key];
			}
		}		
	}

	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrl() + params);
};

DWAPIResource.prototype.findById = function(id, subresource) {
	if (subresource !== undefined && subresource !== null && subresource.trim().length > 0)
		return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithIdAndSubresource(id, subresource));
	
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id));
};

DWAPIResource.prototype.findByMultipleIds = function(ids) {
    return this.findWithUrl(this.getSecureBaseURL() + "/" + this.resourceUrlWithMultipleIds(ids));
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
