/**
 * Created by Yuan on 2016/7/22.
 */
ApplicationConfig.registerModule("userModule");

angular.module('userModule',[])
    
.controller('UserCtrl',['$scope','$http',function ($scope,$http) {
    $scope.user = {};
    $scope.user.sort = 0;
    $scope.save = function () {
        $http.post(baseUrl + '/user/saveEntity.htm', $scope.user).success(function (res) {
            console.info(res);
        })
    }
}])