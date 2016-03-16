angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.perfil'
      2) Using $state.go programatically:
        $state.go('tabsController.perfil');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page2
      /page1/tab4/page2
  */
  .state('tabsController.perfil', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      },
      'tab4': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('tabsController.buscador', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/buscador.html',
        controller: 'buscadorCtrl'
      }
    }
  })

  .state('tabsController.conversaciones', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/conversaciones.html',
        controller: 'conversacionesCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.ranking', {
    url: '/page5',
    views: {
      'tab4': {
        templateUrl: 'templates/ranking.html',
        controller: 'rankingCtrl'
      }
    }
  })

  .state('tabsController.preferencias', {
    url: '/page6',
    views: {
      'tab5': {
        templateUrl: 'templates/preferencias.html',
        controller: 'preferenciasCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/tab1/page2')

  

});