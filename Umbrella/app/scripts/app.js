'use strict';

/* global app:true */
var app = angular
    .module('umbrellaApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'App.addressFilter',
        'App.rangeFilter',
        'App.dobFilter',
        'ui.bootstrap',
        'ezfb',
        'google-maps',
        'ngTable'
    ]);

app.config(function ($httpProvider, $routeProvider,ezfbProvider ) {
    ezfbProvider.setInitParams({
        appId: '293665770841942'
    });
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('TokenInterceptor');
    $routeProvider
        // .when('/database', {
        //   templateUrl: 'views/database.html',
        //   controller: 'DatabaseCtrl'
        // })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            access: { requiredLogin: false }
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            access: {requiredLogin: false}
        })
        .when('/bars',{
            templateUrl: 'views/bars.html',
            controller: 'BarsCtrl',
            access : {requiredLogin: true}
        })
        .when('/users',{
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl',
            access : {requiredLogin: true}
        })
        .when('/database/:tab', {
            templateUrl: 'views/database.html',
            controller: 'DatabaseCtrl',
            access: { requiredLogin: true }
        })
        .when('/bars/addBar', {
            templateUrl: 'views/barDetails.html',
            controller: 'BarDetailsCtrl',
            access: { requiredLogin: true }
        })
        .when('/database/bars/:id', {
            templateUrl: 'views/barDetails.html',
            controller: 'BarDetailsCtrl',
            access: { requiredLogin: true }
        })
        .when('/database/categories/addCategory', {
            templateUrl: 'views/categoryDetails.html',
            controller: 'CategoryDetailsCtrl',
            access: { requiredLogin: true }
        })
        .when('/database/categories/:id', {
            templateUrl: 'views/categoryDetails.html',
            controller: 'CategoryDetailsCtrl',
            access: { requiredLogin: true }
        })
        .when('/database/users/addUser', {
            templateUrl: 'views/userDetails.html',
            controller: 'UserDetailsCtrl',
            access: { requiredLogin: true }
        })
        .when('/database/users/:id', {
            templateUrl: 'views/userDetails.html',
            controller: 'UserDetailsCtrl',
            access: { requiredLogin: true }
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            access: {requiredLogin: true}
        })
        .when('/map', {
            templateUrl: 'views/map.html',
            controller: 'MapCtrl',
            access: {requiredLogin: true}
        })
        .when('/checkins', {
            templateUrl: 'views/checkins.html',
            controller: 'CheckinCtrl',
            access: {requiredLogin: true}
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.run(function ($rootScope, $location, AuthenticatedService) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access && nextRoute.access.requiredLogin && nextRoute.access.requiredLogin === true) {
            AuthenticatedService.isAuthenticated()
                .error(function () {
                    $location.path("/login");
            });
        }
    });
});
