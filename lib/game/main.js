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
    "game.levels.level_2",
    "game.levels.level_3",
    "game.levels.level_boss"
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
      title2: new ig.Image("media/pause.png"),
      playerDeath: false,

      paused: false,
      controls: false,
      title3: new ig.Image("media/controls.png"),

      init: function () {
        // Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.A, "left");
        ig.input.bind(ig.KEY.D, "right");
        ig.input.bind(ig.KEY.W, "jump");
        ig.input.bind(ig.KEY.J, "attack");
        ig.input.bind(ig.KEY.X, "restart");
        ig.input.bind(ig.KEY.ESC, "pause");
        ig.input.bind(ig.KEY.Z, "controls");

        (ig.music.loop = true),
          ig.music.add(
            "media/SoundEffects/Pixabay/BgMusic/bgMedieval.ogg",
            "stage1"
          );

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
        ig.music.volume = 0.42;
        if (this.playerDeath != true) {
          if (this.healthBar.currentAnim != this.healthBar.anims.life5) {
            ig.music.play(["stage1"]);
          } else {
            ig.music.stop();
          }
        } else {
          ig.music.stop();
        }
        // Update all entities and backgroundMaps
        this.parent();

        if (ig.input.pressed("pause") && this.paused == false) {
          console.log("Pausado: " + this.paused);
          this.paused = true;
          ig.Timer.timeScale = 0;
        } else if (ig.input.pressed("pause") && this.paused == true) {
          console.log("Play: " + this.paused);
          this.paused = false;
          ig.Timer.timeScale = 1;
        }

        if (ig.input.pressed("controls") && this.controls == false) {
          console.log("controls: " + this.controls);
          this.controls = true;
          ig.Timer.timeScale = 0;
        } else if (ig.input.pressed("controls") && this.controls == true) {
          console.log("controls: " + this.controls);
          this.controls = false;
          ig.Timer.timeScale = 1;
        }

        if (ig.input.pressed("restart") && this.player.health < 1) {
          ig.system.setGame(MyTitle);
          ig.Timer.timeScale = 1;
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
        var soundEffect;

        if (this.paused == true) {
          var cx = ig.system.width / 2;
          this.title2.draw(cx - this.title.width / 2, 0);
          this.font.draw(
            " - Press ESC to continue - ",
            ig.system.width / 2,
            175,
            ig.Font.ALIGN.CENTER
          );
          // Return to stop anything else drawing
          return;
        }

        if (this.controls == true) {
          var cx = ig.system.width / 2;
          this.title3.draw(cx - this.title.width / 2, 0);
          // Return to stop anything else drawing
          return;
        }

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

              if (this.playerDeath == false) {
                soundEffect = new ig.Sound(
                  "./media/SoundEffects/Pixabay/gameOver.ogg",
                  false
                );
                soundEffect.play();
                this.playerDeath = true;

                ig.Timer.timeScale = 0;
              }
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
      controls: false,
      title2: new ig.Image("media/pause.png"),
      paused: false,
      title3: new ig.Image("media/controls.png"),

      // The title image
      title: new ig.Image("media/menu.png"),

      init: function () {
        // Bind keys
        ig.input.bind(ig.KEY.A, "left");
        ig.input.bind(ig.KEY.D, "right");
        ig.input.bind(ig.KEY.W, "jump");
        ig.input.bind(ig.KEY.J, "attack");
        ig.input.bind(ig.KEY.C, "continue");
        ig.input.bind(ig.KEY.Z, "controls");
        ig.input.bind(ig.KEY.ESC, "pause");

        ig.music.add("media/SoundEffects/Pixabay/BgMusic/bgIntro.ogg", "intro");

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
        ig.music.volume = 1;
        ig.music.play(["intro"]);

        if (ig.input.pressed("pause") && this.paused == false) {
          console.log("Pausado: " + this.paused);
          this.paused = true;
          ig.Timer.timeScale = 0;
        } else if (ig.input.pressed("pause") && this.paused == true) {
          console.log("Play: " + this.paused);
          this.paused = false;
          ig.Timer.timeScale = 1;
        }

        if (ig.input.pressed("controls") && this.controls == false) {
          console.log("controls: " + this.controls);
          this.controls = true;
          ig.Timer.timeScale = 0;
        } else if (ig.input.pressed("controls") && this.controls == true) {
          console.log("controls: " + this.controls);
          this.controls = false;
          ig.Timer.timeScale = 1;
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

        if (ig.input.pressed("continue")) {
          ig.system.setGame(MyGame);
          return;
        }
      },

      draw: function () {
        this.parent();

        if (this.paused == true) {
          var cx = ig.system.width / 2;
          this.title2.draw(cx - this.title.width / 2, 0);
          this.font.draw(
            " - Press ESC to continue - ",
            ig.system.width / 2,
            175,
            ig.Font.ALIGN.CENTER
          );
          // Return to stop anything else drawing
          return;
        }

        if (this.controls == true) {
          var cx = ig.system.width / 2;
          this.title3.draw(cx - this.title.width / 2, 0);
          // Return to stop anything else drawing
          return;
        }

        var cx = ig.system.width / 2;
        this.title.draw(cx - this.title.width / 2, 0);

        // var startText = ig.ua.mobile
        //   ? 'Press Button to Play!'
        //   : 'Press X or C to Play!';

        var startText =
          "Press C to Play Game!\n\nPress Z to View the Controls!\n\nYou can test the controls on this screen.";

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
