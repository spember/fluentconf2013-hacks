angular.module("bookshelf").run(["$templateCache", function($templateCache) {

  $templateCache.put("/static/templates/bookshelf/ngs/list.ng",
    "<p>This is a sample list of things:</p>"
  );

  $templateCache.put("/static/templates/bookshelf/ngs/main.ng",
    "<p>This is a test</p>"
  );

}]);
