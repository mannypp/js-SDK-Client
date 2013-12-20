function DWAPIManager() {
}

DWAPIManager.prototype.version = "13_6";
DWAPIManager.prototype.host = null;
DWAPIManager.prototype.siteName = null;
DWAPIManager.prototype.clientId = null;
DWAPIManager.prototype.baseURL = null;
DWAPIManager.prototype.secureBaseURL = null;

DWAPIManager.prototype.dw = null;

DWAPIManager.prototype.setupHost = function(host, siteName, clientId) {
	this.host = host;
	this.siteName = siteName;
	this.version = version;
	this.clientId = clientId;

	this.baseURL = "http://" + this.host + "/s/" + this.siteName + "/dw/shop/v" + this.version + "/";
	this.secureBaseURL = "https://" + this.host + "/s/" + this.siteName + "/dw/shop/v" + this.version + "/";
	
	this.dw = {};
	this.dw.jquery = $.noConflict(true);
};

DWAPIManager.prototype.getBaseURL = function() {
	return this.baseURL;
};

DWAPIManager.prototype.getSecureBaseURL = function() {
	return this.baseURL;
};

DWAPIManager.prototype.getClientId = function() {
	return this.clientId;
};
