angular.module('userApp',['appRouts','UserController','MainController','ngAnimate','mainServices','userServices'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("authInterceptors");
    });