/*global angular:false */
angular.module('report-api', [])
    .factory('ReportAPI', function($q, $http, $rootScope) {
        'use strict';

        /**
         * <p>This API can be used to manage reports.</p> <p>This API is only accesible for users having granted priviliges to work with reports.</p> <p>Note, that the POST method can be simulated by using GET and adding the _method=POST parameter to the HTTP request.</p>
         * @class " || ReportAPI || "
         * @param {string} domain - The project domain
         * @param {string} cache - An angularjs cache implementation
         */
        return function(domain, cache) {

            if (typeof(domain) !== 'string') {
                throw new Error('Domain parameter must be specified as a string.');
            }

            this.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            this.$broadcast = function(path) {
                var url = domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            /**
 * Retrieve a list of all Reports
 * @method
 * @name ReportAPI#listReports
 * @param {{string}} _id - A report id (e.g. FundamentalAccountingConcepts)
 * @param {{string}} token - The token of the current session

 * 
 */
            this.listReports = function(parameters) {
                var deferred = $q.defer();

                var path = '/reports.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters._id !== undefined) {
                    queryParameters['_id'] = parameters._id;
                }

                if (parameters.token !== undefined) {
                    queryParameters['token'] = parameters.token;
                }

                queryParameters['_method'] = 'POST';

                var url = domain + path;
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
                $http({
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });
                return deferred.promise;
            };
            /**
             * Add a new, update an existing report or validates a report on the fly
             * @method
             * @name ReportAPI#addOrReplaceOrValidateReport
             * @param {{object}} report - A JSON object containing the report
             * @param {{boolean}} validationOnly - This parameter is either given without any value (means: on) or absent (means: off) or its value is castable to a boolean. Turns validation-only mode on or off.
             * @param {{string}} token - The token of the current session
             *
             */
            this.addOrReplaceOrValidateReport = function(parameters) {
                var deferred = $q.defer();

                var path = '/add-report.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters.report === undefined) {
                    deferred.reject(new Error('Missing required body parameter: report'));
                    return deferred.promise;
                }

                if (parameters.report !== undefined) {
                    body = parameters.report;
                }

                if (parameters.validationOnly !== undefined) {
                    queryParameters['validation-only'] = parameters.validationOnly;
                }

                if (parameters.token !== undefined) {
                    queryParameters['token'] = parameters.token;
                }

                var url = domain + path;
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });
                return deferred.promise;
            };
            /**
             * Delete an existing report
             * @method
             * @name ReportAPI#removeReport
             * @param {{string}} _id - A report id (e.g. FundamentalAccountingConcepts)
             * @param {{string}} token - The token of the current session
             *
             */
            this.removeReport = function(parameters) {
                var deferred = $q.defer();

                var path = '/delete-report.jq';

                var body;
                var queryParameters = {};
                var headers = {};

                if (parameters._id === undefined) {
                    deferred.reject(new Error('Missing required query parameter: _id'));
                    return deferred.promise;
                }

                if (parameters._id !== undefined) {
                    queryParameters['_id'] = parameters._id;
                }

                if (parameters.token !== undefined) {
                    queryParameters['token'] = parameters.token;
                }

                var url = domain + path;
                $http({
                    timeout: parameters.$timeout,
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });
                return deferred.promise;
            };
        };
    });