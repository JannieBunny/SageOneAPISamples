(function(){
    angular.module('app').controller('companyController', function($scope, $rootScope, companyService, $timeout){

        var selectedCompany;
        //Amount of companies to return from the API - oData ($top, $skip)
        var countPerPage = 8; 

        $scope.paging = {
            enabled: false,
            pages: 0,
            currentPage: 1
        };

        function init(page){
            companyService.get(countPerPage, page).then(function(companies){
                //Calculate the amount of pages if there is more companies that the default count per page to return
                if(companies.TotalResults > countPerPage){
                    $scope.paging.enabled = true;
                    $scope.paging.pages =  Math.ceil(companies.TotalResults / countPerPage);
                }
                else{
                    $scope.paging.enabled = false;
                }
                $scope.companies = companies.Results;
            }).catch(function(error){
                $scope.response = {
                    error: error.statusText || error.data
                };
            }).finally(function(){
                $timeout(function(){
                    $scope.response = {};
                }, 2500);
            });
        } 

        $scope.selectCompany = function(company){
            //Clear current selected company
            if(selectedCompany){
                selectedCompany.Selected = false;
                $rootScope.companyId = undefined;
            }
            //Set new selected company
            selectedCompany = company;
            company.Selected = true;
            $rootScope.companyId = selectedCompany.ID;
        };

        //Paging
        $scope.gotoPage = function(index){
            init(index - 1);
            $scope.paging.currentPage = index;
        };

        init();
    });
})();