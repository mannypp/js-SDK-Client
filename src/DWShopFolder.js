/**
 * This class is used for retrieving content resources.
 *
 * @class
 * @extends DWAPIResource
 * @author Manny Parasirakis
 */
var DWShopFolder = (function() {

/**
 * @constructor
 */
function DWShopFolder() {
    DWAPIResource.call(this);
}

var instance = null;

DWShopFolder.prototype = new DWAPIResource();
DWShopFolder.prototype.constructor = DWShopFolder;

/**
 * Override the base class implementation of this method to return the folder resource identifier.
 *
 * @memberOf DWShopFolder
 * @returns the resource identifier for folder
 */
DWShopFolder.prototype.resourceUrl = function() {
    return "folders";
};

return {
    /**
     * This method creates and/or returns an instance of DWShopFolder.
     *
     * @name DWShopFolder.getInstance()
     * @returns an instance of DWShopFolder
     */
	getInstance: function() {
		if (instance === undefined || instance === null)
			instance = new DWShopFolder();
		return instance;
	}
};

})();