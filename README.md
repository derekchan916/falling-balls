# Falling Balls

## Summary
This is a single player game. The goal is to dodge as many balls as possible.

## How to play
Follow the link [here](www.derekwychan.com/falling-balls)
Press enter to start the game, left and right arrow keys to run right and left.
Hold spacebar to sprint.

## Smooth gameplay
In order to read multiple keydowns utilizing eventListeners at once for smooth gameplay, each keydown changes a boolean value.

```javascript
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
```
There is also a onKeyUp function. See [Game View](https://github.com/derekchan916/falling-balls/blob/master/lib/gameView.js) for more details.

## Leaderboard
Uses custom AJAX requests to collect the leaderboard scores through a separate rails app.
```javascript
  $.ajax({
   type: "POST",
   data: data,
   url:"https://fallingballsleaderboard.herokuapp.com/leaders",
   dataType: 'json',
   success: function(leaders){
     this.renderLeaderboard(leaders);
   }.bind(this)
```
See [Game View](https://github.com/derekchan916/falling-balls/blob/master/lib/gameView.js) for more details.

The scores are automatically updated and only updated when the user beats their own score.
See [Leaderboard Controller](https://github.com/derekchan916/falling-balls-leaderboard/blob/master/app/controllers/leaders_controller.rb) for more details.

## Utility Filter
This handles the physics for gravity and vectors in order to emulate real physics.
See [Utils](https://github.com/derekchan916/falling-balls/blob/master/lib/util.js) for more details.

## Other Technical Features
- Object orientated programming
- Scaleable for more players to be added at once
- Uses physics for gravity and vectors
- Uses Canvas to create render everything
- Filter's malicious user names

##Future goals
- Use Node.js to add more players and a chatroom
