/**
 * Created by Soumya on 3/17/2017.
 */
(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items'];
    function ItemsController(items) {
        var item = this;
        item.menu =  items;
    }

})();