angular.module("mainServices",[])
    .factory("Login",function ($http,AuthToken) {
        var loginFactory = {};
        loginFactory.authenticate = function (authData) {
            return $http.post('/api/authenticate',authData).then(function (data) {
                    AuthToken.setToken(data.data.token);
                    return data;
                }
            );
        }

        loginFactory.isLoggedin = function () {
            if(AuthToken.getToken())
                return true;
            else
                return false;
        }

        loginFactory.GetUser = function () {
            if(AuthToken.getToken())
                return $http.get('/api/me');
            else
                return $q.reject({"message":"User has no token!!"});
        }

        loginFactory.logout = function () {
            AuthToken.setToken();
        }
        return loginFactory;
    })

    .factory("AuthToken",function ($window) {
        var AuthTokenFactory = {};

        AuthTokenFactory.setToken = function (token) {
            if(token)
                $window.localStorage.setItem('token',token);
            else
                $window.localStorage.removeItem('token');
        };

        AuthTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        }
        return AuthTokenFactory;
    })

    .factory("authInterceptors",function (AuthToken) {
        var authInterceptorFactory = {};

        authInterceptorFactory.request = function (config) {
            var token = AuthToken.getToken();
            if(token) config.headers["x-access-token"] = token;
            return  config;
        }
        return authInterceptorFactory;
    })