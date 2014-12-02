'use strict';

/**
 * This file configures the main angular module, 'purlieu'
 * and registers Services, Models, Controllers, Directives & Routes
 */

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-animate');
require('angular-sanitize');

var purlieu = angular.module('purlieu', [
  'ngRoute',
  'base64',
  'ngCookies',
  'ngAnimate',
  'ngSanitize',
]);

// Services
// require('./js/services/auth-service')(purlieu);

// Models

// Controllers

require('./js/controllers/home-controller')(purlieu);
require('./js/controllers/login-controller')(purlieu);
require('./js/controllers/new-user-controller')(purlieu);
require('./js/controllers/dtosaua-controller')(purlieu);

// Directives

require('./js/directives/footer/footer-directive')(purlieu);
require('./js/directives/login/login-directive')(purlieu);
require('./js/directives/newuser/new-user-directive')(purlieu);

// Routes

purlieu.config([ '$routeProvider', '$locationProvider', 
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home-view.html',
        controller: 'homeController'
      })
      .when('/dtosaua', {
        templateUrl: 'views/dtosaua.html',
        controller: 'dtosauaController'
      })
      .when('/signout', {
        templateUrl: 'views/home-view.html',
        controller: 'loginController'
      })
      .otherwise({
        redirectTo: '/'
      });

} ]);