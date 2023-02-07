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
      invincible: true,
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
        var xdir;

        // Detecta al jugador
        if (
          this.distanceTo(ig.game.player) < 115 &&
          this.currentAnim != this.anims.attack &&
          this.currentAnim != this.anims.dead
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

        // No olvidarse de darle la vuelta (cambiarlo a this.transforming == false)
        if (this.transforming == false) {
          this.currentAnim = this.anims.transform;
          this.currentAnim.flip.x = true;

          if (this.currentAnim.loopCount > 0) {
            this.transforming = true;
            this.collides = ig.Entity.COLLIDES.PASSIVE;
            this.invincible = false;
          }

          // Lo que hace después de transformarse
        } else {
          // Si tiene vida, entonces actua y ataca
          if (this.health > 0) {
            // Comportamiento si está en rango
            if (
              Math.floor(this.distX(ig.game.player)) <= 100 &&
              Math.floor(this.distX(ig.game.player)) >= -100 &&
              this.damaged == false
            ) {
              // Solo entra una vez hasta que termine la animación de ataque y que el atkCD es 0
              // Resetea al primer frame (el último frame permite entrar a esta condición, pero lo
              // hace por un segundo y vuelve al idle)
              if (this.atkCooldown <= 0 && this.atkAnim == false) {
                this.currentAnim = this.anims.attack.rewind();
                this.atkAnim = true;
                this.atkCooldown = 175;
                this.accel.x = 0;

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
              } else if (this.atkCooldown > 0 && this.atkAnim == false) {
                this.accel.x = 0;
                this.currentAnim = this.anims.idle;
                this.atkCooldown--;
              }

              // Hace la animación
              if (this.atkAnim == true) {
                this.accel.x = 0;
                this.currentAnim = this.anims.attack;
              }

              // Lo que pasa mientras está dañado
            } else if (this.damaged == true) {
              if (this.atkCooldown > 0) {
                this.atkCooldown--;
              }

              // Si no ha ganado invencibilidad aún
              if (this.invincible == false) {
                if (this.countDown == 0) {
                  this.currentAnim = this.anims.damaged.rewind();
                  this.currentAnim.flip.x = this.flip;
                  this.countDown = 300;
                  this.accel.x = 0;

                  if (this.flip == true) {
                    this.offset.x = 25;
                  } else {
                    this.offset.x = 10;
                  }
                }

                // A los 200 ms es invencible
                if (this.countDown < 200 && this.countDown > 0) {
                  this.invincible = true;
                }

                this.countDown--;

                // Termina el ataque si se hizo antes
              } else if (this.atkAnim == true) {
                this.currentAnim = this.anims.attack;
                this.accel.x = 0;

                if (this.countDown > 0) {
                  this.countDown--;

                  if (this.countDown <= 0) {
                    this.invincible = false;
                    this.damaged = false;
                  }
                }

                // Sigue atacando si el jugador está cerca
              } else {
                this.accel.x = 0;
                this.currentAnim = this.anims.idle;

                if (this.atkCooldown <= 0 && this.atkAnim == false) {
                  this.currentAnim = this.anims.attack.rewind();
                  this.atkAnim = true;
                  this.atkCooldown = 175;
                  this.accel.x = 0;

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
                }

                if (this.countDown > 0) {
                  this.countDown--;

                  if (this.countDown <= 0) {
                    this.invincible = false;
                    this.damaged = false;
                  }
                }
              }

              // El jugador está a una distancia mayor que la de rango ataque
            } else {
              // Contador de ataque
              if (this.atkCooldown > 0) {
                this.atkCooldown--;
              }

              // Contador de damaged
              if (this.countDown > 0) {
                this.countDown--;

                if (this.countDown <= 0) {
                  this.invincible = false;
                  this.damaged = false;
                }
              }

              // Si aún está en ataque, ataca (animación)
              if (this.atkAnim == true) {
                this.currentAnim = this.anims.attack;

                // Si no está atacando, patrulla
              } else {
                // Se mueve en la dirección indicada
                xdir = this.flip ? -1 : 1;
                this.accel.x = 60 * xdir;

                // El mago puede estar de vez en cuando en la dist 99 y 105
                if (
                  Math.floor(this.distX(ig.game.player)) >= 99 &&
                  Math.floor(this.distX(ig.game.player)) <= 105
                ) {
                  this.currentAnim = this.anims.idle;
                } else if (
                  Math.floor(this.distX(ig.game.player)) <= -99 &&
                  Math.floor(this.distX(ig.game.player)) >= -105
                ) {
                  this.currentAnim = this.anims.idle;
                } else {
                  this.currentAnim = this.anims.walk;
                }
              }
            }

            // -------------------------------------------------------------------------------------
            // Animaciones
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

                if (this.attacking == false) {
                  ig.game.spawnEntity(
                    "EntityBossMageAttack",
                    this.pos.x,
                    this.pos.y,
                    this.flip
                  );
                  this.attacking = true;
                }
              } else if (
                this.currentAnim.frame >= 2 &&
                this.currentAnim.frame < 4
              ) {
                if (this.flip == true) {
                  this.offset.x = 11;
                } else {
                  this.offset.x = 23;
                }
              } else {
                if (this.flip == true) {
                  this.offset.x = 32;
                } else {
                  this.offset.x = 3;
                }

                // Terminó la animación de ataque
                if (this.currentAnim.frame == 6) {
                  this.atkAnim = false;
                  this.attacking = false;
                }
              }
            }
          } else {
            // Lo que hace una vez muere
            if (this.health <= 0) {
              if (this.currentAnim != this.anims.dead && this.dead == false) {
                if (this.distX(ig.game.player) <= 0) {
                  // Va a la izquierda
                  this.flip = false;

                  // Va a la derecha
                } else {
                  this.flip = true;
                }

                this.currentAnim = this.anims.dead.rewind();
                this.currentAnim.flip.x = this.flip;
                this.collides = ig.Entity.COLLIDES.NEVER;
              } else {
                this.currentAnim = this.anims.dead;

                if (this.flip == true) {
                  this.offset.x = 32;
                } else {
                  this.offset.x = 3;
                }

                if (
                  this.currentAnim.frame == 0 &&
                  this.currentAnim.loopCount > 0
                ) {
                  this.dead = true;
                  this.kill();
                }
              }
            }
          }
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

      collideWith: function (other, axis) {
        if (other instanceof EntityPlayer) {
          if (other.invincible == false) {
            other.receiveDamage(1, this);
            other.damaged = true;
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
