'use strict';

module.exports = function(app){

  app.directive('paypal', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/account/paypal/paypal-template.html',
      controller: 'paypalController'
    };
  });

};