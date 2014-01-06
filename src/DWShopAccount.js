var DWShopAccount = (function() {

function DWShopAccount() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopAccount.prototype = new DWAPIResource();
DWShopAccount.prototype.constructor = DWShopAccount;

DWShopAccount.prototype.currentAccount = null;
DWShopAccount.prototype.etag = null;

DWShopAccount.prototype.resourceUrl = function(id) {
    return "account";
};

DWShopAccount.prototype.login = function(username, password) {
    return this.ajax({
      type: "POST",
      contentType: "application/json",
      data: "{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}",
      headers: {"x-dw-client-id": clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("login"),
      dataType: "json"
    });
};

DWShopAccount.prototype.logout = function() {
    return this.ajax({
      type: "POST",
      contentType: "application/json",
      headers: {"x-dw-client-id": clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("logout"),
      dataType: "json"
    });
};

DWShopAccount.prototype.register = function(credentials, profile) {
    return this.ajax({
      type: "POST",
      contentType: "application/json",
      data: "{\"credentials\": \"" + credentials + "\", \"profile\": \"" + profile + "\"}",
      headers: {"x-dw-client-id": clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("register"),
      dataType: "json"
    });
};

DWShopAccount.prototype.getProfile = function() {
    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("this"));
};

DWShopAccount.prototype.updateProfile = function(updatedProfile) {
    return this.ajax({
      type: "PATCH",
      contentType: "application/json",
      headers: {"If-Match": this.etag, "x-dw-client-id": clientId},
      url: this.getSecureBaseURL() + this.resourceUrlWithAction("this"),
      data: updatedProfile,
      dataType: "json"
    });
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