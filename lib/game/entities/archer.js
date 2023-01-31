ig.module("game.entities.archer")
  .requires("impact.entity", "game.entities.archerAttack")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityArcher = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 16, y: 20 },
      offset: { x: 24, y: 44 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 75, y: 150 },
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
      animSheet: new ig.AnimationSheet(
        "media/Enemies/Archer/archer.png",
        186,
        80
      ),
      //run(6) -> attack(7) -> hit and death(7) -> idle(6) -> jump fall land(5)
      //186 x 80

      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.2, [21, 22, 23, 24, 25, 26]);
        this.addAnim("run", 0.18, [1, 2, 3, 4, 5]);
        this.addAnim("attack", 0.15, [7, 8, 9, 10, 11, 12, 13]);
        this.addAnim("atkCD", 0.15, [21]);
        this.addAnim("damaged", 0.1, [14, 15]);
        this.addAnim("death", 0.17, [16, 17, 18, 19, 20]);
        this.addAnim("jump", 0.2, [27, 28, 29, 30, 31]);
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
            this.currentAnim = this.anims.run.rewind();
            this.currentAnim.flip.x = this.flip;
          }

          // Se mueve si no es atacado
        } else {
          // Detecta al jugador
          if (this.distanceTo(ig.game.player) < 125) {
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
            this.distX(ig.game.player) < 125 &&
            this.distX(ig.game.player) > -125
          ) {
            this.accel.x = 0;
          } else {
            this.currentAnim = this.anims.run;
          }

          // Llama al ataque del caballero porque está cerca del jugador y a una altura aceptable
          if (
            this.distX(ig.game.player) < 125 &&
            this.distX(ig.game.player) > -125 &&
            this.distY(ig.game.player) < 35 &&
            this.distY(ig.game.player) > -35
          ) {
            this.attacking = true;

            if (
              this.attacking == true &&
              this.atkCooldown <= 0 &&
              this.currentAnim != this.anims.attack
            ) {
              this.currentAnim = this.anims.attack.rewind();
              this.currentAnim.flip.x = this.flip;
              this.atkCooldown = 250;
              this.atkAnim = false;
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
                  "EntityArcherAttack",
                  this.pos.x,
                  this.pos.y,
                  this.flip
                );
              }

              if (
                this.currentAnim == this.anims.attack &&
                this.currentAnim.loopCount
              ) {
                this.currentAnim = this.anims.atkCD;
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
              this.currentAnim = this.anims.atkCD;
              this.currentAnim.flip.x = this.flip;
            }
          }

          // Define el tiempo de invencibilidad del enemigo
          if (this.countDown <= 250 && this.countDown >= 150) {
            this.countDown++;
          } else {
            this.countDown = 0;
            this.invincible = false;
          }
        }

        if (this.currentAnim != this.anims.attack) {
          this.currentAnim.flip.x = this.flip;

          if (this.currentAnim == this.anims.atkCD) {
            if (this.flip == true) {
              this.offset.x = 147;
            } else {
              this.offset.x = 24;
            }

            // Cambia posición de la hitbox dependiendo del movimiento del enemigo
            // True mira a la izquierda, false a la derecha
          } else {
            if (this.flip == true) {
              this.offset.x = 144;
            } else {
              this.offset.x = 26;
            }
          }
        }
      },

      handleMovementTrace: function (res) {
        this.parent(res);
        // collision with a wall? return!
        if (res.collision.x && this.distanceTo(ig.game.player) > 115) {
          this.flip = !this.flip;
          this.currentAnim = this.anims.run;
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
                  this.offset.x = 95;
                } else {
                  this.offset.x = 95;
                }
              }
            }
          }
        }
      },
    });
  });
