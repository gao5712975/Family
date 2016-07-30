/**
 * Created by Yuan on 2016/7/22.
 */
ApplicationConfig.registerModule("userModule");

angular.module('userModule',[])
    
.controller('UserCtrl',['$scope','$http',function ($scope,$http) {
    $scope.user = {};
    $scope.user.sort = 0;
    $scope.save = function () {
        $scope.user.organizeName = $scope.user.organizeId.name;
        $scope.user.organizeId = $scope.user.organizeId._id;

        $scope.user.companyName = $scope.user.companyId.name;
        $scope.user.companyId = $scope.user.companyId._id;

        $scope.user.roleName = $scope.user.roleId.name;
        $scope.user.roleId = $scope.user.roleId._id;
        
        $http.post(baseUrl + '/user/saveEntity.htm', $scope.user).success(function (res) {
            console.info(res);
        })
    };
    $http.get(baseUrl + '/organize/findAll.htm/').success(function (res) {
        if(res && res.code == 200){
            $scope.organizeList = res.doc;
        }
    });
    $http.get(baseUrl + '/company/findAll.htm/').success(function (res) {
        if(res && res.code == 200){
            $scope.companyList = res.doc;
        }
    });
    $http.get(baseUrl + '/role/findAll.htm/').success(function (res) {
        if(res && res.code == 200){
            $scope.roleList = res.doc;
        }
    });
}])

.controller('FileUploadCtrl',['$scope','$http',function ($scope,$http) {
    var uploader = WebUploader.create({
        auto:true,
        server: baseUrl + '/load/profile.htm',
        pick: '#fileUpload',
    })
    uploader.on('uploadSuccess',function(file){
        console.info(file)
    })
}])

.controller('LoginCtrl',['$scope','$http',function ($scope,$http) {
    $scope.user = {user:'admin',password:'666666'}
    $scope.login = function () {
        $http.post(baseUrl + '/user/login.htm/',$scope.user).success(function (res) {
            console.info(res)
        })
    }
}])

