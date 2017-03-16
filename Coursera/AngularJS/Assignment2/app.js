/**
 * Created by Soumya on 3/14/2017.
 */

(function () {
    angular.module('ShoppingListCheckOff',[])
        .controller('ToBuyController',ToBuyController)
        .controller('AlreadyBoughtController',AlreadyBoughtController)
        .service('ShoppingListCheckOffService',ShoppingListCheckOffService);
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {

        var check = this;
        check.toBuyItems = ShoppingListCheckOffService.toBuyItems();
        check.boughtItem = function (quantity,name,itemIndex) {
            ShoppingListCheckOffService.boughtItem(quantity,name,itemIndex);
            check.toBuyLength();
        }
        check.everythingBought = "Everything is bought!";
        check.toBuyLength = function () {
            return  check.toBuyItems.length;
        }

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var check = this;

        check.getItems = ShoppingListCheckOffService.getItems();
        check.nothingBought = "Nothing bought yet.";
    }
    function ShoppingListCheckOffService() {
        var service = this;
        var tobuy = [{ name: "cookies", quantity: 10 },
            { name: "chips", quantity: 5 },
            { name: "soft drinks", quantity: 10 },
            { name: "candy", quantity: 20 },
            { name: "bread", quantity: 3 }];

        var bought = [];

        service.addItem = function (quantity,itemName) {

            var item = {
                name: itemName,
                quantity: quantity
            };
            bought.push(item);

        };
        service.boughtItem = function (quantity,name,itemIndex) {
          var item = tobuy.splice(itemIndex,1);
            service.addItem(quantity,name);
        };
        service.toBuyItems = function () {
            return tobuy;
        }
        service.getItems = function () {
            return bought;
        }
    }

})();