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

var App = angular.module(ApplicationConfig.moduleName, ApplicationConfig.moduleDependencies);

function toQueryPair(key, value) {
    if (typeof value == 'undefined') {
        return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

function toBodyString(obj) {
    var ret = [];
    for (var key in obj) {
        var values = obj[key];
        if (values && values.constructor == Array) { //数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
        } else { //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return ret.join('&');
}

var configForm = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (!data) return undefined;
        return toBodyString(data);
    }
};

var configJson = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (!data) return undefined;
        return JSON.stringify(data);
    }
};

var baseUrl = '//127.0.0.1:3000';