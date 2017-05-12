angular.module('MainController',['mainServices'])
    .controller('LoginCtrl',function ($http,$location,$timeout,Login,$rootScope) {
            var ctrl = this;
            ctrl.showLoading = false;
            ctrl.loadMe = false;

            $rootScope.$on("$routeChangeStart",function () {
                if(Login.isLoggedin()){
                    ctrl.isLoggedin = true;
                    Login.GetUser().then(function(data){
                        ctrl.username = data.data.username;
                        ctrl.email = data.data.email;
                    })
                }
                else{
                    ctrl.username = "";
                    console.log("User is not logged in");
                    ctrl.isLoggedin = false;
                }
                ctrl.loadMe = true;
            });

            this.authenticate = function () {
                ctrl.showLoading = true;
                Login.authenticate(ctrl.authData).then(
                    function (obj) {
                        ctrl.showLoading = false;
                        ctrl.errorMessage = false;
                        ctrl.successMessage = false;
                        if(obj.data.success){
                            ctrl.successMessage = obj.data.message + "...Redirecting";
                            $timeout(function () {
                                $location.path("/");
                            },2000);
                        }
                        else{
                            ctrl.errorMessage = obj.data.message;
                        }
                    }
                )
            }
            
            this.logout = function () {
                Login.logout();
                $location.path('/logout');
                $timeout(function () {
                    $location.path('/');
                },2000);
            }
        }
    )