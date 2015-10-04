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
  Player.HEIGHT = 38.4;

  Player.STANDLEFT = new Image();
  Player.STANDLEFT.src = 'images/standleft_00.png';

  Player.STANDRIGHT = new Image();
  Player.STANDRIGHT.src = 'images/standright_00.png';

  Player.WALK = new Image();
  Player.WALK.src = 'images/walk.png';

  FallingBalls.Util.inherits(Player, FallingBalls.MovingObject);

  Player.prototype.draw = function (ctx) {
    var drawOptions = [Player.WALK];
    if (this.left) {
      drawOptions = drawOptions.concat(this.renderLeft());
    } else if (this.right) {
      drawOptions = drawOptions.concat(this.renderRight());
    } else {
      this.image = this.frameIndex % 2 === 0 ? Player.STANDRIGHT : Player.STANDLEFT;
      drawOptions = [this.image, 1, 1, 25, 32];
    }

    ctx.drawImage(
      drawOptions[0],
      drawOptions[1],
      drawOptions[2],
      drawOptions[3],
      drawOptions[4],
      this.pos[0],
      this.pos[1],
      Player.WIDTH,
      Player.HEIGHT
    );
    this.update();
  };

  Player.prototype.update = function () {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex += 1;
    }
  };

  Player.prototype.renderLeft = function() {
    switch(this.frameIndex % 5) {
      case 0:
        return [5, 0, 25, 30];
      case 1:
        return [35, 0, 25, 30];
      case 2:
        return [60, 0, 25, 30];
      case 3:
        return [90, 0, 25, 30];
      case 4:
        return [115, 0, 25, 30];
    };
  };

  Player.prototype.renderRight = function() {
    switch(this.frameIndex % 5) {
      case 0:
        return [5, 40, 25, 30];
      case 1:
        return [35, 40, 25, 30];
      case 2:
        return [60, 40, 25, 30];
      case 3:
        return [90, 40, 25, 30];
      case 4:
        return [115, 40, 25, 30];
    };
  };
})();
