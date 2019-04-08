var app = angular.module('lillyApp', ['ngRoute', 'ngResource']);
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
});


app.controller('HomeController', ['$scope', 'Products', '$http', function ($scope, Products, $http) {
    var resp = [];
    $scope.loading = true;
    Products.query(function (response) {
        resp = response;
        console.log("resp=", resp);
        $scope.productArray = resp.hits;
        $scope.loading = false;
        /*angular.forEach(resp.hits, (val)=>{
            console.log("is ", val.product_name);
        });*/
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
