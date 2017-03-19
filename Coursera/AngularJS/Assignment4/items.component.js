/**
 * Created by Soumya on 3/17/2017.
 */
(function () {
    'use strict'

    angular.module('MenuApp')
        .component('items',{
            templateUrl : 'displayItems.html',
            bindings :{
                items : '<'
            }
        });
})();