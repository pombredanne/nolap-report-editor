'use strict';

angular.module('report-editor', [
    'ui.router',
    'ui.bootstrap',
    'jmdobry.angular-cache',
    'ngProgressLite',

    'report-api',
    'report-model',
    'rules-model',
    'excel-parser',
    'formula-parser',
    'forms-ui',
    'layoutmodel'
])
.run(function($rootScope, ngProgressLite) {
  
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
})
//TODO: to be removed by the final version of the REST API
.factory('ReportEditorConfig', function(){
    return {
        api: {
            endpoint: 'http://secxbrld2.beta.28.io/v1/_queries/public/reports',
            token: '29143de0-8328-404d-b7f0-591bb871c13f'
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

    $locationProvider.html5Mode(true);
})
;
