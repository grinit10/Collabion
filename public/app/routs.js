var app = angular.module('appRouts',['ngRoute'])

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
                controllerAs: "Register",
                authenticated: false
            })
            .when('/login',{
                templateUrl: "app/views/pages/users/login.html",
                controller:  "LoginCtrl",
                controllerAs: "Login",
                authenticated: false
            })
            .when('/logout',{
                templateUrl: "app/views/pages/users/logout.html",
                authenticated: true
            })
            .when('/profile',{
            templateUrl: "app/views/pages/users/profile.html",
                authenticated: true
            })
            .otherwise({redirectTo:'/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

app.run(['$rootScope',function ($rootScope) {
    $rootScope.$on("$routeChangeStart",function (event,next,current) {
       console.log(next.$$route);
    });
}])