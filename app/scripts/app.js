'use strict';

angular.module('suviApp', ['directives'])
  .config(function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
  });