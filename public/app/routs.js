angular.module('appRouts',['ngRoute'])

    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl:"app/views/pages/Home.html"
            })
            .when('/about',{
                templateUrl:"app/views/pages/about.html"
            })
            .when('/register',{
                templateUrl: "app/views/pages/users/register.html",
                controller:  "RegistrationCtrl",
                controllerAs: "Register"
            })
            .when('/login',{
                templateUrl: "app/views/pages/users/login.html",
                controller:  "LoginCtrl",
                controllerAs: "Login"
            })
            .otherwise({redirectTo:'/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });