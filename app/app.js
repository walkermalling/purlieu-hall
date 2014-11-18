'use strict';

/**
 * This file configures the main angular module, 'purlieu'
 * and registers Services, Models, Controllers, Directives & Routes
 */

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var redcedar = angular.module('redcedar', [
  'ngRoute',
  'base64',
  'ngCookies'
]);

// Services

// Models

// Controllers

// Directives

// Routes

redcedar.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home-view.html'
      })
      .otherwise({
        redirectTo: '/home'
      });

} ]);