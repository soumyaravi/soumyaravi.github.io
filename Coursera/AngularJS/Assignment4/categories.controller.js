/**
 * Created by Soumya on 3/17/2017.
 */
(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['items'];
    function CategoriesController(items) {
        var cat = this;
        cat.categories =items;
    }

})();