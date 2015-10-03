(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var Ball = FallingBalls.Ball = function (options) {
    options.color = FallingBalls.Util.randomColor();
    options.pos = FallingBalls.Util.randomPos();
    // options.pos = [0, 100]
    // options.radius = Ball.RADIUS;
    options.radius = FallingBalls.Util.randomRadius();
    options.vel = FallingBalls.Util.randomVec();
    // options.vel = [10, 0]

    FallingBalls.MovingObject.call(this, options);
  };

  Ball.COLOR = "#505050";
  // Ball.RADIUS = 25;
  // Ball.SPEED = 4;

  FallingBalls.Util.inherits(Ball, FallingBalls.MovingObject);

  Ball.prototype.gravitate = function() {
    this.vel = [this.vel[0], this.vel[1] + FallingBalls.Game.Gravity]
  }

  Ball.prototype.hitFloor = function() {
    if ((this.pos[1] + this.radius) > FallingBalls.Game.DIM_Y && this.vel[1] >= 0) {
      return true;
    }
    return false;
  }

  // Ball.prototype.collideWith = function (otherObject) {
  //   if (otherObject instanceof FallingBalls.Player) {
  //     debugger
  //     FallingBalls.Game.GameOver();
  //   }
  // };
})();
