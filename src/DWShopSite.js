function DWShopSite() {
    DWAPIResource.call(this);
}

DWShopSite.prototype = new DWAPIResource();
DWShopSite.prototype.constructor = DWShopSite;

DWShopSite.prototype.resourceUrl = function(id) {
    return "site";
};
