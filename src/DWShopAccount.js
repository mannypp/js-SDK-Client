var DWShopAccount = (function() {

function DWShopAccount() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopAccount.prototype = new DWAPIResource();
DWShopAccount.prototype.constructor = DWShopAccount;

DWShopAccount.prototype.captureProfile = function(promise) {
	if (promise !== null) {		
	    promise.done(function(result, status, jqXHR) {
			if (result !== undefined && result !== null) {
				DWAPIManager.getInstance().currentProfile = result;
				console.log(JSON.stringify(result));
			}
		});
	}
	
	return promise;
};

DWShopAccount.prototype.resourceUrl = function(id) {
    return "account";
};

DWShopAccount.prototype.login = function(username, password) {
    var promise = this.ajax({
      type: "POST",
      contentType: "application/json",
      data: "{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}",
      headers: {'x-dw-client-id': DWAPIManager.getInstance().clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("login"),
      dataType: "json"
    });
    
    this.captureETag(promise);
    this.captureProfile(promise);

    return promise;
};

DWShopAccount.prototype.logout = function() {
    var promise = this.ajax({
      type: "POST",
      contentType: "application/json",
      headers: {'x-dw-client-id': DWAPIManager.getInstance().clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("logout"),
      dataType: "json"
    });
    
    promise.done(function(result, status, jqXHR) {
		var apiManager = DWAPIManager.getInstance();
		apiManager.etag = null;
		apiManager.currentProfile = null;
    });

    return promise;
};

DWShopAccount.prototype.register = function(credentials, profile) {
    var promise = this.ajax({
      type: "POST",
      contentType: "application/json",
      data: "{\"credentials\": " + JSON.stringify(credentials) + ", \"profile\": " + JSON.stringify(profile) + "}",
      headers: {'x-dw-client-id': DWAPIManager.getInstance().clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("register"),
      dataType: "json"
    });
    
    this.captureETag(promise);
    this.captureProfile(promise);
    
    return promise;
};

DWShopAccount.prototype.getProfile = function() {
    var promise = this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("this"));
    
    this.captureETag(promise);
    this.captureProfile(promise);

    return promise;
};

DWShopAccount.prototype.updateProfile = function(updatedProfile) {
	var apiManager = DWAPIManager.getInstance();
    var promise = this.ajax({
      type: "PATCH",
      contentType: "application/json",
      headers: {'If-Match': apiManager.etag, 'x-dw-client-id': apiManager.clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("this"),
      data: JSON.stringify(updatedProfile),
      dataType: "json"
    });
    
    this.captureETag(promise);
    this.captureProfile(promise);
    
    return promise;
};

DWShopAccount.prototype.getAddresses = function() {
    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("this/addresses"));
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopAccount();
		return instance;
	}
};

})();