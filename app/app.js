'use strict';

angular.module('report-editor', [
    'ui.router',
    'ui.bootstrap',
    'jmdobry.angular-cache',
    'ngProgressLite',
    'constants',
    'api',
    'session-model',
    'report-model',
    'rules-model',
    'excel-parser',
    'formula-parser',
    'forms-ui',
    'layoutmodel'
])

.factory('ConnectionHandler', function($q, $rootScope, DEBUG){
    return {
        'responseError': function(rejection){
            if(rejection.status === 401) {
                if(DEBUG) {
                    console.error('intercepted 401: emitting auth');
                }
                $rootScope.$emit('auth');
            }
            return $q.reject(rejection);
        }
    };
})

.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {

    //Because angularjs default transformResponse is not based on ContentType
    $httpProvider.defaults.transformResponse = function(response, headers){
        var contentType = headers('Content-Type');
        if(/^application\/(.*\+)?json/.test(contentType)) {
            try {
                return JSON.parse(response);
            } catch(e) {
                console.error('Couldn\'t parse the following response:');
                console.error(response);
                return response;
            }
        } else {
            return response;
        }
    };

    $httpProvider.interceptors.push('ConnectionHandler');

    $locationProvider.html5Mode(true);

    $stateProvider
        //Auth
        .state('auth', {
            url: '/auth{returnPage:.*}',
            templateUrl: '/auth/auth.html',
            controller: 'AuthCtrl',
            data: {
                title: 'Login'
            }
        });
})

.run(function($rootScope, ngProgressLite, $state, $location, API, Session) {

    $rootScope.$on('$stateChangeStart', function() {
        ngProgressLite.start();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        ngProgressLite.done();
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error(error);
        ngProgressLite.done();
    });

    $rootScope.$on('auth', function() {
        Session.redirectToLoginPage();
    });
})
;
