/**
 * This class is used for retrieving account resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopAccount = (function() {

/**
 * @constructor
 */
function DWShopAccount() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopAccount.prototype = new DWAPIResource();
DWShopAccount.prototype.constructor = DWShopAccount;

/**
 * This method allows for the profile response object to be retrieved and stored into the DWAPIManager
 * instance.
 *
 * @memberOf DWShopAccount
 * @param promise {object} the jquery promise object to register the callback to
 * @returns the given promise object in order to chain calls
 */
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

/**
 * Override the base class implementation of this method to return the account resource identifier.
 *
 * @memberOf DWShopAccount
 * @returns the resource identifier for account
 */
DWShopAccount.prototype.resourceUrl = function(id) {
    return "account";
};

/**
 * Logs a user into the server.
 *
 * @memberOf DWShopAccount
 * @param username {string} the username to login with
 * @param password {string} the password to login with
 * @returns a jquery promise object
 */
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

/**
 * Logs a user out of the server.
 *
 * @memberOf DWShopAccount
 * @returns a jquery promise object
 */
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

/**
 * Registers a new user on the server.
 *
 * @example A credential object: {"username": "aname", "password": "apassword"}
 * A profile object: {
 *     "address1":"10 Somewhere St.",
 *     "address2":"",
 *     "address_id":"8461948625703718"
 *     "address_name":"",
 *     "city":"Boston",
 *     "company_name":"",
 *     "country_code":"",
 *     "first_name":"Egon",
 *     "full_name":"Egon Krenz",
 *     "job_title":"",
 *     "last_name":"Krenz",
 *     "phone":"",
 *     "postal_code":"",
 *     "post_box":"",
 *     "preferred":true,
 *     "salutation":"",
 *     "second_name":"",
 *     "state_code":"",
 *     "suffix":"",
 *     "suite":"",
 *     "title":""
 *   }
 * @memberOf DWShopAccount
 * @param credentials {object} a credentials object which contains a username and password property
 * @param profile {object} a profile object which contains the properties of a user profile
 * @returns a jquery promise object
 */
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

/**
 * Returns the current user's profile.
 *
 * @memberOf DWShopAccount
 * @returns a jquery promise object
 */
DWShopAccount.prototype.getProfile = function() {
    var promise = this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("this"));

    this.captureETag(promise);
    this.captureProfile(promise);

    return promise;
};

/**
 * Updates the current user's profile.
 *
 * @example {
 *     "_delete":["fax","phone_mobile"],         // delete values of properties "fax" and "phone_mobile"
 *     "birthday":"2011-05-06",                  // update "birthday"
 *     "email":"someone@example.com"             // update "email"
 *   }
 * @memberOf DWShopAccount
 * @param updatedProfile {object} an object which contains the properties to be updated in the user profile
 * @returns a jquery promise object
 */
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

/**
 * Returns the addresses stored in the user's profile.
 *
 * @memberOf DWShopAccount
 * @returns a jquery promise object
 */
DWShopAccount.prototype.getAddresses = function() {
    return this.findWithUrl(this.getSecureBaseURL() + this.resourceUrlWithAction("this/addresses"));
};

return {
    /**
     * This method creates and/or returns an instance of DWShopAccount.
     *
     * @name DWShopAccount.getInstance()
     * @returns an instance of DWShopAccount
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopAccount();
		return instance;
	}
};

})();