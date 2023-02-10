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
        // other.pos.x = 339;
        // other.pos.y = 194;
        var actualPlayerHealth = ig.game.getEntitiesByType(EntityPlayer)[0];

        ig.game.loadLevel(LevelLevel_3);

        ig.game.player = ig.game.getEntitiesByType(EntityPlayer)[0];
        ig.game.player.health = actualPlayerHealth.health;

        ig.game.healthBar = ig.game.getEntitiesByType(EntityHealthBar)[0];

        //VIDA
        if (ig.game.player.health > 40) {
          // Para que muestre la barra completa si es mayor de 40 de vida
          ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health1;
        } else if (ig.game.player.health > 30 && ig.game.player.health <= 40) {
          // Si es menor de 40 pero mayor de 30 entonces lo pone a 4 vidas
          ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health2;
        } else if (ig.game.player.health > 20 && ig.game.player.health <= 30) {
          ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health3;
        } else if (ig.game.player.health > 10 && ig.game.player.health <= 20) {
          ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health4;
        } else if (ig.game.player.health > 0 && ig.game.player.health <= 10) {
          ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health5;
        }
      },

      update: function () {},
    });
  });
