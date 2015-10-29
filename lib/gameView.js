(function () {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var GameView = FallingBalls.GameView = function (ctx) {
    this.ctx = ctx;
    this.timerId = null;
    $('#name-form').submit(this.nameSubmit.bind(this));
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
    if (this.isValidName(this.username)) {
      window.addEventListener("keydown", this.onKeyDown.bind(this));
      window.addEventListener("keyup", this.onKeyUp.bind(this));
      window.addEventListener("keydown", this.onMenuKey.bind(this));
      $('.welcome-message').toggleClass('show');
      $('.play-game').toggleClass('show');
      $('.scoreboard').toggleClass('show');
      this.showMenu = true;
      this.getLeaders();
    } else {
      $('.warning-sign').text("Hey, hey, don't use bad words!")
    }
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
    $('.scoreboard').toggleClass('show');
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
    $.ajax({
     type: "POST",
     data: data,
     url:"https://fallingballsleaderboard.herokuapp.com/leaders",
     dataType: 'json',
     success: function(leaders){
       this.renderLeaderboard(leaders);
     }.bind(this)
   });
  };

  GameView.prototype.getLeaders = function () {
    $.ajax({
     type: "GET",
     url:"https://fallingballsleaderboard.herokuapp.com/leaders",
     dataType: 'json',
     success:function(leaders){
         this.renderLeaderboard(leaders);
     }.bind(this)
   });
  };

  GameView.prototype.updateScore = function() {
    this.ctx.font = "35px Indie Flower";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: " + FallingBalls.Game.Score, 820, 40);
  }

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };

  GameView.prototype.renderLeaderboard = function(leaders) {
    $('.scoreboard').empty();
    var $nameCol = $("<ul>").addClass("left")
    var $scoreCol = $("<ul>").addClass("right")
    leaders.forEach(function(leader) {
      $nameCol.append("<li>" + leader["name"] + "</li>");
      $scoreCol.append("<li>" + leader["score"] + "</li>");
    })
    $('.scoreboard').append("<h2>Leaderboard</h2>").append($nameCol).append($scoreCol);
  };

  GameView.prototype.isValidName = function(name) {
    var regex = /shit|fuck|dick|cock|penis|bitch/ig;

    return !regex.test(name);
  };
})();
