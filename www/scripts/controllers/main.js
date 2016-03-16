'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('MainController',  [
			'$rootScope', '$scope', 'store', '$http', '$uibModal', 'ngProgressFactory', '$location', 'CONFIG', 'toaster', 'autenticacionFactory', 
	function($rootScope,  $scope, store, $http, $uibModal, ngProgressFactory,  $location,  CONFIG, toaster, autenticacionFactory){
        parent.pageActual = 'main';		
		
	}
]);