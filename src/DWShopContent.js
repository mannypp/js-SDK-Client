function DWShopContent() {
    DWAPIResource.call(this);
}

DWShopContent.prototype = new DWAPIResource();
DWShopContent.prototype.constructor = DWShopContent;

DWShopContent.prototype.resourceUrl = function() {
    return "content";
};
