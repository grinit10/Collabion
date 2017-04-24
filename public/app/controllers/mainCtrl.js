angular.module('MainController',['mainServices'])
    .controller('LoginCtrl',function ($http,$location,$timeout,Login) {
            var ctrl = this;
            ctrl.showLoading = false;
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
        }
    )