(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var Player = FallingBalls.Player = function (options) {
    options.radius = Player.RADIUS;
    options.vel = [0, 0];
    options.color = FallingBalls.Util.randomColor();
    this.left = this.left || false;
    this.right = this.right || false;

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

  // Player.prototype.moveSide = function(key) {
  //   this.vel = [key[0], 0];
  // }
  //
  // Player.prototype.stopMoving = function() {
  //   this.vel = [0, 0];
  // }

  // Player.prototype.power = function (impulse) {
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];
  // };

  // Player.prototype.relocate = function () {
  //   this.pos = this.game.randomPosition();
  //   this.vel = [0, 0];
  // };
})();
