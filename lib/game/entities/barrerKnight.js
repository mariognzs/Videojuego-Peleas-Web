ig.module("game.entities.barrerKnight")
  .requires("impact.entity", "game.entities.barrerKnightAttack")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityBarrerKnight = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 15, y: 23 },
      offset: { x: 38, y: 25 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 60, y: 150 },
      friction: { x: 600, y: 0 },
      health: 150,
      damaged: false,
      countDown: 0,
      attacking: false,
      atkCooldown: 0,
      invincible: false,
      atkAnim: false,
      dead: false,
      checkedFlip: false,
      flipped: false,
      checkedFlipCount: 0,
      atkSound: false,

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet(
        "media/Enemies/BarrelKnight/BarrerKnight.png",
        156,
        64
      ),

      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.PASSIVE,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 1, [30, 31, 32]);
        this.addAnim("walk", 0.1, [42, 43, 44, 45, 46, 47, 48]);
        this.addAnim("attack", 0.17, [7, 6, 5, 0, 4, 1, 3, 2]);
        this.addAnim(
          "chargeAtk",
          0.17,
          [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13]
        );
        this.addAnim("atkCD", 1, [1]);
        this.addAnim("dead", 0.2, [14, 15, 16, 17, 18, 19]);
        this.addAnim("damaged", 0.18, [28, 29]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        var xdir;
        var soundEffect;

        // Detecta al jugador
        if (
          this.distanceTo(ig.game.player) < 115 &&
          this.currentAnim != this.anims.attack &&
          this.currentAnim != this.anims.dead
        ) {
          if (this.distX(ig.game.player) <= 0) {
            // Va a la izquierda
            this.flip = false;

            // Va a la derecha
          } else {
            this.flip = true;
          }
        }

        // Si tiene vida, entonces actua y ataca
        if (this.health > 0) {
          // Comportamiento si está en rango
          if (
            Math.floor(this.distX(ig.game.player)) <= 40 &&
            Math.floor(this.distX(ig.game.player)) >= -40 &&
            this.damaged == false
          ) {
            // Solo ataca si está en la altura correcta
            if (
              this.distY(ig.game.player) < 30 &&
              this.distY(ig.game.player) > -30
            ) {
              if (this.atkCooldown <= 0 && this.atkAnim == false) {
                this.currentAnim = this.anims.attack.rewind();
                this.atkAnim = true;
                this.atkCooldown = 150;
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

              if (this.atkCooldown > 0 && this.atkAnim == false) {
                this.accel.x = 0;
                this.currentAnim = this.anims.atkCD;

                if (this.distX(ig.game.player) <= 0) {
                  // Va a la izquierda
                  this.flip = false;

                  // Va a la derecha
                } else {
                  this.flip = true;
                }

                this.currentAnim.flip.x = this.flip;
                this.atkCooldown--;
              }

              // Hace la animación
              if (this.atkAnim == true) {
                this.accel.x = 0;
                this.currentAnim = this.anims.attack;
              }
            }

            if (this.atkCooldown > 0 && this.atkAnim == false) {
              this.accel.x = 0;
              this.currentAnim = this.anims.atkCD;

              if (this.distX(ig.game.player) <= 0) {
                // Va a la izquierda
                this.flip = false;

                // Va a la derecha
              } else {
                this.flip = true;
              }

              this.currentAnim.flip.x = this.flip;
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
                this.countDown = 200;
                this.accel.x = 0;

                if (this.flip == true) {
                  this.offset.x = 101;
                } else {
                  this.offset.x = 40;
                }
              }

              // A los 200 ms es invencible
              if (this.countDown < 50 && this.countDown > 0) {
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

              if (this.atkCooldown > 0 && this.atkAnim == false) {
                this.accel.x = 0;
                this.currentAnim = this.anims.atkCD;

                if (this.distX(ig.game.player) <= 0) {
                  // Va a la izquierda
                  this.flip = false;

                  // Va a la derecha
                } else {
                  this.flip = true;
                }

                this.currentAnim.flip.x = this.flip;
                this.atkCooldown--;
              }

              // Hace la animación
              if (this.atkAnim == true) {
                this.accel.x = 0;
                this.currentAnim = this.anims.attack;
              }

              if (this.distX(ig.game.player) <= 0) {
                // Va a la izquierda
                this.flip = false;

                // Va a la derecha
              } else {
                this.flip = true;
              }

              // Solo ataca si está en la altura correcta
              if (
                this.distY(ig.game.player) < 30 &&
                this.distY(ig.game.player) > -30
              ) {
                if (this.atkCooldown <= 0 && this.atkAnim == false) {
                  this.currentAnim = this.anims.attack.rewind();
                  this.currentAnim.flip.x = this.flip;
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
            } else if (this.checkedFlip == true) {
              this.checkedFlipCount++;
              xdir = this.flip ? -1 : 1;
              this.accel.x = 60 * xdir;

              if (this.checkedFlip == true && this.checkedFlipCount > 100) {
                this.checkedFlip = false;
              }
              // Si no está atacando, patrulla
            } else {
              // Se mueve en la dirección indicada
              xdir = this.flip ? -1 : 1;
              this.accel.x = 60 * xdir;
              this.currentAnim = this.anims.walk;
            }
          }

          // -------------------------------------------------------------------------------------
          // Animaciones
          if (this.currentAnim == this.anims.idle) {
            this.currentAnim.flip.x = this.flip;

            if (this.flip == true) {
              this.offset.x = 101;
            } else {
              this.offset.x = 40;
            }
          } else if (this.currentAnim == this.anims.walk) {
            this.currentAnim.flip.x = this.flip;

            if (this.flip == true) {
              this.offset.x = 101;
            } else {
              this.offset.x = 40;
            }

            // Hay que ver para que cuando ataque se quede en esa dirección por un tiempo
          } else if (this.currentAnim == this.anims.attack) {
            this.currentAnim.flip.x = this.flip;

            if (this.currentAnim.frame == 0 && this.atkSound == false) {
              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Enemies/knightAttack.ogg",
                false
              );
              soundEffect.play();
              this.atkSound = true;
            } else {
              this.atkSound = false;
            }

            if (this.currentAnim.frame == 2) {
              if (this.flip == true) {
                this.offset.x = 101;
              } else {
                this.offset.x = 40;
              }

              if (this.attacking == false) {
                ig.game.spawnEntity(
                  "EntityBarrerKnightAttack",
                  this.pos.x,
                  this.pos.y,
                  this.flip
                );
                this.attacking = true;
              }
            } else {
              if (this.flip == true) {
                this.offset.x = 101;
              } else {
                this.offset.x = 40;
              }

              // Terminó la animación de ataque
              if (this.currentAnim.frame == 7) {
                this.atkAnim = false;
                this.attacking = false;
              }
            }
          } else if (this.currentAnim == this.anims.atkCD) {
            this.currentAnim.flip.x = this.flip;

            if (this.flip == true) {
              this.offset.x = 101;
            } else {
              this.offset.x = 40;
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

              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Enemies/knightDeath.ogg",
                false
              );
              soundEffect.play();

              this.currentAnim = this.anims.dead.rewind();
              this.currentAnim.flip.x = this.flip;
              this.collides = ig.Entity.COLLIDES.NEVER;
              this.accel.x = 0;
            } else {
              this.currentAnim = this.anims.dead;

              if (this.flip == true) {
                this.offset.x = 101;
              } else {
                this.offset.x = 40;
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
        var soundEffect;

        if (other instanceof EntityPlayer) {
          // Bajo daño porque puede repetirse varias veces antes de volverse invencible
          if (
            other.invincible == false &&
            other.damaged == false &&
            this.collides == ig.Entity.COLLIDES.PASSIVE
          ) {
            other.receiveDamage(4, this);
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
