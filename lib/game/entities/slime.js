ig.module("game.entities.slime")
  .requires("impact.entity")
  .defines(function () {
    // Subclase de ig.Enitity
    EntitySlime = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 17, y: 14 },
      offset: { x: 23, y: 34 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 125, y: 20 },
      friction: { x: 600, y: 0 },
      health: 100,
      damaged: false,
      countDown: 0,
      attacking: false,
      atkCooldown: 0,
      invincible: false,
      atkAnim: false,
      dead: false,
      soundJump: false,
      land: false,

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet("media/Enemies/Slime/slime.png", 64, 64),

      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.18, [26, 27, 28, 29, 30, 31]);
        this.addAnim("damaged", 0.15, [0, 1, 2]);
        this.addAnim("dead", 0.1, [3, 4, 5, 6, 7, 8]);
        // Del 4 al 11 (en frames) se debe mover. 16 - 23
        this.addAnim(
          "hop",
          0.17,
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
        );
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        var xdir;
        var soundEffect;

        if (this.damaged == true) {
          this.countDown++;
          this.atkCooldown--;

          if (this.atkCooldown < 0) {
            this.atkAnim = false;
          }
        }

        // Si es atacado, se para (simula un stun)
        if (this.countDown >= 1 && this.countDown < 150) {
          this.accel.x = 0;

          this.size.y = 14;
          this.offset.y = 34;
          this.pos.y = 258;

          // Si no está puesta la animación de atacado, entonces lo pone
          if (this.currentAnim != this.anims.damaged && this.health > 0) {
            this.currentAnim = this.anims.damaged.rewind();
            this.currentAnim.flip.x = this.flip;
          }

          // Si no es atacado durante un tiempo, entonces sale del stun
        } else if (
          this.countDown >= 150 &&
          this.invincible == false &&
          this.health > 0
        ) {
          this.damaged = false;
          this.countDown = 151;

          if (this.countDown >= 150) {
            this.invincible = true;
          }

          if (this.currentAnim == this.anims.damaged) {
            this.currentAnim = this.anims.idle.rewind();
            this.currentAnim.flip.x = this.flip;
          }

          // Se mueve si no es atacado
        } else {
          // Detecta al jugador
          if (this.distanceTo(ig.game.player) < 92) {
            if (this.distX(ig.game.player) <= 0) {
              // Va a la izquierda
              this.flip = false;

              // Va a la derecha
            } else {
              this.flip = true;
            }
          }

          // Se mueve en la dirección indicada
          xdir = this.flip ? -1 : 1;

          // Llama al ataque del caballero porque está cerca del jugador y a una altura aceptable
          if (
            this.distX(ig.game.player) < 92 &&
            this.distX(ig.game.player) > -92 &&
            this.distY(ig.game.player) < 40 &&
            this.distY(ig.game.player) > -40 &&
            this.health > 0
          ) {
            this.attacking = true;

            if (
              this.attacking == true &&
              this.atkCooldown <= 0 &&
              this.atkAnim == false &&
              this.currentAnim != this.anims.hop
            ) {
              this.currentAnim = this.anims.hop.rewind();
              this.atkAnim = true;
              this.atkCooldown = 100;
            }

            if (this.atkAnim == true && this.currentAnim == this.anims.hop) {
              if (
                this.currentAnim == this.anims.hop &&
                this.currentAnim.frame >= 3 &&
                this.currentAnim.frame < 10
              ) {
                this.accel.x = 80 * xdir;
              } else if (
                this.currentAnim == this.anims.hop &&
                (this.currentAnim.frame <= 2 || this.currentAnim.frame == 11)
              ) {
                this.accel.x = 0;
              }

              this.atkCooldown--;
            } else {
              this.currentAnim = this.anims.idle;
              this.atkCooldown--;
            }

            if (this.atkCooldown <= 0) {
              this.atkAnim = false;
            }
          } else if (this.health > 0) {
            this.attacking = false;

            if (
              this.attacking == false &&
              this.atkCooldown <= 0 &&
              this.atkAnim == false
            ) {
              this.currentAnim = this.anims.hop;
              this.atkAnim = true;
              this.atkCooldown = 150;
            }

            if (this.atkAnim == true && this.currentAnim == this.anims.hop) {
              if (
                this.currentAnim == this.anims.hop &&
                this.currentAnim.frame >= 3 &&
                this.currentAnim.frame < 10
              ) {
                this.accel.x = 80 * xdir;
              } else if (
                this.currentAnim == this.anims.hop &&
                (this.currentAnim.frame <= 2 || this.currentAnim.frame == 11)
              ) {
                this.accel.x = 0;
              }

              this.atkCooldown--;
            } else {
              this.currentAnim = this.anims.idle.rewind();
              this.atkCooldown--;
            }

            if (this.atkCooldown >= 0 && this.atkAnim == true) {
              this.atkCooldown--;
            }

            if (this.atkCooldown <= 0) {
              this.atkAnim = false;
            }
          }

          // Define el tiempo de invencibilidad del enemigo
          if (this.countDown <= 201 && this.countDown >= 150) {
            this.countDown++;
          } else {
            this.countDown = 0;
            this.invincible = false;
          }
        }

        // Salta
        if (
          this.currentAnim == this.anims.hop &&
          this.currentAnim.frame >= 3 &&
          this.currentAnim.frame < 10
        ) {
          this.size.y = 35;
          this.offset.y = 13;
          this.pos.y = 237;

          // Normal
        } else if (
          this.currentAnim == this.anims.hop &&
          (this.currentAnim.frame <= 2 || this.currentAnim.frame == 11)
        ) {
          this.size.y = 14;
          this.offset.y = 34;
          this.pos.y = 258;
        }

        if (this.currentAnim != this.anims.attack) {
          this.currentAnim.flip.x = this.flip;

          // Cambia posición de la hitbox dependiendo del movimiento del enemigo
          // True mira a la izquierda, false a la derecha
          if (this.flip == true) {
            this.offset.x = 24;
          } else {
            this.offset.x = 23;
          }
        }

        if (this.health <= 0 && this.currentAnim != this.anims.dead) {
          soundEffect = new ig.Sound(
            "./media/SoundEffects/Pixabay/Enemies/slimeDeath.ogg",
            false
          );
          soundEffect.play();

          this.currentAnim = this.anims.dead.rewind();
          this.collides = ig.Entity.COLLIDES.NEVER;
          this.accel.x = 0;
        } else if (this.health <= 0 && this.currentAnim == this.anims.dead) {
          if (this.currentAnim.loopCount > 0) {
            this.dead = true;
            this.kill();
          }
        }

        if (this.distanceTo(ig.game.player) < 92) {
          if (
            this.currentAnim == this.anims.hop &&
            this.currentAnim.frame == 3
          ) {
            if (this.soundJump == false) {
              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Enemies/slimeJump.ogg",
                false
              );
              soundEffect.play();
              this.soundJump = true;
            }
          } else if (
            this.currentAnim == this.anims.hop &&
            this.currentAnim.frame == 10
          ) {
            if (this.land == false) {
              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Enemies/slimeSplat.ogg",
                false
              );
              soundEffect.play();
              this.land = true;
            }
          } else if (
            this.currentAnim == this.anims.hop &&
            this.currentAnim.frame == 0
          ) {
            this.soundJump = false;
            this.land = false;
          }
        } else {
          this.soundJump = false;
          this.land = false;
        }
      },

      handleMovementTrace: function (res) {
        this.parent(res);
        // collision with a wall? return!
        if (res.collision.x) {
          this.flip = !this.flip;
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

      check: function (other) {
        if (other instanceof EntityPlayer) {
          // Bajo daño porque puede repetirse varias veces antes de volverse invencible
          if (
            other.invincible == false &&
            other.damaged == false &&
            this.collides == ig.Entity.COLLIDES.PASSIVE
          ) {
            other.receiveDamage(5, this);
            other.damaged = true;

            if (other.health > 0) {
              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Player/playerHurt.ogg",
                false
              );
              soundEffect.play();
            }
          }
        }
      },

      kill: function () {
        if (this.dead == true) {
          ig.game.removeEntity(this);
        }
      },
    });
  });
