(function(){
    angular.module('app').controller('customerController', function($scope, customerService, $timeout){

        var selectedCustomer;

        $scope.loadCustomer = function(customer){
            //Clear current selected company
            if(selectedCustomer){
                selectedCustomer.Selected = false;
            }
            //Set new selected company
            selectedCustomer = customer;
            customer.Selected = true;
        };

        $scope.updateCustomer = function(customer){
            customerService.update(customer)
            .then(function(){
                $scope.response = {
                    success: true
                };           
            })
            .catch(function(error){
                $scope.response = {
                    error: error.data
                };
            }).finally(function(){
                $timeout(function(){
                    $scope.response = {};
                }, 2500);
            });
        };

        $scope.$watch('companyId', function(){
            if($scope.companyId){
                init();
            }
        });

        function init(){
            customerService.get().then(function(customers){
                $scope.customers = customers;
            });
        }
    });
})();