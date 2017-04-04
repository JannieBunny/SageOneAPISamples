(function(){
    angular.module('app').factory('customerService', function($http, API_URL){
        return {
            get:getCustomers,
            update: updateCustomer
        };

        function getCustomers(){
            return $http.get(API_URL + 'Customer/Get').then(function(httpResult){
                //oData default result count is top 100
                //Customers don't page. Return results on the spot
                return httpResult.data.Results;
            });
        }

        function updateCustomer(customer){
            //Sage One does not support partial updates, therefore send the full object
            return $http.post(API_URL + 'Customer/Save', customer);
        }
    });
})();