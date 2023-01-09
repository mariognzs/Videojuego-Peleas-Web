ig.module("game.main")
  .requires(
    "impact.game",
    "impact.font",
    "impact.debug.debug",
    "game.entities.player",
    "game.entities.playerAttack",

    "game.levels.level_1",
    "game.levels.level_2"
  )
  .defines(function () {
    MyGame = ig.Game.extend({
      // Load a font
      font: new ig.Font("media/04b03.font.png"),
      gravity: 180,
      player: null,
      enemy: null,

      init: function () {
        // Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.A, "left");
        ig.input.bind(ig.KEY.D, "right");
        ig.input.bind(ig.KEY.W, "jump");
        ig.input.bind(ig.KEY.J, "attack");
        ig.input.bind(ig.KEY.L, "damaged");
        ig.input.bind(ig.KEY.K, "dead");

        // Carga el nivel
        this.loadLevel(LevelLevel_2);

        // Carga el jugador
        this.player = this.getEntitiesByType(EntityPlayer)[0];

        // Carga enemigo
        //this.barrerKnigth = this.getEntitiesByType(EntityEnemy)[0];
      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();

        // Add your own, additional update code here
        if (this.player) {
          this.screen.x = this.player.pos.x - ig.system.width / 2;
          this.screen.y = this.player.pos.y - ig.system.height / 2;
        }
      },
      
      draw: function () {
        this.parent();
        if (this.font) {
          var player = ig.game.getEntitiesByType("EntityPlayer")[0];
          // Use our font to print: Health: player.health, X, Y, center_text
          this.font.draw(
            "Health: " + player.health,
            50,
            10,
            ig.Font.ALIGN.CENTER
          );
        }
      },
    });

    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    ig.main("#canvas", MyGame, 60, 320, 240, 2);
  });
