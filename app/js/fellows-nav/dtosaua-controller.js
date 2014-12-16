'use strict';

module.exports = function(app){

  app.controller('dtosauaController', ['$cookies', '$location', '$scope',
    function($cookies, $location, $scope){

    if (!$cookies.jwt || $cookies.jwt.length < 10) {
      console.log('not authorized');
      $cookies.jwt = null;
      return $location.path('/');
    }

    $scope.select = function(sectionName){
      $scope.menu.items.forEach(function(item){
        if (item.name === sectionName){
          item.active = true;
        } else {
          item.active = false;
        }
      });
    };

    $scope.getPage = function(sectionName, pageName){
      $scope.menu.items.forEach(function(item){
        if (item.name === sectionName){
          item.submenu.forEach(function(subitem){
            if (subitem.name === pageName){
              subitem.active = true;
            } else {
              subitem.active = false;
            }
          });
        }
      });
    };

    /* jshint ignore:start*/
    $scope.menu = {'items' : [
      {
        'name' : 'home',
        'submenu' : [
          {
            'name' : 'welcome',
            'header' : '102',
            'content' : '<p>sl<span class="bold">kdjfslkdj</span>flskdjflskdjflsl kdjfslkdjflskdj flskdjflslkdjfslk</p><p>djflskdjflskdjf lslkdjfslkdjflskd jflskdjflslkdjfsl kdjflskdjflskdjfl</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p><p>hi</p>'
          }
        ]
      },
      {
        'name' : 'calendar',
        'submenu' : [
          {
            'name' : 'upcoming',
            'content' : 'aoiungslkdjf sdjflskjdf'
          },
          {
            'name' : 'search',
            'content' : 'sdlfj sdlkd dkd dkk'
          },
          {
            'name' : 'rsvp',
            'content' : 'weiuowijeroiwer woieurowijdlkjs owieu j sdoifuwoejls jsdlfiweojdlsjlf klidjfo kljsd flkuweoijflsd'
          },
          {
            'name' : 'past events',
            'content' : 'skj sndfliauoiwj d owijdofij ndlkjowijdf lkjsd fliuwoidjfnlskn dlfi wjoiejf dnslkfn li'
          }
        ]
      },
      {
        'name' : 'hours',
        'submenu' : [
          {
            'name' : 'current hours',
            'content' : 'slkdjfslkdjflskdjflskdjfl'

          },
          {
            'name' : 'requests',
            'content' : 'slkdjf sldkjfl sdjlkfs ldkfjsl kdjfsl kdf'
          }
        ]
      },
      {
        'name' : 'libarary',
        'submenu' : [
          {
            'name' : 'catalogue',
            'content' : 'sk djflkjs'
          },
          {
            'name' : 'collections',
            'content' : 'sdfsdf'
          },
          {
            'name' : 'search',
            'content' : 'sdfsdfs'
          },
          {
            'name' : 'recordings',
            'content' : 'conaonf  sdfklsd fjdkf'
          },
          {
            'name' : 'donate',
            'content' : 'sdlfi ljskd flsjdkf'
          }
        ]
      },
      {
        'name' : 'articles',
        'submenu' : [
          {
            'name' : 'about',
            'content' : 'sdfsf ds sa safdasdf fdfd'
          },
          {
            'name' : 'submissions',
            'content' : 'sdf s asdfwfdsdfcds sdfsd fsdf'
          },
          {
            'name' : 'archive',
            'content' : 'sadf skdjfsl kdaf'
          },
          {
            'name' : 'contests',
            'content' : 'asldjfsd lskdjfsldf jowiwoij fmsldfjwoiej fwndwlkfjw'
          }
        ]
      },
      {
        'name' : 'dues',
        'submenu' : [
          {
            'name' : 'dues',
            'content' : 'asdflksjdf sldkjflskdjf l'
          }
        ]
      }

    ]}; // end $scome.menu.items

    // init
    $scope.menu.items[0].active = true;
    $scope.menu.items.forEach(function(item){
      item.submenu[0].active = true;
    });

    /* jshint ignore:end*/


  }]);
};