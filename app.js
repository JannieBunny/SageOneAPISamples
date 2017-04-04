(function(){
    var app = angular.module('app', ['angular-loading-bar']);

    app.constant('API_URL', 'https://accounting.sageone.co.za/api/1.1.2/');
    
    app.config(function($httpProvider){
        //Our interceptor adds the API key and company id when present. We don't need to add it ourselves.
        $httpProvider.interceptors.push('interceptor');
    });
})();