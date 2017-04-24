angular.module("mainServices",[])
    .factory("Login",function ($http) {
        loginFactory = {};
        loginFactory.authenticate = function (authData) {
            return $http.post('/api/authenticate',authData);
        }
        return loginFactory;
    })