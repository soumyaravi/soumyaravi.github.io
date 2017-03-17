/**
 * Created by Soumya on 3/16/2017.
 */
(function () {
    'use strict'
    angular.module('NarrowItDownApp',[])
        .controller('NarrowItDownController',NarrowItDownController)
        .service('MenuSearchService',MenuSearchService)
        .directive('foundItems',foundItemsDirective)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope:{
                found: '<',
                //foundItems: '@title',
                // badRemove: '=',
                onRemove: '&'
            },
            controller: foundItemsDirectiveController,
            controllerAs: 'items',
            bindToController: true
        };

        return ddo;
    }
    
    function foundItemsDirectiveController() {
        var items = this;
        items.removeItem = function () {
            console.log("33",items.found);

        };
    }
    NarrowItDownController.$inject = ['MenuSearchService','$timeout'];
    
    function NarrowItDownController(MenuSearchService,$timeout) {
        var narrow = this;
        narrow.searchTerm = '';
        narrow.found = '';

        narrow.search = function(){
            narrow.error = '';
            narrow.found = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
            $timeout(function () {
                narrow.length = narrow.found.length;
                narrow.error = 'Nothing found';
            },1000);
        }
        narrow.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };
    }

    MenuSearchService.$inject=['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath){
        var service = this;
        var foundItems=[];
        service.getMatchedMenuItems = function(searchTerm){
            foundItems=[];
            searchTerm = searchTerm.trim();
            if(searchTerm.length == 0)
                return foundItems;
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            })
                .then(function (result) {
                    var len = result.data.menu_items.length;
                    var data = result.data;
                   for(var i=0;i<len;i++){
                       var des = data.menu_items[i].description;
                       if(des.indexOf(searchTerm.toLowerCase()) != -1){
                           var obj = {
                               name: data.menu_items[i].name,
                               short_name : data.menu_items[i].short_name,
                               description : des
                           }
                           foundItems.push(obj);
                       }
                   }
                });


            return foundItems;
        };
        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };
    }
})();