/*jshint loopfunc:true */

var app = angular.module('lillyApp', ['ngRoute', 'ngResource']);

//create resources for API endpoints
app.factory('Products', function ($resource) {
    "use strict";
    return $resource('https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_3/product_search?expand=availability,images,prices,variations&count=18&refine_1=cgid=just-in&q=&start=0&client_id=7469c353-e112-4902-bf40-ead35df41219', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}).factory('Women', function ($resource) {
    "use strict";
    return $resource('https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_3/product_search?expand=availability,images,prices,variations&count=18&refine_1=cgid=for-women&q=&start=0&client_id=7469c353-e112-4902-bf40-ead35df41219', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}).factory('Men', function ($resource) {
    "use strict";
    return $resource('https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_3/product_search?expand=availability,images,prices,variations&count=18&refine_1=cgid=for-men&q=&start=0&client_id=7469c353-e112-4902-bf40-ead35df41219', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}).factory('Sizes', function ($resource) {
    "use strict";
    return $resource('https://stg.lillypulitzer.com/s/lillypulitzer-us/dw/shop/v18_2/products/:id/variations?client_id=7469c353-e112-4902-bf40-ead35df41219', {id: "@id"}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
});

//create controllers for each page
//
app.controller('HomeController', ['$scope', 'Products', '$http', 'Sizes', function ($scope, Products, $http, Sizes) {
    var resp = [];
    $scope.loading = true;
    
    //get Products
    Products.query(function (response) {
        resp = response;
        console.log("resp=", resp);
        $scope.productArray = resp.hits;
       
        $scope.loading = false;
        var sizeArray = [];
        
        //get sizes for each product based on product_id
        for (var i = 0; i < resp.hits.length; i++){
            $scope.productArray[i].sizeArray = [];
            console.log("array ", $scope.productArray[i], " ", i);
            var pid = resp.hits[i].product_id.split("-")[0];
            Sizes.query({id:pid}, (response)=>{
                
            });
        }
    });
}]);

app.controller('WomenController', function ($scope, Women) {
    var resp = [];
    $scope.loading = true;
    Women.query((response) => {
        resp = response;
        $scope.productArray = resp.hits;
        $scope.loading = false;
    });
});

app.controller('MenController', function ($scope, Men) {
    var resp = [];
    $scope.loading = true;
    Men.query((response) => {
        resp = response;
        $scope.productArray = resp.hits;
        $scope.loading = false;
    });
});

//set up routes for each page
app.config(($routeProvider) => {
    $routeProvider.when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .when('/women', {
            templateUrl: 'pages/women.html',
            controller: 'WomenController'
        })
        .when('/men', {
            templateUrl: 'pages/men.html',
            controller: 'MenController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
