//http://wtfjs.com/
//http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation/#prototype
//http://blogger.ziesemer.com/2007/10/respecting-javascript-global-namespace.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
var game = Packages.Game;

var gameConfig = new function() {
  this.setup = function() {
  }
  
  this.start = function() {
  }
  
  this.pause = function() {
  }
  
}();


var inventory = new function() {
  
  this.use = function(item) {
      inventoryItemManager.getUseFunction(item)();
  }
  
  this.addItem = function(item, useFunction) {
      game.addInventoryItem(item);
      inventoryItemManager.addUseFunction(item, useFunction);
  }
  
}();


//do not chance this functions
var choiceEvaluator = new function() {
    this.evaluate = function(choice) {
	choiceManager.getChoseFunction(choice)();
    }
}();

var choiceManager = new function() {
    var map = {};
    this.getChoseFunction = function(choice) {
      return map[String(choice.getDialogue().getId())][choice.getId()];
    }
    this.addChoseFunction = function(choice, choseFunction) {
      var choices;
      var dialogue = String(choice.getDialogue().getId());
      if(map[dialogue] == undefined) {
	choices = new Array();
	map[dialogue] = choices;
      }
      else {
	choices = map[dialogue];
      }
      choices[choice.getId()] = choseFunction;
    }
}();

var inventoryItemManager = new function() {
    var map = {};
    this.getUseFunction = function(item) {
      return map[String(item.getName())];
    }
    this.addUseFunction = function(item, useFunction) {
      map[item.getName()] = useFunction;
    }
}();
