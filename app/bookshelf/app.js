angular.module("bookshelf", [])
	.config(['$routeProvider', function($routeProvider) {
        "use strict";

        var templateCacheBase = "/static/templates/bookshelf/ngs/";
        // routes use Templates cached in templateCache using the ngtemplates grunt task
        // this allows one to use a url for the templates, and angular will use the cache rather than actually querying
        $routeProvider.
            when('/main', {templateUrl: templateCacheBase + "main.ng"}).
            when('/list', {templateUrl: templateCacheBase + "list.ng"}).
            otherwise({redirectTo: '/main'});
    }]);