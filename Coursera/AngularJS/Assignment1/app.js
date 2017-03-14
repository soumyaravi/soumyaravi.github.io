/**
 * Created by Soumya on 3/13/2017.
 */
(function () {
    angular.module('LunchCheck',[])
        .controller('LunchCheckController',checkLunch);

    checkLunch.$inject = ['$scope'];

    function checkLunch($scope) {
        $scope.dish = '';
        $scope.count =  0;
        $scope.msg = '';
        $scope.color ={};
        $scope.box = {};
        $scope.getValue = function(){
            $scope.count = getCount($scope.dish);
            if($scope.count == 0) {
                $scope.msg = "Please enter data first";
                $scope.color = {'color':'red'};
                $scope.box = {'border':'2px solid red'};
            }
            else if($scope.count>3) {
                $scope.msg = "Too much!"
                $scope.color = {'color': 'green'};
                $scope.box = {'border':'2px solid green'};
            }
            else {
                $scope.msg = "Enjoy!"
                $scope.color = {'color': 'green'};
                $scope.box = {'border':'2px solid green'};
            }

        }

        function getCount(dishes) {
            if(dishes.length!=0)
                return dishes.split(',').length;
            return 0;
        }
    }


})();