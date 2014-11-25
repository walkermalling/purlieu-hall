'use strict';

/**
 * This file configures the main angular module, 'purlieu'
 * and registers Services, Models, Controllers, Directives & Routes
 */

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var purlieu = angular.module('purlieu', [
  'ngRoute',
  'base64',
  'ngCookies'
]);

// Services
require('./js/services/auth-service')(purlieu);

// Models

// Controllers

require('./js/controllers/user-controller')(purlieu);

// Directives

require('./js/directives/footer-directive')(purlieu);

// Routes

purlieu.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home-view.html',
        controller: 'userController'
      })
      .when('/dtosaua', {
        templateUrl: 'views/dtosaua.html',
        controller: 'userController'
      })
      .when('/signout', {
        templateUrl: 'views/home-view.html',
        controller: 'userController'
      })
      .otherwise({
        redirectTo: '/'
      });

} ]);