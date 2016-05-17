var Q = require("q"),
  config   	= require('../config'),
  Client = require('node-rest-client').Client,
  restConnector = new Client(),
  self = {};

self.search = function(query) {
  var deferred = Q.defer();
  restConnector.get(config.url().baseUrl + "/autocomplete?query=" + query, function(data, response){
    return deferred.resolve(data);
  });
  return deferred.promise;
};

self.subscribe = function (req) {
  var deferred = Q.defer();
  var args = {
    data: req.body,
    headers:{"Content-Type": "application/json"}
  };
  console.log("subscribe arguments: ",args);
  restConnector.post(config.url().baseUrl + "/subscription", args, function(data, response){
    console.log("subscribe: ", response.statusCode);
    deferred.resolve(response.statusCode);
  });
  return deferred.promise;
};

self.all_categories = function() {
  var deferred = Q.defer();
  restConnector.get(config.url().baseUrl + "/categories/1", function(data, response){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.categoriesChildren = function(idChildren) {
  var deferred = Q.defer();
  restConnector.get(config.url().baseUrl + "/categories?ids=" + idChildren, function(data, response){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.getAutocompleteCSS = function(url) {
  var deferred = Q.defer();
  restConnector.get("http://localhost:3001/normandia/autocomplete/autocomplete.css", function(data){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.getAutocompleteJS = function() {
  var deferred = Q.defer();
  restConnector.get("http://localhost:3001/normandia/autocomplete/autocomplete.js", function(data){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.getAutocompleteMarkup = function() {
  var deferred = Q.defer();
  restConnector.get("http://localhost:3001/normandia/autocomplete/markup", function(data){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.getHeaderMarkup = function() {
  var deferred = Q.defer();
  restConnector.get("http://localhost:3001/normandia/partials/garbarino/header", function(data){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.getFooterMarkup = function() {
  var deferred = Q.defer();
  restConnector.get("http://localhost:3001/normandia/partials/garbarino/footer", function(data){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.autocomplete = function(req, query, categories, products, productList, landings, productBrand, cities, suggestions){
  var deferred = Q.defer();
  var args = {
    headers: {
      "Content-Type": "application/json",
      "x-brand": req.get("x-brand")
    }
  };
  var apiClientUrl = config.url().baseUrl + 'autocomplete?q=' + query +
    '&categories=' + categories +
    '&products=' + products +
    '&product_list=' + productList +
    '&landings=' + landings +
    '&product_brand=' + productBrand +
    '&cities=' + cities +
    '&suggestions=' + suggestions;

  restConnector.get(apiClientUrl, args, function(data) {
    deferred.resolve(data)
  });

  return deferred.promise;
};

self.getProduct = function(id) {
  var deferred = Q.defer();
  restConnector.get(config.url().baseUrl + "/products/" + id, function(data){
    return deferred.resolve(data);
  });

  return deferred.promise;
};

self.getCartItems = function(userId, session) {
  var deferred = Q.defer(),
      args = renderEpiCookie(session);
  restConnector.get(config.url().baseUrl + "/cart/totalItems/" + userId, args,function(data){
    return deferred.resolve(data);
  });
  return deferred.promise;
};

self.getWishlistItems = function(userId, session) {
  var deferred = Q.defer(),
      args = renderEpiCookie(session);
  restConnector.get(config.url().baseUrl + "/account/wishlist/" + userId, args,function(data){
    return deferred.resolve(data);
  });
  return deferred.promise;
};

function renderEpiCookie(userId, session) {
  if (session) {
    return {
      headers: { Cookie: "session=" + session + ";" }
    };
  }

  return {}
}

module.exports = self;
