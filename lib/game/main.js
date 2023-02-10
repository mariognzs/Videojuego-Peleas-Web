ig.module("game.main")
  .requires(
    "impact.game",
    "impact.font",

    "plugins.impact-splash-loader",

    "impact.debug.debug",
    "game.entities.player",
    "game.entities.playerAttack",
    "game.entities.healthBar",
    "game.entities.triggerl3",

    "game.levels.title",
    "game.levels.level_1",
    "game.levels.level_2",
    "game.levels.level_3"
  )
  .defines(function () {
    MyGame = ig.Game.extend({
      // Load a font
      font: new ig.Font("media/04b03.font.png"),
      gravity: 180,
      player: null,
      healthBar: null,
      enemy: null,

      title: new ig.Image("media/died.png"),

      init: function () {
        // Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.A, "left");
        ig.input.bind(ig.KEY.D, "right");
        ig.input.bind(ig.KEY.W, "jump");
        ig.input.bind(ig.KEY.J, "attack");
        ig.input.bind(ig.KEY.X, "restart");

        // Carga el nivel
        // this.loadLevel(LevelMenu);
        this.loadLevel(LevelLevel_2);

        // Carga el jugador
        this.player = this.getEntitiesByType(EntityPlayer)[0];

        //Carga barra de vida
        this.healthBar = this.getEntitiesByType(EntityHealthBar)[0];
        // this.healthBar.currentAnim = this.healthBar.anims.health1;

        // Carga enemigo
        //this.barrerKnigth = this.getEntitiesByType(EntityEnemy)[0];
      },

      loadLevel: function (data) {
        // Remember the currently loaded level, so we can reload when
        // the player dies.
        this.currentLevel = data;

        // Call the parent implemenation; this creates the background
        // maps and entities.
        this.parent(data);
      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();

        if (ig.input.pressed("restart") && this.player.health < 1) {
          ig.system.setGame(MyTitle);
          return;
        }

        //CAMARA
        // Add your own, additional update code here
        if (this.player) {
          this.screen.x = this.player.pos.x - ig.system.width / 2;
          this.screen.y = this.player.pos.y - ig.system.height / 2;
        }
        if (this.healthBar) {
          this.healthBar.pos.x = this.player.pos.x - ig.system.width / 2;
          this.healthBar.pos.y = this.player.pos.y - ig.system.height / 2;
        }

        //VIDA
        if (this.player.health > 40) {
          // Para que muestre la barra completa si es mayor de 40 de vida
          this.healthBar.currentAnim = this.healthBar.anims.health1;
        } else if (this.player.health > 30) {
          // Si es menor de 40 pero mayor de 30 entonces muestra la animación y lo pone a 4 vidas
          if (
            this.player.health <= 40 &&
            this.healthBar.currentAnim == this.healthBar.anims.health1
          ) {
            this.healthBar.currentAnim = this.healthBar.anims.life1.rewind();

            // Muestra la animación de la barra de vida reduciendose
          } else if (this.healthBar.currentAnim == this.healthBar.anims.life1) {
            this.healthBar.currentAnim = this.healthBar.anims.life1;

            // Si se completa, entonces muestra la barra menos la vida quitada
            if (this.healthBar.currentAnim.loopCount) {
              this.healthBar.currentAnim = this.healthBar.anims.health2;
            }
          }
        } else if (this.player.health > 20) {
          // Muestra la animación y lo pone a 3 vidas
          if (
            this.player.health <= 30 &&
            this.healthBar.currentAnim == this.healthBar.anims.health2
          ) {
            this.healthBar.currentAnim = this.healthBar.anims.life2.rewind();

            // Muestra la animación de la barra de vida reduciendose
          } else if (this.healthBar.currentAnim == this.healthBar.anims.life2) {
            this.healthBar.currentAnim = this.healthBar.anims.life2;

            // Si se completa, entonces muestra la barra menos la vida quitada
            if (this.healthBar.currentAnim.loopCount) {
              this.healthBar.currentAnim = this.healthBar.anims.health3;
            }
          }
        } else if (this.player.health > 10) {
          // Muestra la animación y lo pone a 2 vidas
          if (
            this.player.health <= 20 &&
            this.healthBar.currentAnim == this.healthBar.anims.health3
          ) {
            this.healthBar.currentAnim = this.healthBar.anims.life3.rewind();

            // Muestra la animación de la barra de vida reduciendose
          } else if (this.healthBar.currentAnim == this.healthBar.anims.life3) {
            this.healthBar.currentAnim = this.healthBar.anims.life3;

            // Si se completa, entonces muestra la barra menos la vida quitada
            if (this.healthBar.currentAnim.loopCount) {
              this.healthBar.currentAnim = this.healthBar.anims.health4;
            }
          }
        } else if (this.player.health > 0) {
          // Muestra la animación y lo pone a 1 vidas
          if (
            this.player.health <= 10 &&
            this.healthBar.currentAnim == this.healthBar.anims.health4
          ) {
            this.healthBar.currentAnim = this.healthBar.anims.life4.rewind();

            // Muestra la animación de la barra de vida reduciendose
          } else if (this.healthBar.currentAnim == this.healthBar.anims.life4) {
            this.healthBar.currentAnim = this.healthBar.anims.life4;

            // Si se completa, entonces muestra la barra menos la vida quitada
            if (this.healthBar.currentAnim.loopCount) {
              this.healthBar.currentAnim = this.healthBar.anims.health5;
            }
          }
        } else {
          // Muestra la animación y lo pone a 0 vidas
          if (this.healthBar.currentAnim == this.healthBar.anims.health5) {
            this.healthBar.currentAnim = this.healthBar.anims.life5.rewind();

            // Muestra la animación de la barra de vida reduciendose
          } else if (this.healthBar.currentAnim == this.healthBar.anims.life5) {
            this.healthBar.currentAnim = this.healthBar.anims.life5;

            // Si se completa, entonces muestra la barra menos la vida quitada
            if (this.healthBar.currentAnim.loopCount) {
              this.healthBar.currentAnim = this.healthBar.anims.health6;
            }
          }
        }
      },

      draw: function () {
        this.parent();
        if (this.font) {
          var player = ig.game.getEntitiesByType("EntityPlayer")[0];
          // Use our font to print: Health: player.health, X, Y, center_text

          if (this.player.health > 0) {
            // ESCRIBE LA VIDA
            this.font.draw(
              "Health: " + player.health,
              50,
              10,
              ig.Font.ALIGN.CENTER
            );
          } else {
            if (this.healthBar.currentAnim == this.healthBar.anims.health6) {
              var cx = ig.system.width / 2;
              this.title.draw(cx - this.title.width / 2, 0);

              // var startText = ig.ua.mobile
              //   ? 'Press Button to Play!'
              //   : 'Press X or C to Play!';

              var startText = "Press X to restart";

              this.font.draw(startText, cx, 175, ig.Font.ALIGN.CENTER);
            }
          }
        }
      },

      l3: function () {
        // Initialize your game here; bind keys etc.

        this.loadLevel(LevelLevel_3);

        this.player = this.getEntitiesByType(EntityPlayer)[0];

        //CAMARA
        // Add your own, additional update code here
        if (this.player) {
          this.screen.x = this.player.pos.x - ig.system.width / 2;
          this.screen.y = this.player.pos.y - ig.system.height / 2;
        }
        if (this.healthBar) {
          this.healthBar.pos.x = this.player.pos.x - ig.system.width / 2;
          this.healthBar.pos.y = this.player.pos.y - ig.system.height / 2;
        }
      },
    });

    MyTitle = ig.Game.extend({
      font: new ig.Font("media/04b03.font.png"),
      gravity: 180,
      player: null,
      healthBar: null,
      enemy: null,

      // The title image
      title: new ig.Image("media/menu.png"),

      init: function () {
        // Bind keys
        ig.input.bind(ig.KEY.A, "left");
        ig.input.bind(ig.KEY.D, "right");
        ig.input.bind(ig.KEY.W, "jump");
        ig.input.bind(ig.KEY.J, "attack");
        ig.input.bind(ig.KEY.L, "damaged");
        ig.input.bind(ig.KEY.K, "dead");
        ig.input.bind(ig.KEY.C, "continue");

        // Carga el nivel
        // this.loadLevel(LevelMenu);
        this.loadLevel(LevelTitle);

        // Carga el jugador
        this.player = this.getEntitiesByType(EntityPlayer)[0];

        //Carga barra de vida
        this.healthBar = this.getEntitiesByType(EntityHealthBar)[0];
        // this.healthBar.currentAnim = this.healthBar.anims.health1;

        // Carga enemigo
        //this.barrerKnigth = this.getEntitiesByType(EntityEnemy)[0];
      },

      update: function () {
        // Update all entities and backgroundMaps
        this.parent();

        //CAMARA
        // Add your own, additional update code here
        if (this.player) {
          this.screen.x = this.player.pos.x - ig.system.width / 2;
          this.screen.y = this.player.pos.y - ig.system.height / 2;
        }
        if (this.healthBar) {
          this.healthBar.pos.x = this.player.pos.x - ig.system.width / 2;
          this.healthBar.pos.y = this.player.pos.y - ig.system.height / 2;
        }

        if (ig.input.pressed("continue")) {
          ig.system.setGame(MyGame);
          return;
        }
      },

      draw: function () {
        this.parent();

        var cx = ig.system.width / 2;
        this.title.draw(cx - this.title.width / 2, 0);

        // var startText = ig.ua.mobile
        //   ? 'Press Button to Play!'
        //   : 'Press X or C to Play!';

        var startText = "Press C to Play!";

        this.font.draw(startText, cx, 160, ig.Font.ALIGN.CENTER);

        // if (this.font) {
        //   var player = ig.game.getEntitiesByType("EntityPlayer")[0];
        //   // Use our font to print: Health: player.health, X, Y, center_text

        //   // ESCRIBE LA VIDA
        //   this.x.draw(
        //     startText,
        //     50,
        //     10,
        //     ig.Font.ALIGN.CENTER
        //   );
        //}
      },

      l3: function () {
        // Initialize your game here; bind keys etc.

        this.loadLevel(LevelLevel_3);

        this.player = this.getEntitiesByType(EntityPlayer)[0];
      },
    });

    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    //ig.main("#canvas", MyGame, 60, 320, 240, 2);
    // Finally, start the game into MyTitle and use the ImpactSplashLoader plugin
    // as our loading screen

    ig.main("#canvas", MyTitle, 60, 320, 240, 2, ig.ImpactSplashLoader);
  });
