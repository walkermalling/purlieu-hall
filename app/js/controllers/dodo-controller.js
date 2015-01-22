// 'use strict';

// module.exports = function(app){

//   app.controller('dodoController', ['$cookies', '$location', '$scope',
//     function($cookies, $location, $scope){

//     if (!$cookies.jwt || $cookies.jwt.length < 10) {
//       console.log('not authorized');
//       $cookies.jwt = null;
//       return $location.path('/');
//     }

//     $scope.select = function(sectionName){
//       $scope.menu.items.forEach(function(item){
//         if (item.name === sectionName){
//           item.active = true;
//         } else {
//           item.active = false;
//         }
//       });
//     };

//     $scope.getPage = function(sectionName, pageName){
//       $scope.menu.items.forEach(function(item){
//         if (item.name === sectionName){
//           item.submenu.forEach(function(subitem){
//             if (subitem.name === pageName){
//               subitem.active = true;
//             } else {
//               subitem.active = false;
//             }
//           });
//         }
//       });
//     };

//     /* jshint ignore:start*/
//     $scope.menu = {'items' : [
//       {
//         'name' : 'users',
//         'submenu' : [
//           {
//             'name' : 'all',
//             'content' : '<p>A list of all users</p>'
//           }
//         ]
//       },
//       {
//         'name' : 'events',
//         'submenu' : [
//           {
//             'name' : 'all',
//             'content' : '<p>A list of all events</p>'
//           }
//         ]
//       },
//       {
//         'name' : 'library',
//         'submenu' : [
//           {
//             'name' : 'all',
//             'content' : '<p>A list of all books</p>'
//           }
//         ]
//       }
//     ]}; // end $scome.menu.items

//     /* jshint ignore:end*/


//   }]);
// };