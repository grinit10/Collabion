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
            .otherwise({redirectTo:'/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });