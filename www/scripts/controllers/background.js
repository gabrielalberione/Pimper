'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('backgroundController',  [
			'$scope','$rootScope', '$route','CONFIG', '$uibModal', "$q",'$location', 'databaseFactory', 'autenticacionFactory', 'EventosService', 'store','$interval',
	function($scope,  $rootScope, $route, CONFIG, $uibModal, $q, $location, databaseFactory, autenticacionFactory, EventosService, store,  $interval){		
		
		$rootScope.globalVars = {};	
		$rootScope.globalVars.misFotos = {};
		 
		$scope.background = {};
		
		$scope.prepararDB = function(){
			// Creo la BD si no existe
			databaseFactory.openDatabase();
			databaseFactory.crearTablas();		
		}
		
		$scope.cerrarModal = function () {
			$scope.modalInstance.close();
		};	
		
		$scope.salirApp = function(){
			navigator.app.exitApp();	
		}
		
		$scope.banSubiendo = false;
		
		$scope.alertaSalida = function(){
			parent.pagePadreModal = parent.pageActual;
			parent.pageActual = 'modal';
		    $scope.modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: './views/alertas/salir.html',
				//controller: 'ModalContactoController',
				scope: $scope,
				size: 'large'
			});	

			/*$scope.modalInstance.result.then(function (selectedItem) {
				  //
				}, function () {
				  banCartel = false;
			});	*/	
		}
		
		/* verifica si hay fotos para enviar */
		var intervalChequeos = $interval(function() {	
			if($rootScope.eventoLogueado){
				var promiseCon = $scope.verificiarConexion();
				promiseCon.then(function(pReturn) {
					if((pReturn)&&($scope.banSubiendo == false)){						
						var promise = databaseFactory.getFotoRechazada();		
						promise.then(function(greeting) {	
							$rootScope.globalVars.misFotos = greeting;
							$scope.reEnviar(greeting[0]);
						}, function(reason) {
						  alert(reason);
						});		
					}
				}, function(reason) {
				  alert(reason);
				});		
			}				
		}, 5000);				
		
		/* verifica si hay conexion */
		$scope.verificiarConexion = function(){
			return $q(function(resolve, reject) {
				if((navigator.network.connection.type).toUpperCase() != "NONE" &&
				   (navigator.network.connection.type).toUpperCase() != "UNKNOWN") {
				   
					if(parent.pageActual == 'offline'){
						$location.path("/");	
					}else if($rootScope.banConexion == false){
						$scope.actualizarPantalla();
					}
					
					$rootScope.banConexion = true;
					resolve(true);		
				}else{
					$rootScope.banConexion = false;
					/*if(parent.pageActual == 'login'){
						parent.pageActual = 'offline';
						$location.path("/offline");
					}	*/
					
					resolve(false);		
				}
			});
		}
		
		$scope.background.ultimaFoto = {};
		
		/* verifica si hay fotos para enviar */
		$scope.reEnviar = function(pFoto){		
			if (typeof pFoto != 'undefined'){
				$scope.evento = EventosService.get();
				var options = new FileUploadOptions();
				options.fileKey="file";
				options.fileName=pFoto.ruta.substr(pFoto.ruta.lastIndexOf('/')+1);
				options.mimeType="image/jpeg";
				
				var params = {};
				params.token = autenticacionFactory.getToken();
				params.multimediascategoria_id = 2;
				params.multimediastipo_id = 1;
				params.comentario = pFoto.comentario;				
				params.evento_id = $scope.evento.id;
				options.params = params;

				$scope.background.ultimaFoto.comentario = pFoto.comentario;
				$scope.background.ultimaFoto.id = pFoto.id;
				$scope.background.ultimaFoto.evento_id = $scope.evento.id;
				$scope.background.ultimaFoto.ruta = pFoto.ruta;
				$scope.background.ultimaFoto.rotacion = "0";
				$scope.background.ultimaFoto.estado = 2;
				var promise = databaseFactory.guardarFoto($scope.background.ultimaFoto);						
				if($scope.evento.id != null){
					var ft = new FileTransfer();
					ft.upload(pFoto.ruta, encodeURI(CONFIG.APIURL + "/subirarchivo/upload_imagen"), $scope.background.uploadSuccess, $scope.background.uploadFail, options);						
					$scope.banSubiendo = true;
				}
			}
		}			

		$scope.background.uploadSuccess = function(r){
			$scope.banSubiendo = false;
			console.log("id = " + $scope.background.ultimaFoto.id);	
			$scope.background.ultimaFoto.estado = 0;
			databaseFactory.guardarFoto($scope.background.ultimaFoto);					
		}
		
		$scope.background.uploadFail = function(){
			$scope.banSubiendo = false;
			$scope.background.ultimaFoto.estado = 1;
			databaseFactory.guardarFoto($scope.background.ultimaFoto);				
		}	

		$scope.actualizarPantalla = function(){
			$route.reload();
		}

	}
]);