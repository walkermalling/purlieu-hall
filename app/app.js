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

/**
 * Services
 */
require('./js/services/account-server')(purlieu);
require('./js/services/user-server')(purlieu);
require('./js/services/cms-server')(purlieu);
require('./js/services/content-server')(purlieu);
require('./js/services/auth-service')(purlieu);

/**
 * Controllers
 */
require('./js/public-nav/home-controller')(purlieu);
require('./js/account/signin/signin-controller')(purlieu);
require('./js/account/new-user/new-user-controller')(purlieu);
require('./js/fellows-nav/dtosaua-controller')(purlieu);
require('./js/cms/frontpage-cms-controller')(purlieu);
require('./js/cms/dtosaua-cms-controller')(purlieu);
require('./js/admin/admin-controller')(purlieu);
require('./js/account/user-management/user-management-controller')(purlieu);

/**
 * Directives
 */
require('./js/account/signin/signin-directive')(purlieu);
require('./js/account/new-user/new-user-directive')(purlieu);
require('./js/cms/frontpage-cms-directive')(purlieu);
require('./js/cms/dtosaua-cms-directive')(purlieu);
require('./js/account/user-management/user-management-directive')(purlieu);
          // partials
require('./js/partials/footer/footer-directive')(purlieu);
require('./js/partials/dividers/admin-section-divider-directive')(purlieu);
require('./js/partials/helpers/on-finish-render-directive')(purlieu);
require('./js/partials/dividers/inverted-border-directive')(purlieu);

/**
 * Routes
 */
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
      .when('/dodo', {
        templateUrl: 'views/admin-view.html',
        controller: 'adminController'
      })
      .when('/signout', {
        templateUrl: 'views/home-view.html',
        controller: 'signinController'
      })
      .otherwise({
        redirectTo: '/'
      });
} ]);