function DWAPIResource() {
}

DWAPIResource.prototype.errorFunction = null;

/**
 * Registers an error handler method whose signature is handleError(jqXHR, status, errmsg)
 *
 * @param errorHandler the error handler function to use
 */
DWAPIResource.prototype.registerErrorHandler = function(errorHandler) {
    this.errorFunction = errorHandler;
};

DWAPIResource.prototype.resourceUrl = function() {
	return null;
};

DWAPIResource.prototype.resourceUrlWithId = function(id) {
    return this.resourceUrl() + "/" + id;
};

DWAPIResource.prototype.resourceUrlWithMultipleIds = function(ids) {
	if (DWAPIManager.dw.jquery.isArray(ids))
		return this.resourceUrl() + "/(" + ids.toString() + ")";
	else
		this.errorHandler(null, "Error", "ids parameter must be an array.");
};

DWAPIResource.prototype.resourceUrlWithIdAndSubresource = function(id, subresource) {
    return this.resourceUrlWithId(id) + "/" + subresource;
};

DWAPIResource.prototype.resourceUrlWithAction = function(action) {
    return this.resourceUrl() + "/" + action;
};

DWAPIResource.prototype.retrieveResource = function() {
    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrl());
};

DWAPIResource.prototype.findById = function(id, subresource) {
	if (subresource !== null && subresource.trim().length() > 0)
		return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithIdAndSubresource(id, subresource));
	
	return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithId(id));
};

DWAPIResource.prototype.findByMultipleIds = function(ids) {
    return this.findWithUrl(this.getSecureBaseURL() + "/" + this.resourceUrlWithMultipleIds(ids));
};

DWAPIResource.prototype.findWithUrl = function(url) {
    return this.ajax({
      type: "GET",
      headers: {"x-dw-client-id": clientId},
      url: url,
      dataType: "json"
    });
};

DWAPIResource.prototype.ajax = function(json) {
	var promise = DWAPIManager.dw.jquery.ajax(json);

    if (this.errorFunction !== null)
        promise.fail(this.errorFunction);
    
    return promise;
};

DWAPIResource.prototype.getSecureBaseURL = function() {
	return DWAPIManager.getSecureBaseURL();
};
