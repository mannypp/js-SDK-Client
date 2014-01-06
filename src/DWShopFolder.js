var DWShopFolder = (function() {

function DWShopFolder() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopFolder.prototype = new DWAPIResource();
DWShopFolder.prototype.constructor = DWShopFolder;

DWShopFolder.prototype.resourceUrl = function() {
    return "folders";
};

return {
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopFolder();
		return instance;
	}
};

})();