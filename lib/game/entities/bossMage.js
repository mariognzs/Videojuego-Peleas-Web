ig.module("game.entities.bossMage")
  .requires("impact.entity", "game.entities.bossMageAttack")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityBossMage = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 26, y: 54 },
      offset: { x: 32, y: 40 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 100, y: 150 },
      friction: { x: 600, y: 0 },
      health: 150,
      damaged: false,
      countDown: 0,
      attacking: false,
      atkCooldown: 0,
      invincible: false,
      atkAnim: false,
      dead: false,
      transforming: false,
      phase2: false,

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet(
        "media/Enemies/EvilWizard/EvilWizard.png",
        61,
        95
      ),

      checkAgainst: ig.Entity.TYPE.A,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.15, [0, 1, 2, 3, 4, 5, 6, 7]);
        this.addAnim("walk", 0.1, [8, 9, 10, 11, 12, 13, 14, 15]);
        this.addAnim("attack", 0.17, [16, 17, 18, 19, 20, 21, 22]);
        this.addAnim("damaged", 0.4, [23, 31, 2]);
        this.addAnim("dead", 0.2, [24, 25, 26, 27, 28, 29, 30]);
        this.addAnim(
          "transform",
          0.2,
          [32, 33, 34, 35, 36, 37, 38, 32, 38, 32, 38, 3, 39, 3, 39, 3]
        );
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        // Detecta al jugador
        if (
          this.distanceTo(ig.game.player) < 115 &&
          this.currentAnim != this.anims.attack
        ) {
          // Va a la derecha
          if (this.distX(ig.game.player) <= 0) {
            // Va a la izquierda
            this.flip = false;

            // Va a la derecha
          } else {
            this.flip = true;
          }
        }

        // console.info(this.distX(ig.game.player));

        // No olvidarse de darle la vuelta (cambiarlo a this.transforming == false)
        if (this.transforming != false) {
          this.currentAnim = this.anims.transform;
          this.currentAnim.flip.x = true;

          if (this.currentAnim.loopCount > 0) {
            this.transforming = true;
          }

          // Lo que hace después de transformarse
        } else {
          // this.currentAnim = this.anims.idle;
          // this.currentAnim = this.anims.attack;
          // this.currentAnim = this.anims.walk;
          // this.currentAnim = this.anims.damaged;

          if (
            this.distX(ig.game.player) <= 100 &&
            this.distX(ig.game.player) >= -100 &&
            this.atkCooldown <= 0 &&
            this.atkAnim == false
          ) {
            // Solo entra una vez hasta que termine la animación de ataque y que el atkCD es 0
            // Resetea al primer frame (el último frame permite entrar a esta condición, pero lo
            // hace por un segundo y vuelve al idle)
            // this.currentAnim = this.anims.attack.rewind();
            // this.atkAnim = true;
            // this.atkCooldown = 150;
            this.currentAnim = this.anims.dead;
            // Esto sirve para decir donde atacar. Sirve para no girar de repente cuando está detrás
            // del personaje
            // Va a la derecha
            if (this.distX(ig.game.player) <= 0) {
              // Va a la izquierda
              this.flip = false;

              // Va a la derecha
            } else {
              this.flip = true;
            }

            // Abierto a modificación el else
          } else if (this.atkCooldown > 0 && this.atkAnim == false) {
            this.currentAnim = this.anims.idle;
            this.atkCooldown--;
          }

          // Hace la animación
          if (this.atkAnim == true) {
            this.currentAnim = this.anims.attack;
          }

          if (this.currentAnim == this.anims.idle) {
            this.currentAnim.flip.x = this.flip;
            this.size.x = 26;

            if (this.flip == true) {
              this.offset.x = 32;
            } else {
              this.offset.x = 3;
            }
          } else if (this.currentAnim == this.anims.walk) {
            this.currentAnim.flip.x = this.flip;
            this.size.x = 32;

            if (this.flip == true) {
              this.offset.x = 10;
            } else {
              this.offset.x = 20;
            }

            // Hay que ver para que cuando ataque se quede en esa dirección por un tiempo
          } else if (this.currentAnim == this.anims.attack) {
            this.currentAnim.flip.x = this.flip;
            this.size.x = 26;

            // attacking: false,
            // atkCooldown: 0,
            // atkAnim: false,

            if (this.currentAnim.frame == 1) {
              if (this.flip == true) {
                this.pos.x -= 1.8;
                this.offset.x = 11;
              } else {
                this.pos.x += 1.8;
                this.offset.x = 23;
              }
            } else if (this.currentAnim.frame == 4) {
              if (this.flip == true) {
                this.pos.x += 1.8;
                this.offset.x = 32;
              } else {
                this.pos.x -= 1.8;
                this.offset.x = 3;
              }

              // Invoca ataque del mago
              // Aquí el ataque se llama
            } else if (
              this.currentAnim.frame >= 2 &&
              this.currentAnim.frame < 4
            ) {
              if (this.flip == true) {
                this.offset.x = 11;
              } else {
                this.offset.x = 23;
              }

              ig.game.spawnEntity(
                "EntityBossMageAttack",
                this.pos.x,
                this.pos.y,
                this.flip
              );
            } else {
              if (this.flip == true) {
                this.offset.x = 32;
              } else {
                this.offset.x = 3;
              }

              // Terminó la animación de ataque
              if (this.currentAnim.frame == 6) {
                this.atkAnim = false;
              }
            }
          } else if (this.currentAnim == this.anims.damaged) {
            if (this.flip == true) {
              this.offset.x = 25;
            } else {
              this.offset.x = 10;
            }
          }
        }
      },

      handleMovementTrace: function (res) {
        this.parent(res);
        // collision with a wall? return!
        if (res.collision.x) {
          this.flip = !this.flip;
          this.currentAnim = this.anims.walk;
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

      check: function (other) {},
    });
  });
