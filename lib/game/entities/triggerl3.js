ig.module("game.entities.triggerl3")
  .requires("impact.entity")
  .defines(function () {
    EntityTriggerl3 = ig.Entity.extend({
      size: { x: 16, y: 16 },

      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: "rgba(255, 0, 0, 0.7)",

      target: null,
      wait: -1,
      waitTimer: null,
      canFire: true,
      
      //type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      //collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        this.parent(x, y, settings);
      },

      check: function (other) {
        other.pos.x = 339;
        other.pos.y = 194;

        ig.game.loadLevel(LevelLevel_3);

        ig.game.player = ig.game.getEntitiesByType(EntityPlayer)[0];
        ig.game.healtBar = ig.game.getEntitiesByType(EntityHealthBar)[0];
      },

      update: function () {},
    });
  });
