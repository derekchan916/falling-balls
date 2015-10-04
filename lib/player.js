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

    this.image = Player.STANDLEFT;
    this.tickCount = 0;
    this.frameIndex = 0;
    this.ticksPerFrame = 10;

    FallingBalls.MovingObject.call(this, options);
  };

  Player.RADIUS = 10;
  Player.WIDTH = 25;
  Player.HEIGHT = 32;

  Player.STANDLEFT = new Image();
  Player.STANDLEFT.src = 'images/standleft_00.png';

  Player.STANDRIGHT = new Image();
  Player.STANDRIGHT.src = 'images/standright_00.png';

  FallingBalls.Util.inherits(Player, FallingBalls.MovingObject);

  Player.prototype.draw = function (ctx) {
    this.image = this.frameIndex % 2 === 0 ? Player.STANDRIGHT : Player.STANDLEFT;

    ctx.drawImage(this.image, 1, 1, 25, 32, this.pos[0], this.pos[1], 25, 32);
    this.update();
  };

  Player.prototype.update = function () {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }
  };
})();
