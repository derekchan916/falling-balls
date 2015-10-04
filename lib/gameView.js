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
      case 32:
        that.player.spacebar = true;
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
      case 32:
        that.player.spacebar = false;
        break;
    };
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        gameView.updateScore();
      }, 1000 / FallingBalls.Game.FPS
    );
  };

  GameView.prototype.updateScore = function() {
    // var ctx = document.getElementById('canvas').getContext('2d');
    this.ctx.font = "35px Indie Flower";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: " + FallingBalls.Game.Score, 820, 40);
  }

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
