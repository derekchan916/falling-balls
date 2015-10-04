(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var Player = FallingBalls.Player = function (options) {
    options.radius = Player.RADIUS;
    this.width = Player.WIDTH;
    this.height = Player.HEIGHT;
    options.vel = [0, 0];
    options.color = FallingBalls.Util.randomColor();
    this.left = this.left || false;
    this.right = this.right || false;
    this.spacebar = this.spacebar || false;

    FallingBalls.MovingObject.call(this, options)
  };

  Player.RADIUS = 10;
  Player.WIDTH = 25;
  Player.HEIGHT = 50;

  FallingBalls.Util.inherits(Player, FallingBalls.MovingObject);

  Player.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  };
})();
