(function() {
  if (typeof FallingBalls === "undefined") {
    window.FallingBalls = {};
  }

  var Splatter = FallingBalls.Splatter = function(pos) {
    this.pos = pos;
  }

  Splatter.image = new Image();
  Splatter.image.src = 'images/blood-splatter.png';

  Splatter.prototype.draw = function(ctx) {
    ctx.drawImage(
      Splatter.image,
      0,
      0,
      600,
      400,
      this.pos[0],
      this.pos[1],
      80,
      40
    );
  }
})();
