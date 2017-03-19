/**
 * Created by Soumya on 3/17/2017.
 */
(function () {
    'use strict'

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home',{
            url:'/',
            templateUrl:'home.html'
        })
            .state('categories', {
                url: '/categories',
                templateUrl: 'main-cat.html',
                controller: 'CategoriesController as cat',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{shortName}',
                templateUrl: 'item-details.html',
                controller: 'ItemsController as item',
                resolve: {
                    items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
                        return  MenuDataService.getItemsForCategory($stateParams.shortName);
                    }]
                }

            });
    }

})();