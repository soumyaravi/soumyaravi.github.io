/**
 * Created by Soumya on 3/17/2017.
 */
(function () {
    'use strict'

    angular.module('data')
        .service('MenuDataService',MenuDataService )
        .constant('ApiBasePath',' https://davids-restaurant.herokuapp.com');

    MenuDataService.$inject = ['$http','ApiBasePath'];
    function MenuDataService($http,ApiBasePath) {
        var service = this;
        service.categoryShortName = '';
        var categories = [];
        service.getAllCategories = function () {
            categories = [];
            var response = $http({
                method:'GET',
                url : (ApiBasePath + '/categories.json')
            })
                .then(function (result) {
                    var ans = result.data;
                    for(var i = 0;i<ans.length;i++){
                        var obj = {
                            name: ans[i].name,
                            short_name : ans[i].short_name
                        };
                        categories.push(obj);
                    }

                });
            return categories;
        };

        service.getItemsForCategory = function (categoryShortName) {
            // show all menu items for given category
            var menuItems = [];
            var response = $http({
                method:'GET',
                url : (ApiBasePath + '/menu_items.json'),
                params: {category: categoryShortName}
            })
                .then(function (result) {
                    var ans = result.data.menu_items;
                    for(var i = 0;i<ans.length;i++){
                        var obj = {
                            name: ans[i].name,
                            price_large : ans[i].price_large,
                            description : ans[i].description
                        };
                        menuItems.push(obj);
                    }
                });
            return menuItems;
        };
    }
})();