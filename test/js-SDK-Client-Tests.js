var username = null;

QUnit.config.reorder = false;

function init(){
	DWAPIManager.getInstance("dw-mparasirakis-mac.local", "DevCenterTest", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}

function handleError(jqXHR, status, result) {
	if (jqXHR !== undefined && jqXHR !== null && jqXHR.responseJSON !== undefined && jqXHR.responseJSON !== null)
		console.log(status + "(" + result + ")  " + jqXHR.responseJSON.fault.type + ": " + jqXHR.responseJSON.fault.message);

	if (jqXHR !== undefined && jqXHR !== null && jqXHR.responseJSON !== undefined && jqXHR.responseJSON !== null && jqXHR.responseJSON.hasOwnProperty("fault"))
		ok(false, jqXHR.responseJSON.fault.type + ": " + jqXHR.responseJSON.fault.message);
	
	console.log(status);
}

function registerErrorHandlers(inst) {
	inst.registerErrorHandler(handleError);
	return inst;
}

function restart(result) {
	start();
}

function getDWShopProductInstance() {
	return registerErrorHandlers(DWShopProduct.getInstance());
}

function getDWShopProductSearchInstance() {
	return registerErrorHandlers(DWShopProductSearch.getInstance());
}

function getDWShopCategoryInstance() {
	return registerErrorHandlers(DWShopCategory.getInstance());
}

function getDWShopPromotionInstance() {
	return registerErrorHandlers(DWShopPromotion.getInstance());
}

function getDWShopContentInstance() {
	return registerErrorHandlers(DWShopContent.getInstance());
}

function getDWShopContentSearchInstance() {
	return registerErrorHandlers(DWShopContentSearch.getInstance());
}

function getDWShopFolderInstance() {
	return registerErrorHandlers(DWShopFolder.getInstance());
}

function getDWShopStoreInstance() {
	return registerErrorHandlers(DWShopStore.getInstance());
}

function getDWShopSiteInstance() {
	return registerErrorHandlers(DWShopSite.getInstance());
}

function getDWShopAccountInstance() {
	return registerErrorHandlers(DWShopAccount.getInstance());
}

function getDWShopBasketInstance() {
	return registerErrorHandlers(DWShopBasket.getInstance());
}

module("DWShopProductTests");
test("getProduct", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopProductInstance();
	var promise = inst.findById("sony-ps3-console");
	
	promise.done(function(result) {
		equal(result.id, "sony-ps3-console", "The product ids match");
	});
	
	promise.always(restart);
});

test("getMultipleProducts", 3, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopProductInstance();
	var promise = inst.findByMultipleIds(["sony-ps3-console", "sony-ps3-bundle"]);
	
	promise.done(function(result) {
		equal(result.count, 2, "The count is 2");
		equal(result.data[0].id, "sony-ps3-console", "The product id of the first item matches");
		equal(result.data[1].id, "sony-ps3-bundle", "The product id of the second item matches");
	});
	
	promise.always(restart);
});

test("getProductWithSubresource", 3, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopProductInstance();
	var promise = inst.findById("sony-ps3-console", "availability", {"inventory_ids": "inventory"});
	
	promise.done(function(result) {
		equal(result.id, "sony-ps3-console", "The product ids match");
		equal(result.inventories[0].id, "inventory", "The inventory was returned");
		equal(result.inventories[0].orderable, true, "The product is orderable");
	});
	
	promise.always(restart);
});

test("getProductWithExpand", 3, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopProductInstance();
	var promise = inst.findByIdWithExpand("sony-ps3-console", "availability");
	
	promise.done(function(result) {
		equal(result.id, "sony-ps3-console", "The product ids match");
		equal(result.inventory.id, "inventory", "The inventory was returned");
		equal(result.inventory.orderable, true, "The product is orderable");
	});
	
	promise.always(restart);
});

module("DWShopProductSearchTests");
test("productSearch", 2, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopProductSearchInstance();
	var promise = inst.search("red");
	
	promise.done(function(result) {
		equal(result.count, 15, "The count of product search results is correct");
		ok(result.hits[0].orderable === undefined, "The orderable property was not returned");
	});
	
	promise.always(restart);
});

test("productSearchWithSubresource", 2, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopProductSearchInstance();
	var promise = inst.searchWithSubresource("red", "availability");
	
	promise.done(function(result) {
		equal(result.count, 15, "The count of product search results is correct");
		ok(result.hits[0].orderable !== undefined, "The orderable property was returned");
	});
	
	promise.always(restart);
});

module("DWShopCategoryTests");
test("getCategory", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopCategoryInstance();
	var promise = inst.findById("womens");
	
	promise.done(function(result) {
		equal(result.id, "womens", "The category ids match");
	});
	
	promise.always(restart);
});

test("getMultipleCategories", 3, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopCategoryInstance();
	var promise = inst.findByMultipleIds(["mens", "womens"]);
	
	promise.done(function(result) {
		equal(result.count, 2, "The count is 2");
		equal(result.data[0].id, "mens", "The category id of the first item matches");
		equal(result.data[1].id, "womens", "The category id of the second item matches");
	});
	
	promise.always(restart);
});

module("DWShopPromotionTests");
test("getPromotion", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopPromotionInstance();
	var promise = inst.findById("promo-test1");
	
	promise.done(function(result) {
		equal(result.id, "promo-test1", "The store ids match");
	});
	
	promise.always(restart);
});

test("getMultiplePromotions", 3, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopPromotionInstance();
	var promise = inst.findByMultipleIds(["promo-test1", "promo-test2"]);
	
	promise.done(function(result) {
		equal(result.count, 2, "The count is 2");
		equal(result.data[0].id, "promo-test1", "The promotion id of the first item matches");
		equal(result.data[1].id, "promo-test2", "The promotion id of the second item matches");
	});
	
	promise.always(restart);
});

test("getAllPromotions", 2, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopPromotionInstance();
	var promise = inst.retrieveResource({"campaign_id": "campaign-test1"});
	
	promise.done(function(result) {
		equal(result.count, 1, "The count is 1");
		equal(result.data[0].id, "promo-test1", "The store id of the first item matches");
	});
	
	promise.always(restart);
});

module("DWShopContentTests");
test("getContent", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopContentInstance();
	var promise = inst.findById("about-us");
	
	promise.done(function(result) {
		equal(result.id, "about-us", "The content ids match");
	});
	
	promise.always(restart);
});

test("getFolder", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopFolderInstance();
	var promise = inst.findById("about-us");
	
	promise.done(function(result) {
		equal(result.id, "about-us", "The folder ids match");
	});
	
	promise.always(restart);
});

module("DWShopContentSearchTests");
test("contentSearch", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopContentSearchInstance();
	var promise = inst.search("account");
	
	promise.done(function(result) {
		equal(result.count, 2, "The count of content search results is correct");
	});
	
	promise.always(restart);
});

module("DWShopStoreTests");
test("getStore", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopStoreInstance();
	var promise = inst.findById("burl");
	
	promise.done(function(result) {
		equal(result.id, "burl", "The store ids match");
	});
	
	promise.always(restart);
});

test("getMultipleStores", 3, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopStoreInstance();
	var promise = inst.findByMultipleIds(["burl", "ToyShop"]);
	
	promise.done(function(result) {
		equal(result.count, 2, "The count is 2");
		equal(result.data[0].id, "burl", "The store id of the first item matches");
		equal(result.data[1].id, "ToyShop", "The store id of the second item matches");
	});
	
	promise.always(restart);
});

test("getAllStores", 2, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopStoreInstance();
	var promise = inst.retrieveResource({"country_code": "US", "postal_code": "01803"});
	
	promise.done(function(result) {
		equal(result.count, 4, "The count is 4");
		equal(result.data[0].id, "burl", "The store id of the first item matches");
	});
	
	promise.always(restart);
});

module("DWShopSiteTests");
test("getSite", 1, function() {
	stop();
	init(); // initialize the js-SDK-Client
	
	var inst = getDWShopSiteInstance();
	var promise = inst.retrieveResource()
	
	promise.done(function(result) {
		equal(result.id, "DevCenterTest", "The site ids match");
	});
	
	promise.always(restart);
});

module("DWShopAccount-And-BasketTests");
test("accountTests-login-profile-addresses-logout", 16, function() {
	init(); // initialize the js-SDK-Client
	username = (Math.random() + 1).toString(36).substring(7); // generate random string
	
	register()
		.then(login)
		.then(getProfile)
		.then(getAccountAddresses)
		.then(updateProfile)
		.then(logout);
});

function register() {
	stop();
	var promise = getDWShopAccountInstance().register({"username": username, "password": "abcdefgh"},
			{"email": username + "@demandware.com", "first_name": "Demandware", "last_name": "JSUnitTests"});
	
	promise.done(function(result) {
		ok(result !== null, "The user was registered");
		equal(result.email, username + "@demandware.com", "The user's email was confirmed to be correct");
	}).always(restart);
	
	return promise;
}

function login(result, status, jqXHR) {
	stop();
	var promise = getDWShopAccountInstance().login(username, "abcdefgh");
	
	promise.done(function(result, status, jqXHR) {
		ok(result === undefined, "Login successful");
		equal(jqXHR.status, 204, "204 response received from server");
	}).always(restart);

	return promise;
}

function getProfile(result, status, jqXHR) {
	stop();
	var promise = getDWShopAccountInstance().getProfile();
	
	promise.done(function(result) {
		ok(result !== null, "The profile was retrived");
		equal(result.email, username + "@demandware.com", "The user's email was confirmed to be correct");
	}).always(restart);

	return promise;
}

function getAccountAddresses(result, status, jqXHR) {
	stop();
	var promise = getDWShopAccountInstance().getAddresses();
	
	promise.done(function(result) {
		ok(result !== null, "The addresses were retrieved");
		equal(result.count, 0, "The user's address count was confirmed to be correct");
	}).always(restart);

	return promise;
}

function updateProfile(result, status, jqXHR) {
	stop();
	var promise = getDWShopAccountInstance().updateProfile({"gender": "m", "fax": "617-555-1212"});
	
	promise.done(function(result) {
		ok(result !== null, "The profile was updated");
		equal(result.first_name, "Demandware", "The user's first name was confirmed to be correct");
		equal(result.gender, "m", "The user's gender was updated and confirmed to be correct");
		equal(result.fax, "617-555-1212", "The user's fax number was updated and confirmed to be correct");
	}).always(restart);

	return promise;
}

function logout(result, status, jqXHR) {
	stop();
	var promise = getDWShopAccountInstance().logout();
	
	promise.done(function(result, status, jqXHR) {
		ok(result === undefined, "Logout successful");
		equal(jqXHR.status, 204, "204 response received from server");
		var inst = getDWShopAccountInstance();
		equal(inst.currentProfile, null, "The saved user profile is null");
		equal(inst.etag, null, "The saved etag is null");
	}).always(restart);
	
	return promise;
}

// basket tests
test("basketTests-addProduct-removeProduct-updateQuantity", 19, function() {
	init(); // initialize the js-SDK-Client
	
	var prd = "sony-ps3-console";
	login()
		.then(getBasket)
		.then(function() {return addProductToBasket(prd);})
		.then(function() {return removeProductFromBasket(prd);})
		.then(function() {return addProductToBasket(prd, 1, "inventory");})
		.then(function() {return updateQuantity(prd, 2);})
		.then(function() {return removeProductFromBasket(prd);}) // make sure to empty the basket before test ends
		.then(logout);	
});

test("basketTests-addProducts-updateQuantities", 19, function() {
	init(); // initialize the js-SDK-Client
	
	var prd = "sony-ps3-console";
	var prd2 = "sony-ps3-bundle";
	login()
		.then(getBasket)
		.then(function() {return addProductToBasket(prd);})
		.then(function() {return addProductToBasket(prd2);})
		.then(function() {return updateQuantities([{product_id: prd, quantity: 2},{product_id: prd2, quantity: 2}]);})
		.then(function() {return removeProductFromBasket(prd);}) // make sure to empty the basket before test ends
		.then(function() {return removeProductFromBasket(prd2);}) // make sure to empty the basket before test ends
		.then(logout);	
});

test("basketTests-fullCheckout", 43, function() {
	init(); // initialize the js-SDK-Client
	
	var prd = "sony-ps3-console";
	var cpn1 = "coupontest1";
	var cpn2 = "coupontest2";
	
	login()
		.then(getBasket)
		.then(function() {return addProductToBasket(prd);})
		.then(function() {return addCouponToBasket(cpn1);})
		.then(function() {return addCouponToBasket(cpn2);})
		.then(function() {return removeCouponFromBasket(cpn2);})
		.then(getShippingMethods)
		.then(getPaymentMethods)
		.then(setShippingMethod)
		.then(setPaymentMethod)
		.then(setCustomerInfo)
		.then(setShippingAddress)
		.then(setBillingAddress)
		.then(checkout)
		.then(submit) // basket should be empty after submit
		.then(logout);	
});

test("basketTests-updateBundledProductVariant", 15, function() {
	init(); // initialize the js-SDK-Client
	
	var prd = "Sdk-Master-bundle";
	login()
		.then(getBasket)
		.then(function() {return addProductToBasket(prd);})
		.then(function() {return updateBundledProductVariantSelection(prd, "Sdk-Master-1", "Sdk-Master-2");})
		.then(function() {return removeProductFromBasket(prd);})
		.then(logout);	
});

test("basketTests-updateOption", 15, function() {
	init(); // initialize the js-SDK-Client
	
	var prd = "sony-ps3-bundle";
	login()
		.then(getBasket)
		.then(function() {return addProductToBasket(prd);})
		.then(function() {return updateOptionSelection(prd, "consoleWarranty", "002");})
		.then(function() {return removeProductFromBasket(prd);})
		.then(logout);	
});

function getBasket() {
	stop();	
	var promise = getDWShopBasketInstance().getBasket();
	
	promise.done(function(result) {
		ok(result !== null, "The basket was retrieved");
		ok(result.product_items === undefined, "The basket is empty")
		ok(result.currency !== undefined && result.currency !== null, "The basket test property (currency) was returned");
	}).always(restart);
	
	return promise;
}

function addProductToBasket(productId, quantity, inventoryId) {
	stop();	
	var promise = getDWShopBasketInstance().addProduct(productId, quantity, inventoryId);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was returned");
		ok(result.product_items.length > 0, "The product was added to the basket")
	}).always(restart);
	
	return promise;
}

function removeProductFromBasket(productId) {
	stop();	
	var promise = getDWShopBasketInstance().removeProduct(productId);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was returned");
		if (!result.hasOwnProperty("product_items")) // only run this when the basket is empty
			ok(result.product_items === undefined, "There are no items in the basket")
	}).always(restart);
	
	return promise;
}

function addCouponToBasket(couponCode) {
	stop();	
	var promise = getDWShopBasketInstance().addCoupon(couponCode);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was returned");
		ok(result.coupon_items.length > 0, "The coupon was added to the basket")
	}).always(restart);
	
	return promise;
}

function removeCouponFromBasket(couponCode) {
	stop();	
	var promise = getDWShopBasketInstance().removeCoupon(couponCode);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was returned");
		equal(result.coupon_items.length, 1, "The coupon was removed");
	}).always(restart);
	
	return promise;
}

function updateQuantity(productId, quantity) {
	stop();	
	var promise = getDWShopBasketInstance().updateQuantity(productId, quantity);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was retrieved");
		equal(result.product_items[0].quantity, quantity, "There are " + quantity + " products in the basket")
	}).always(restart);
	
	return promise;
}

function updateQuantities(updates) {
	stop();	
	var promise = getDWShopBasketInstance().updateQuantities(updates);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was retrieved");
		equal(result.product_items[0].quantity, 2, "There are 2 sony-ps3-consoles in the basket")
		equal(result.product_items[1].quantity, 2, "There are 2 sony-ps3-bundles in the basket")
	}).always(restart);
	
	return promise;
}

function updateBundledProductVariantSelection(productId, bundledProductId, newProductId) {
	stop();	
	var promise = getDWShopBasketInstance().updateBundledProductVariantSelection(productId, bundledProductId, newProductId);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was retrieved");
		equal(result.product_items[0].bundled_product_items[0].product_id, newProductId, "The variant selection has been updated")
	}).always(restart);
	
	return promise;
}

function updateOptionSelection(productId, optionId, newOptionValue) {
	stop();	
	var promise = getDWShopBasketInstance().updateOptionSelection(productId, optionId, newOptionValue);
	
	promise.done(function(result) {
		ok(result !== null, "The basket was retrieved");
		equal(result.product_items[0].option_items[0].option_value_id, newOptionValue, "The option selection has been updated")
	}).always(restart);
	
	return promise;
}

function getShippingMethods() {
	stop();	
	var promise = getDWShopBasketInstance().getShippingMethods();
	
	promise.done(function(result) {
		ok(result !== null, "The shipping methods were retrieved");
		equal(result.count, 1, "There is one shipping method")
	}).always(restart);
	
	return promise;
}

function getPaymentMethods() {
	stop();	
	var promise = getDWShopBasketInstance().getPaymentMethods();
	
	promise.done(function(result) {
		ok(result !== null, "The payment methods were retrieved");
		equal(result.count, 1, "There is one payment method")
	}).always(restart);
	
	return promise;
}

function setShippingMethod() {
	stop();	
	var promise = getDWShopBasketInstance().setShippingMethod("standard");
	
	promise.done(function(result) {
		ok(result !== null, "The shipping method was set");
		equal(result.shipments[0].shipping_method.id, "standard", "The shipping method was set to standard")
	}).always(restart);
	
	return promise;
}

function setPaymentMethod() {
	stop();	
	var promise = getDWShopBasketInstance().setPaymentMethod("CREDIT_CARD.Visa");
	
	promise.done(function(result) {
		ok(result !== null, "The payment method was set");
		equal(result.payment_method.id, "CREDIT_CARD.Visa", "The payment method was set to CREDIT_CARD.Visa")
	}).always(restart);
	
	return promise;
}

function setCustomerInfo() {
	stop();	
	var promise = getDWShopBasketInstance().setCustomerInfo({"email": username + "@demandware.com"});
	
	promise.done(function(result) {
		ok(result !== null, "The customer info was set");
		ok(result.customer_info.hasOwnProperty("email"), "The email address is " + result.customer_info.email)
	}).always(restart);
	
	return promise;
}

function setShippingAddress() {
	stop();	
	var promise = getDWShopBasketInstance().setShippingAddress(getAddress());
	
	promise.done(function(result) {
		ok(result !== null, "The shipping address was set");
		equal(result.shipments[0].shipping_address.first_name, "Demandware", "The shipping address first name matches")
	}).always(restart);
	
	return promise;
}

function setBillingAddress() {
	stop();	
	var promise = getDWShopBasketInstance().setBillingAddress(getAddress());
	
	promise.done(function(result) {
		ok(result !== null, "The billing address was set");
		equal(result.billing_address.first_name, "Demandware", "The billing address first name matches")
	}).always(restart);
	
	return promise;
}

function getAddress() {
	return {
		"first_name":"Demandware",
		"last_name":"JSUnitTests",
		"address1":"5 Wall St",
		"city":"Burlington",
		"state_code":"MA",
		"postal_code":"01803",
		"country_code":"US",
		"phone":"617-555-1212"
	};
}

function checkout() {
	stop();	
	var promise = getDWShopBasketInstance().checkout();
	
	promise.done(function(result) {
		ok(result !== null, "Checkout complete");
		ok(result.hasOwnProperty("billing_address"), "The billing address was set")
		ok(result.hasOwnProperty("shipments"), "The shipping address was set")
		ok(result.hasOwnProperty("customer_info"), "The customer info was set")
		ok(result.hasOwnProperty("product_items"), "The basket has items")
		ok(result.shipments[0].hasOwnProperty("shipping_method"), "The shipping method was set")
		ok(result.hasOwnProperty("payment_method"), "The payment method was set")
	}).always(restart);
	
	return promise;
}

function submit() {
	stop();	
	var promise = getDWShopBasketInstance().submit();
	
	promise.done(function(result) {
		ok(result !== null, "Submit complete");
		ok(result.hasOwnProperty("order_no"), "The basket has an order number")
		ok(result.hasOwnProperty("creation_date"), "The basket has a creation date")
		equal(result.status, "pending", "The order status is pending")
		ok(DWAPIManager.getInstance().currentBasket == null, "The current basket in DWAPIManager is null")
	}).always(restart);
	
	return promise;
}
