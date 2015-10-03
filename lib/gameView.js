(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var GameView = FallingBalls.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    this.timerId = null;
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  };

  GameView.prototype.onKeyDown = function(e) {
    var that = this;
    c = e.keyCode;
    switch(c) {
      case 37:
        that.player.left = true;
        break;
      case 39:
        that.player.right = true;
        break;
    };
  };

  GameView.prototype.onKeyUp = function(e) {
    var that = this;
    c = e.keyCode;
    switch(c) {
      case 37:
        that.player.left = false;
        break;
      case 39:
        that.player.right = false;
        break;
    };
  };

  // GameView.MOVES = {
  //   // "w": [ 0, -1],
  //   37: [-5,  0],
  //   // "s": [ 0,  1],
  //   39: [ 5,  0]
  // };
  //
  // GameView.prototype.handleKeyDown = function(e) {
  //   e.preventDefault();
  //
  //   if(GameView.MOVES[e.keyCode]) {
  //     this.player.moveSide(GameView.MOVES[e.keyCode]);
  //   }
  // };
  //
  // GameView.prototype.handleKeyUp = function(e) {
  //   e.preventDefault();
  //
  //   if(GameView.MOVES[e.keyCode]) {
  //     this.player.stopMoving();
  //   }
  // };

  // GameView.prototype.bindKeyHandlers = function () {
  //   var player = this.player;

    // Object.keys(GameView.MOVES).forEach(function (k) {
    //   var move = GameView.MOVES[k];
    //   key(k, function () { player.power(move); });
    // });

    // key("space", function () { player.fireBullet() });
  // };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / FallingBalls.Game.FPS
    );

    // this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
