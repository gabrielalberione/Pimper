'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('BrindarController',  [
			'$rootScope', '$scope', 'store', '$http', '$uibModal', 'MarkersService', 'CarruselService', 'databaseFactory', 'mesasFactory', 'ngProgressFactory', '$location', 'CONFIG', 'toaster', 'usuariosFactory', 'UsuariosService', 'eventosFactory', 'EventosService', 'markersFactory', 'multimediasFactory', 'autenticacionFactory', 
	function($rootScope,  $scope, store, $http, $uibModal, MarkersService, CarruselService, databaseFactory, mesasFactory, ngProgressFactory,  $location,  CONFIG, toaster, usuariosFactory, UsuariosService, eventosFactory, EventosService, markersFactory, multimediasFactory, autenticacionFactory){
                                   
		
		parent.pageActual = 'brindar';
		var param = {		
			//filter: ["brindar=1"]
			filter: ["facebook_id != ''"]
		};		
		
		$scope.usuarios_brindar = [];
		
		usuariosFactory.listar_brindar(param).then(function(res){
			$scope.usuarios_brindar = res.data.usuarios;
		});	

		$scope.mas = function(){
			usuariosFactory.listar_brindar(param).then(function(res){
				$scope.usuarios_brindar = res.data.usuarios;
			});	
		}
		
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			parent.iniciar();
		});
										   
	}
]);