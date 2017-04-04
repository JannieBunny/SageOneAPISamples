(function(){
    angular.module('app').factory('interceptor', function($q, $rootScope, $window) {
        var apikey = '{your_api_key}';
        var username = "your_sageone_email";
        var password = "your_sageone_password";

        return {
            request: function(config) {
                config.params = config.params || {};
                config.params.apikey = apikey;
                //If we have a company id, inject it
                if ($rootScope.companyId) {
                    config.params.companyid = $rootScope.companyId;
                }
                if (username && password) {
                    config.headers = config.headers || {};
                    //Basic Auth
                    config.headers.Authorization = 'Basic ' + $window.btoa(username + ':' + password);
                }
                return config;
            },
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
            response: function(response) {
                return response;
            },
            responseError: function(rejection) {
                return $q.reject(rejection);
            }
        };
    });
})();