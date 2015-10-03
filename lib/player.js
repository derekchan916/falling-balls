(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Player = FallingBalls.Player = function (options) {
    options.radius = Player.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();

    FallingBalls.MovingObject.call(this, options)
  };

  Player.RADIUS = 15;

  FallingBalls.Util.inherits(Player, FallingBalls.MovingObject);

  // Player.prototype.fireBullet = function () {
  //   var norm = FallingBalls.Util.norm(this.vel);
  //
  //   if (norm == 0) {
  //     // Can't fire unless moving.
  //     return;
  //   }
  //
  //   var relVel = FallingBalls.Util.scale(
  //     FallingBalls.Util.dir(this.vel),
  //     FallingBalls.Bullet.SPEED
  //   );
  //
  //   var bulletVel = [
  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  //   ];
  //
  //   var bullet = new FallingBalls.Bullet({
  //     pos: this.pos,
  //     vel: bulletVel,
  //     color: this.color,
  //     game: this.game
  //   });
  //
  //   this.game.add(bullet);
  // };

  Player.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Player.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
})();
