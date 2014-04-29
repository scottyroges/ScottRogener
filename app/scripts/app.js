'use strict';

/* global app:true */
var app = angular
.module('scottRogenerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
  ]);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/projects.html',
    controller: 'ProjectCtrl'
  }) 
  .when('/About', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/Contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl'
  })    
  .otherwise({
    redirectTo: '/'
  });
});
