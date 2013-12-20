function DWShopPromotion() {
    DWAPIResource.call(this);
}

DWShopPromotion.prototype = new DWAPIResource();
DWShopPromotion.prototype.constructor = DWShopPromotion;

DWShopPromotion.prototype.resourceUrl = function(id) {
    return "promotion";
};
