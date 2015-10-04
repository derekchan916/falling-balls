(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var Util = FallingBalls.Util = {};

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var randomVec = Util.randomVec = function () {
    return [(Math.random() * ((7/1000) * FallingBalls.Game.DIM_X)) + ((3/1000) * FallingBalls.Game.DIM_X), 0]
  };

  var randomPos = Util.randomPos = function () {
    return [0, (FallingBalls.Game.DIM_Y * Math.random())/3];
  };

  var randomRadius = Util.randomRadius = function() {
    return (Math.random() * 25) + 5;
  }

  var randomColor = Util.randomColor = function() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }
  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
