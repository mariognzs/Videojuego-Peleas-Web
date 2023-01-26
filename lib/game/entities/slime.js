ig.module("game.entities.slime")
  .requires("impact.entity", "game.entities.slimeAttack")
  .defines(function () {
    // Subclase de ig.Enitity
    EntitySlime = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 17, y: 14 },
      offset: { x: 23, y: 34 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 65, y: 150 },
      friction: { x: 600, y: 0 },
      health: 150,
      damaged: false,
      countDown: 0,
      attacking: false,
      atkCooldown: 0,
      invincible: false,
      atkAnim: false,

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet("media/Enemies/Slime/slime.png", 64, 64),

      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      check: function (other) {
        // If the only entity with the type A is the player, we can safely
        // assume here that 'other' is always the player entity.
        // You can always do some further checks here.
        // give the player some damage on collision:
        // this.pos.x = 315;
        // this.pos.y = 202;
      },

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
        this.addAnim("attack", 0.2, [39, 40, 41, 42, 43, 44, 45, 46]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        var xdir;

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

          // Si no está puesta la animación de atacado, entonces lo pone
          if (this.currentAnim != this.anims.damaged) {
            this.currentAnim = this.anims.damaged.rewind();
            this.currentAnim.flip.x = this.flip;
          }

          // Si no es atacado durante un tiempo, entonces sale del stun
        } else if (this.countDown >= 150 && this.invincible == false) {
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
          if (this.distanceTo(ig.game.player) < 85) {
            // Va a la derecha
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
          this.accel.x = 60 * xdir;

          // Para si está cerca del jugador
          if (
            this.distX(ig.game.player) < 32 &&
            this.distX(ig.game.player) > -32
          ) {
            this.accel.x = 0;
          }

          // Llama al ataque del caballero porque está cerca del jugador y a una altura aceptable
          if (
            this.distX(ig.game.player) < 36 &&
            this.distX(ig.game.player) > -36 &&
            this.distY(ig.game.player) < 24 &&
            this.distY(ig.game.player) > -24
          ) {
            this.attacking = true;

            if (
              this.attacking == true &&
              this.atkCooldown <= 0 &&
              this.currentAnim != this.anims.attack
            ) {
              this.currentAnim = this.anims.attack.rewind();
              this.currentAnim.flip.x = this.flip;
              this.atkCooldown = 150;
            } else {
              this.atkCooldown--;

              if (
                this.currentAnim == this.anims.attack &&
                this.currentAnim.frame == 4 &&
                this.atkAnim == false
              ) {
                this.atkAnim = true;

                // Ataca
                ig.game.spawnEntity(
                  "EntitySlimeAttack",
                  this.pos.x,
                  this.pos.y,
                  this.flip
                );
              }

              if (
                this.currentAnim == this.anims.attack &&
                this.currentAnim.loopCount
              ) {
                this.currentAnim = this.anims.idle;
                this.currentAnim.flip.x = this.flip;
                this.atkAnim = false;
              }
            }
          } else {
            this.attacking = false;

            if (this.atkCooldown >= 0) {
              this.atkCooldown--;
            }

            if (this.accel.x == 0 && this.currentAnim.loopCount) {
              this.currentAnim = this.anims.idle;
              this.currentAnim.flip.x = this.flip;
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

        if(this.accel.x != 0) {
          this.currentAnim = this.anims.hop.rewind();

          // if (this.currentAnim == this.anims.hop) {
          //   console.info(this.currentAnim.frame);
          // } else {
          //   this.accel.x = 60 * xdir;
          // }
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
      },

      handleMovementTrace: function (res) {
        this.parent(res);
        // collision with a wall? return!
        if (res.collision.x && this.distanceTo(ig.game.player) > 85) {
          this.flip = !this.flip;
          this.currentAnim = this.anims.hop.rewind();
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

      collideWith: function (other, axis) {
        if (other instanceof EntityPlayer) {
          if (other.invincible == false) {
            other.receiveDamage(1, this);
            other.damaged = true;

            // En el caso de que la hitbox choca con el jugador desde abajo
            if (this.currentAnim == this.anims.attack) {
              if (axis === "y" && this.distY(ig.game.player) < 0) {
                if (this.distX(ig.game.player) >= 0) {
                  this.offset.x = 24;
                  console.info("1");
                } else {
                  this.offset.x = 24;
                  console.info("2");
                }
              }
            }
          }
        }
      },
    });
  });
