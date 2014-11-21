'use strict';
   

module.exports = function(app){
  app.controller('homeController', ['$scope', function(){
    var $ = require('jquery');
    var menuItems = $('nav .menu-item > a');

    menuItems.on('click', function(){
      if( $(this).parents('.menu-item').hasClass('active') ){
        $(this).parents('.menu-item').removeClass('active');
      } else {
        $('.menu-item').removeClass('active');
        $(this).parents('.menu-item').addClass('active');
      }
    });

  }]);

};