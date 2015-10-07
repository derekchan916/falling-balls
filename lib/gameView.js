(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var GameView = FallingBalls.GameView = function (ctx) {
    this.ctx = ctx;
    // this.game = game;
    // this.player = this.game.addPlayer();
    this.timerId = null;
    $('#name-form').submit(this.nameSubmit.bind(this))
    // $(window).on("keydown", this.handleKeys.bind(this));
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

  GameView.prototype.nameSubmit = function(e) {
    e.preventDefault();
    this.username = $('#username').val();
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("keydown", this.onMenuKey.bind(this));
    $('.welcome-message').toggleClass('show');
    $('.play-game').toggleClass('show');
    this.showMenu = true;
  }

  GameView.prototype.onMenuKey = function(e) {
    c = e.keyCode;
    if (e.keyCode === 13 && this.showMenu) {
      this.gameStart();
    }
  };

  GameView.prototype.gameStart = function() {
    this.game = new FallingBalls.Game(this);
    this.player = this.game.addPlayer();
    $('.play-game').toggleClass('show');
    this.showMenu = false;
    this.start();
  }

  GameView.prototype.start = function () {
    var gameView = this;

    clearInterval(this.timerId);
    FallingBalls.Game.Score = 0;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        gameView.updateScore();

        if (gameView.game.balls.length === 0) {
          gameView.stop();
        }
      }, 1000 / FallingBalls.Game.FPS
    );
  };

  GameView.prototype.submitScore = function () {
    var data = {}
    data["name"] = this.username
    data["score"] = FallingBalls.Game.Score;
    debugger
    $.ajax({
     type: "POST",
     data: data,
     url:"https://fallingballsleaderboard.herokuapp.com/leaders",
     dataType: 'json',
     success:function(leaders){
      //  console.log(leaders)
        //  this.renderLeaderboard(leaders);
     }.bind(this),
    //  error:function(model, response){
    //  }
   });
  };

  GameView.prototype.updateScore = function() {
    // var ctx = document.getElementById('canvas').getContext('2d');
    this.ctx.font = "35px Indie Flower";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: " + FallingBalls.Game.Score, 820, 40);
  }

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
