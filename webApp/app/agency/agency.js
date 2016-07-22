/**
 * Created by moka on 16-7-22.
 */

ApplicationConfig.registerModule("agencyModule");

angular.module('agencyModule',[])

.controller('AgencyCtrl',['$scope','$http',function ($scope,$http) {
    $scope.agency = {};
    $scope.save = function () {
        $http.post(baseUrl + '/agency/saveEntity.htm', $scope.agency,configJson).success(function (res) {
            console.info(res);
        })
    }
}]);