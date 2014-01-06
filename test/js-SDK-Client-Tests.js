function init(){
	DWAPIManager.getInstance("dw-mparasirakis-mac.local", "DevCenterTest", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}

function handleError(jqXHR, status, errmsg) {
	console.log(status + ": " + errmsg);
}

var delayInterval = 3000;

module("DWShopProductTests");
test("getProduct", 1, function() {
	stop(delayInterval);
	init(); // initialize the js-SDK-Client
	
	var prod = new DWShopProduct();
	//prod.registerErrorHandler(handleError);
	var promise = prod.findById("sony-ps3-console");
	
	promise.done(function(result) {
		equals(result.id, "sony-ps3-console", "The product ids do not match");
		start();
	});
	
	promise.fail(function(result) {
		console.log(result.toString());
		start();
	});
});