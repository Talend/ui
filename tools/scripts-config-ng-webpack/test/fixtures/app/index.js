import FOO_MODULE from './components/foo/foo-module';
import angular from 'angular';
import 'jquery';

var app = angular.module('myApp', [FOO_MODULE]);

app.controller('MyCtrl', function ($scope) {
	$scope.firstName = 'John';
	$scope.lastName = 'Doe';
});
