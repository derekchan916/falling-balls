(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var Game = FallingBalls.Game = function () {
    this.balls = [];
    // this.bullets = [];
    // this.ships = [];
    this.players = [];

    this.addFallingBalls();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 60;
  Game.Gravity = 0.5;
  Game.NUM_FallingBalls = 10;
  Game.BounceFriction = 1.1;

  Game.prototype.add = function (object) {
    if (object instanceof FallingBalls.Ball) {
      this.balls.push(object);
    } else if (object instanceof FallingBalls.Player) {
      this.players.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addFallingBalls = function () {
    for (var i = 0; i < Game.NUM_FallingBalls; i++) {
      this.add(new FallingBalls.Ball({ game: this }));
    }
  };

  Game.prototype.addPlayer = function () {
    var player = new FallingBalls.Player({
      pos: [500, 580],
      game: this
    });

    this.add(player);

    return player;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.players, this.balls);
  };

  // Game.prototype.checkCollisions = function () {
  //   var game = this;
  //
  //   this.allObjects().forEach(function (obj1) {
  //     game.allObjects().forEach(function (obj2) {
  //       if (obj1 == obj2) {
  //         // don't allow self-collision
  //         return;
  //       }
  //
  //       if (obj1.isCollidedWith(obj2)) {
  //         obj1.collideWith(obj2);
  //       }
  //     });
  //   });
  // };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] > Game.DIM_X;
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof FallingBalls.Ball) {
      var idx = this.balls.indexOf(object);
      this.balls[idx] = new FallingBalls.Ball({ game: this });
    } else if (object instanceof FallingBalls.Player) {
      this.players.splice(this.players.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    // this.checkCollisions();
  };

  // Game.prototype.wrap = function (pos) {
  //   return [
  //     wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
  //   ];
  //
  //   function wrap(coord, max) {
  //     if (coord < 0) {
  //       return max - (coord % max);
  //     } else if (coord > max) {
  //       return coord % max;
  //     } else {
  //       return coord;
  //     }
  //   }
  // };
})();
