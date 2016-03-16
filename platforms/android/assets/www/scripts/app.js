'use strict';
  
/**
 * @ngdoc overview
 * @name APP
 * @description
 * # APP
 *
 * Main module of the application.
 */
 
var app = angular.module('APP', [
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'angular-md5',
		'ngTouch',
		'ui.bootstrap',
		'angular-jwt',
		'angular-storage',
		'ui-listView',
		'ngProgress',
		'angular-carousel',
		'ngPinchZoom',
		//'uiGmapgoogle-maps',
		'toaster'
	])
	.constant('CONFIG', {
		APIURL: "http://190.12.101.74/ais/lukas/api",
		URLFILE: "http://190.12.101.74/ais/lukas/files"
	})
	.run(["$rootScope", 'jwtHelper', 'store', '$location', 'autenticacionFactory',
	function($rootScope, jwtHelper,   store,   $location,   autenticacionFactory){
		$rootScope.rootMenu=1;
		$rootScope.banConexion = true;
		$rootScope.eventoLogueado = false;
		$rootScope.usuarioLogueado = false;	
		$rootScope.banDB = false;
		
		var token = store.get("token") || null;
		/**
		if ((token != null) && (!jwtHelper.isTokenExpired(token))){
			$rootScope.eventoLogueado = true;				
			EventosService.set(autenticacionFactory.getEvento());	
			//$location.path("/main");
			UsuariosService.set(autenticacionFactory.getUsuario());			
			var usuario = UsuariosService.get();
			
			if (usuario != null) {
				$rootScope.usuarioLogueado = true;			
			}	
		}

		/* verifica que el token no haya expirado en tal caso lo redirecciona al login *
		$rootScope.$on('$routeChangeStart', function (event, next) {
			var token = store.get("token") || null;
			if (!token){
				if($rootScope.banConexion){
					$location.path("/login");
				}
			}
			
			if (token != null){
				var bool = jwtHelper.isTokenExpired(token);
				if (bool === true){
					$location.path("/login");
				}
			}
		});
		/**/
	}])
	.config(["$routeProvider","$httpProvider","jwtInterceptorProvider",  
	function ($routeProvider,  $httpProvider,  jwtInterceptorProvider){
		
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		
		/** en cada peticion envia el token en los headers con el nombre Authorization */
		jwtInterceptorProvider.tokenGetter = function() {
			return localStorage.getItem('token');
		};
		$httpProvider.interceptors.push('jwtInterceptor');
		/**/
		
		$routeProvider
			.when("/login", {
				templateUrl: 'views/login.html',
				controller: 'loginController',
				authorization: false
			})
			.when("/offline", {
				templateUrl: 'views/offline.html',
				controller: 'backgroundController',
				authorization: false
			})
			.when("/", {
				templateUrl: 'views/perfil.html',
				//controller: 'MainController',
				//controllerAs: 'main',
				//authorization: true
			})
			.when("/perfil", {
				templateUrl: 'views/perfil.html',
				//controller: 'MainController',
				//controllerAs: 'main',
				//authorization: true
			})
			.when("/buscar", {
				templateUrl: 'views/buscar.html',
				//controller: 'MainController',
				//controllerAs: 'main',
				//authorization: true
			})	
			.when("/chat", {
				templateUrl: 'views/chat.html',
				//controller: 'MainController',
				//controllerAs: 'main',
				//authorization: true
			})	
			.when("/topchat", {
				templateUrl: 'views/topchat.html',
				//controller: 'MainController',
				//controllerAs: 'main',
				//authorization: true
			})	
			.when("/config", {
				templateUrl: 'views/config.html',
				//controller: 'MainController',
				//controllerAs: 'main',
				//authorization: true
			})	
			.when("/main", {
				templateUrl: 'views/main.html',
				controller: 'MainController',
				controllerAs: 'main',
				authorization: true
			})	
			.when("/brindar", {
				templateUrl: 'views/brindar/listar.html',
				controller: 'BrindarController',
				authorization: true
			})					
			.otherwise({
				redirectTo: '/',
				authorization: true
			})
		;
	}])
;
 
app.directive('onScroll', function() 
{
    return function(scope, elem, attr) 
    {
        //contenedor sobre el que debe actuar
        var $this = elem[0];
        //controlamos el evento scroll de este elemento
        elem.bind('scroll', function() 
        {
            //si el scroll llega al final ejecutamos la función 
            if ($this.scrollTop + $this.offsetHeight >= $this.scrollHeight) 
            {
                scope.$apply(attr.onScroll);
            }
        });
    }
});