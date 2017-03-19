/**
 * Created by Soumya on 3/17/2017.
 */
(function () {
    'use strict'

    angular.module('MenuApp')
        .component('categories',{
            templateUrl : 'displayCategories.html',
            bindings :{
                categories     : '<'
            }
        });

})();