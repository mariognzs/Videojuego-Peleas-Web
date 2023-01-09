ig.module("game.entities.player")
  .requires("impact.entity", "game.entities.playerAttack")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityPlayer = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.A,
      size: { x: 21, y: 22 },
      offset: { x: 55, y: 10 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 100, y: 150 },
      friction: { x: 600, y: 0 },
      health: 50,
      tiempoAttack: 0,
      attacking: false,

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet("media/Player/player.png", 126, 39),
      collides: ig.Entity.COLLIDES.ACTIVE,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.15, [19, 20, 21, 22, 23]);
        this.addAnim("run", 0.1, [24, 25, 26, 27, 28, 29, 30, 31]);
        this.addAnim("attack", 0.17, [0, 1, 2, 3]);
        this.addAnim("attack2", 0.17, [4, 5, 6, 7]);
        this.addAnim("damaged", 0.2, [17, 18, 17, 18]);
        this.addAnim("dead", 0.2, [12, 13, 14, 15, 17]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        var fastAttack = new ig.Sound( './media/SoundEffects/FastAttack.ogg' );
        var fastAttack2 = new ig.Sound( './media/SoundEffects/FastAttack2.ogg' );

        if (ig.input.state("left")) {
          this.accel.x = -this.speed;
          this.flip = true;
          this.offset.x = 50;
        } else if (ig.input.state("right")) {
          this.accel.x = this.speed;
          this.flip = false;
          this.offset.x = 55;
        } else {
          this.accel.x = 0;
        }

        if (ig.input.pressed("jump") && this.standing) {
          this.vel.y = this.jump_speed;
        }

        // Mira que no haya animaciones actualmente
        if (
          this.currentAnim != this.anims.attack &&
          this.currentAnim != this.anims.attack2 &&
          this.currentAnim != this.anims.dead &&
          this.currentAnim != this.anims.damaged
        ) {
          //
          if (ig.input.pressed("attack") && this.tiempoAttack <= 0) {
            // we simulate a sword with a very fast moving projectile with a limited range
            ig.game.spawnEntity(
              "EntityPlayerAttack",
              this.pos.x,
              this.pos.y,
              this.flip
            );
            this.currentAnim = this.anims.attack.rewind();
            this.tiempoAttack = 1;
            this.attacking = true;
            fastAttack.play();

            //
          } else if (
            ig.input.pressed("attack") &&
            this.tiempoAttack > 0 &&
            this.tiempoAttack < 200
          ) {
            // we simulate a sword with a very fast moving projectile with a limited range
            ig.game.spawnEntity(
              "EntityPlayerAttack",
              this.pos.x,
              this.pos.y,
              this.flip
            );
            this.currentAnim = this.anims.attack2.rewind();
            fastAttack2.play();
            
            //
          } else if (ig.input.pressed("dead")) {
            this.currentAnim = this.anims.dead.rewind();
            this.currentAnim.flip.x = this.flip;
            //
          } else if (ig.input.pressed("damaged")) {
            this.currentAnim = this.anims.damaged.rewind();
            this.currentAnim.flip.x = this.flip;
          }

          this.currentAnim.flip.x = this.flip;
        }

        // Mira que termina la animación de ataque
        if (this.currentAnim == this.anims.attack) {
          if (this.currentAnim.loopCount) {
            //Shot has played through all the way. Go to idle animation
            this.currentAnim = this.anims.idle;
          } else {
            this.accel.x = 0;
          }
        } else if (this.currentAnim == this.anims.attack2) {
          if (this.currentAnim.loopCount) {
            //Shot has played through all the way. Go to idle animation
            this.currentAnim = this.anims.idle;
            this.attacking = false;
            this.tiempoAttack = 0;
          } else {
            this.accel.x = 0;
          }
        } else if (this.currentAnim == this.anims.dead) {
          if (this.currentAnim.loopCount) {
            //Shot has played through all the way. Go to idle animation
            this.currentAnim = this.anims.idle;
          } else {
            this.accel.x = 0;
          }
        } else if (this.currentAnim == this.anims.damaged) {
          if (this.currentAnim.loopCount) {
            //Shot has played through all the way. Go to idle animation
            this.currentAnim = this.anims.idle;
          } else {
            this.accel.x = 0;
          }
        } else {
          if (!this.standing) {
            this.currentAnim = this.anims.damaged;
          } else if (this.vel.x == 0) {
            this.currentAnim = this.anims.idle;

            if (this.flip == true) {
              this.offset.x = 50;
            } else {
              this.offset.x = 55;
            }
          } else {
            this.currentAnim = this.anims.run;
          }

          this.currentAnim.flip.x = this.flip;

          if (this.tiempoAttack != 0 && this.attacking == true) {
            this.tiempoAttack += 1;

            // Resetea estado de ataque (para combos)
            if (this.tiempoAttack >= 200) {
              this.tiempoAttack = 0;
              this.attacking = false;
            }
          }

          //muertes
          if (this.pos.y > ig.system.height) {
            //this.kill();
          }
        }
      },

      kill: function () {
        // reset the player position instead of destroying it
        this.pos.x = 64;
        this.pos.y = 144;
      },
    });
  });
