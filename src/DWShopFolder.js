function DWShopFolder() {
    DWAPIResource.call(this);
}

DWShopFolder.prototype = new DWAPIResource();
DWShopFolder.prototype.constructor = DWShopFolder;

DWShopFolder.prototype.resourceUrl = function() {
    return "folder";
};
