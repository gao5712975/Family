/**
 * Created by Yuan on 2016/7/22.
 */
ApplicationConfig.registerModule("userModule");

var app = angular.module('userModule',[]);

app.controller('UserCtrl',['$scope','$http',function ($scope,$http) {
    $scope.user = {};
    $scope.user.sort = 0;
    $scope.save = function () {
        $http.post(baseUrl + '/saveUserEntity.htm',JSON.stringify($scope.user),{
            headers:{
                'Accept':'application/json'
            }
        }).success(function (res) {
            console.info(res);
        })
    }
}])