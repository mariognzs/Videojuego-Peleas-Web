<<<<<<< HEAD
ig.module(
        'game.entities.trigger'
    )
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityTrigger = ig.Entity.extend({
            size: { x: 32, y: 8 },

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

            target: null,
            wait: -1,
            waitTimer: null,
            canFire: true,

            //type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            //collides: ig.Entity.COLLIDES.NEVER,


            init: function(x, y, settings) {
                /* if (settings.checks) {
=======
ig.module("game.entities.trigger")
  .requires("impact.entity")
  .defines(function () {
    EntityTrigger = ig.Entity.extend({
      size: { x: 16, y: 8 },

      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: "rgba(196, 255, 0, 0.7)",

      target: null,
      wait: -1,
      waitTimer: null,
      canFire: true,

      //type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      //collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        /* if (settings.checks) {
>>>>>>> 828680d57304ead9f0480d3daae969281cdde272
                     this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                     delete settings.check;
                 }*/

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
