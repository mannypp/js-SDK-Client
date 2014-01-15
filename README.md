Welcome to the Javascript SDK for Demandware OCAPI. Below you will find a short introduction on how to get started using the API.

The first step that you need to do is initialize the DWAPIManager. This can be done with the code below:

	DWAPIManager.getInstance("www.example.com", "MySite", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

You do not need to hold on to a reference of DWAPIManager because it can be retrieved by calling DWAPIManager.getInstance().

In order to retrieve a product from the catalog, or any resource for that matter, you can use the following pattern:

	var inst = DWShopProduct.getInstance();
	var promise = inst.findById("my-product-id"); // my-product-id should be a valid product id
	
	promise.done(function(result) {
		// do something with the result
	});
	
	promise.fail(function(jqXHR, status, result) {
	  console.log(status + ": " + result);
	  alert(status + ": " + result);
	});
	
	promise.always(function(result) {
	  console.log(result);
	});

In the above code, we first get an instance to a DWShopProduct instance. This class exposes all the functionality for products.

Next, findById() is called with a valid product id. This call returns a jquery Promise object. If you are unfamiliar with Promise objects, please look at the jquery documentation for Promise/Deferred functionality. The Promise object allows you to configure a function to be called when the findById() call is completed. Upon success, the function configured with the done() call will be called. The result in the anonymous function above will be the JSON whic his returned from the server. If the call fails, then the function configured by the call to fail() will be called. Finally, any function configured with a call to always will be called whether or not the findById() call succeeds or fails.

Note that the pattern is the same for many of the methods callable from a DWShopXXX class. See the documentation for details of all the resources and functions available.
