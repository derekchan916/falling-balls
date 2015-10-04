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

  Player.GOLEFT1 = new Image();
  Player.GOLEFT1.src = 'images/walkleft_01.png';

  Player.GOLEFT2 = new Image();
  Player.GOLEFT2.src = 'images/walkleft_02.png';

  Player.GOLEFT3 = new Image();
  Player.GOLEFT3.src = 'images/walkleft_03.png';

  Player.GOLEFT4 = new Image();
  Player.GOLEFT4.src = 'images/walkleft_04.png';

  Player.GOLEFT5 = new Image();
  Player.GOLEFT5.src = 'images/walkleft_05.png';

  FallingBalls.Util.inherits(Player, FallingBalls.MovingObject);

  Player.prototype.draw = function (ctx) {
    if (this.left) {
      this.renderLeft();
    } else if (this.right) {
      this.renderRight();
    } else {
      this.image = this.frameIndex % 2 === 0 ? Player.STANDRIGHT : Player.STANDLEFT;
    }

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

  Player.prototype.renderLeft = function() {
    switch(this.frameIndex % 5) {
      case 0:
        this.image = Player.GOLEFT1;
        break;
      case 1:
        this.image = Player.GOLEFT2;
        break;
      case 2:
        this.image = Player.GOLEFT3;
        break;
      case 3:
        this.image = Player.GOLEFT4;
        break;
      case 4:
        this.image = Player.GOLEFT5;
        break;
    };
  };
})();
