var DWAPIManager = (function() {
	
function DWAPIManager() {
}

var instance = null;

DWAPIManager.prototype.version = "13_6";
DWAPIManager.prototype.host = null;
DWAPIManager.prototype.siteName = null;
DWAPIManager.prototype.clientId = null;
DWAPIManager.prototype.baseURL = null;
DWAPIManager.prototype.secureBaseURL = null;

DWAPIManager.prototype.dw = null;
DWAPIManager.prototype.requestTimeout = 10000;

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

DWAPIManager.prototype.getBaseURL = function() {
	return this.baseURL;
};

DWAPIManager.prototype.getSecureBaseURL = function() {
	return this.secureBaseURL;
};

DWAPIManager.prototype.getClientId = function() {
	return this.clientId;
};

DWAPIManager.prototype.getRequestTimeout = function() {
	return this.requestTimeout;
};

DWAPIManager.prototype.setRequestTimeout = function(timeout) {
	this.requestTimeout = timout;
};

return {
	getInstance: function (host, siteName, clientId, version) {
        if (instance === undefined || instance === null) {
            instance = new DWAPIManager();
            instance.setupHost(host, siteName, clientId, version);
		}

        return instance;
    }
};
})();

