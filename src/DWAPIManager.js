/**
 * The DWAPIManager class. This class manages connections to the server. In order to initialize
 * the manager, make the following call:
 *
 * <code>DWAPIManager.getInstance(server-name, site-name, client-id);</code>
 *
 * The above code will initialize the manager using server, site, and client id specified. Note
 * that you do not need to hold onto a reference to the manager class created. To retrieve the
 * manager in your code later, just call:
 *
 * <code>DWAPIManager.getInstance();</code>
 *
 * @example DWAPIManager.getInstance("www.mysite.com, "MySite", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
 * @class
 * @author Manny Parasirakis
 */
var DWAPIManager = (function() {

/**
 * @constructor
 */
function DWAPIManager() {
}

var instance = null;

/**
 * @memberOf DWAPIManager
 * @property {string} version the api version to use in all requests
 */
DWAPIManager.prototype.version = "13_6";
/**
 * @memberOf DWAPIManager
 * @property {string} host the hostname to use in all requests
 */
DWAPIManager.prototype.host = null;
/**
 * @memberOf DWAPIManager
 * @property {string} siteName the site name to use in all requests
 */
DWAPIManager.prototype.siteName = null;
/**
 * @memberOf DWAPIManager
 * @property {string} clientId the client id to use in all requests
 */
DWAPIManager.prototype.clientId = null;

DWAPIManager.prototype.baseURL = null;
DWAPIManager.prototype.secureBaseURL = null;

DWAPIManager.prototype.dw = null;
DWAPIManager.prototype.requestTimeout = 10000;

DWAPIManager.prototype.etag = null;
DWAPIManager.prototype.currentProfile = null;
DWAPIManager.prototype.currentBasket = null;

/**
 * Initializes a DWAPIManager with the given information.
 *
 * @private
 * @memberOf DWAPIManager
 * @param host the name of the host to make requests to
 * @param siteName the name of the site to make requests to
 * @param clientId the required client id
 * @param version the api version to use
 */
DWAPIManager.prototype.setupHost = function(host, siteName, clientId, version) {
	this.host = host;
	this.siteName = siteName;
	if (version !== undefined)
		this.version = version;
	this.clientId = clientId;

	// setup URLs
	this.baseURL = "http://" + this.host + "/s/" + this.siteName + "/dw/shop/v" + this.version + "/";
	this.secureBaseURL = "https://" + this.host + "/s/" + this.siteName + "/dw/shop/v" + this.version + "/";

	// setup singleton
	this.instance = this;

	// setup jquery
	this.dw = {"jquery": $.noConflict(true)};
};

/**
 * Returns the base URL string
 *
 * @memberOf DWAPIManager
 * @returns {string} the base URL string
 */
DWAPIManager.prototype.getBaseURL = function() {
	return this.baseURL;
};

/**
 * Returns the secure base URL string
 *
 * @memberOf DWAPIManager
 * @returns {string} the secure base URL string
 */
DWAPIManager.prototype.getSecureBaseURL = function() {
	return this.secureBaseURL;
};

/**
 * Returns the client id this DWAPIManager was initialized with
 *
 * @memberOf DWAPIManager
 * @returns {string} the client id this DWAPIManager was initialized with
 */
DWAPIManager.prototype.getClientId = function() {
	return this.clientId;
};

/**
 * Returns the configured request timeout
 *
 * @memberOf DWAPIManager
 * @returns {number} the configured request timeout. Default is 10000ms.
 */
DWAPIManager.prototype.getRequestTimeout = function() {
	return this.requestTimeout;
};

/**
 * Sets the request timeout for all requests
 *
 * @memberOf DWAPIManager
 * @param {number} timeout the request timeout to set
 */
DWAPIManager.prototype.setRequestTimeout = function(timeout) {
	this.requestTimeout = timout;
};

return {
	/**
	 * This method returns an instance of a DWAPIManager.
	 *
	 * @name DWAPIManager.getInstance()
	 * @param host the name of the host
	 * @param siteName the name of the site
	 * @param clientId the client id
	 * @param version the version of the api to use
	 * @returns an instance of DWAPIManager
	 */
	getInstance: function (host, siteName, clientId, version) {
        if (instance === undefined || instance === null) {
            instance = new DWAPIManager();
            instance.setupHost(host, siteName, clientId, version);
		}

        return instance;
    }
};
})();

