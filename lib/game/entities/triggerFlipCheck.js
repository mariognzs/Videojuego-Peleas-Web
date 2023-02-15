ig.module("game.entities.triggerFlipCheck")
  .requires("impact.entity")
  .defines(function () {
    EntityTriggerFlipCheck = ig.Entity.extend({
      size: { x: 32, y: 8 },

      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: "rgba(196, 255, 0, 0.7)",

      target: null,
      wait: -1,
      waitTimer: null,
      canFire: true,

      //type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.B,
      collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        this.parent(x, y, settings);
        //this.waitTimer = new ig.Timer();
      },

      check: function (other) {
        if (ig.Timer.timeScale == 1) {
          other.checkedFlip = true;
          other.flip = !other.flip;
          other.vel.x = 0;
          other.checkedFlipCount = 120;
        }
        if (other.checkedFlip == false && other.atkAnim == false) {
          // Si dist es positivo, entonces está en la izquierda. Si flip es true,
          // entonces va a la derecha
          if (other.flip && this.distX(ig.game.player)) {
          } else if (!other.flip && this.distX(ig.game.player)) {
          }
        }
      },

      // Mira distancia del eje X
      distX: function (other) {
        var xd =
          this.pos.x + this.size.x / 2 - (other.pos.x + other.size.x / 2);
        return xd;
      },

      // Mira distancia del eje Y
      distY: function (other) {
        var yd =
          this.pos.y + this.size.y / 2 - (other.pos.y + other.size.y / 2);
        return yd;
      },
    });
  });
