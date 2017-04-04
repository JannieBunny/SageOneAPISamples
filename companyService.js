(function(){
    angular.module('app').factory('companyService', function($http, API_URL){
        return {
            get:getCompanies
        };

        function getCompanies(loadPerCall, page){
            var oData = {
                $top: loadPerCall || 100
            };
            if(page){
                oData.$skip = page * loadPerCall;
            }
            return $http.get(API_URL + 'Company/Get',{
                    params: oData
                }).then(function(httpResult){
                return httpResult.data;
            });
        }
    });
})();