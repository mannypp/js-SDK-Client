function DWShopStore() {
    DWAPIResource.call(this);
}

DWShopStore.prototype = new DWAPIResource();
DWShopStore.prototype.constructor = DWShopStore;

DWShopStore.prototype.resourceUrl = function(id) {
    return "stores";
};
