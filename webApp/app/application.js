/**
 * Created by Yuan on 2016/7/22.
 */
"use strict";
var ApplicationConfig = (function () {
    var moduleName = "app";
    /*angular模板导入*/
    var moduleDependencies = ['ui.router'];

    // Add a new vertical module
    var registerModule = function(name) {
        // Create angular module
        angular.module(name,moduleDependencies);
        // Add the module to the AngularJS configuration file
        angular.module(moduleName).requires.push(name)
    };
    return {
        moduleName:moduleName,
        moduleDependencies:moduleDependencies,
        registerModule:registerModule
    }
})();

angular.module(ApplicationConfig.moduleName, ApplicationConfig.moduleDependencies);

var baseUrl = '//127.0.0.1:3000';