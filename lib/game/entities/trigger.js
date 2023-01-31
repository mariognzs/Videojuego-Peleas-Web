ig.module("game.entities.trigger")
  .requires("impact.entity")
  .defines(function () {
    EntityTrigger = ig.Entity.extend({
      size: { x: 32, y: 8 },

      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: "rgba(196, 255, 0, 0.7)",

      target: null,
      wait: -1,
      waitTimer: null,
      canFire: true,

      //type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      init: function (x, y, settings) {
        this.parent(x, y, settings);
        //this.waitTimer = new ig.Timer();
      },

      check: function (other) {
        if (other instanceof EntityPlayer) {
          if (other.invincible == false) {
            other.receiveDamage(5, this);
            other.damaged = true;
          }
        }
      },

      update: function () {},
    });
  });
