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
      health: 85,
      damaged: false,
      countDown: 0,
      attacking: false,
      atkCooldown: 0,
      invincible: false,
      atkAnim: false,
      dead: false,

      soundReload: false,
      soundRelease: false,

      timeDamaged: false,
      timeStart: null,
      timeEnd: null,

      timeAttack: false,
      timeATKStart: null,
      timeATKEnd: null,

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
        this.addAnim("walk", 0.18, [1, 2, 3, 4, 5]);
        this.addAnim("attack", 0.15, [7, 8, 9, 10, 11, 12, 13]);
        this.addAnim("atkCD", 0.15, [21]);
        this.addAnim("damaged", 0.1, [14, 15]);
        this.addAnim("dead", 0.17, [16, 17, 18, 19, 20]);
        this.addAnim("jump", 0.2, [27, 28, 29, 30, 31]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        var xdir;
        var soundEffect;
        var timeATKDiff = 0;

        // Detecta al jugador
        if (
          this.distanceTo(ig.game.player) < 125 &&
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

        // Si tiene vida, entonces actua y ataca
        if (this.health > 0) {
          // Cuenta el CD del ataque
          if (this.timeAttack) {
            this.timeATKEnd = performance.now();
            timeATKDiff = this.timeATKEnd - this.timeATKStart; //in ms
            // strip the ms
            timeATKDiff /= 1000;

            // Si ha pasado 3 segundos, puede volver a atacar
            if (timeATKDiff > 5) {
              this.timeAttack = false;
              this.atkAnim = false;
              this.attacking = false;
              timeATKDiff = 0;
            }
          }

          // Comportamiento si está en rango
          if (
            Math.floor(this.distX(ig.game.player)) <= 125 &&
            Math.floor(this.distX(ig.game.player)) >= -125 &&
            this.damaged == false
          ) {
            // Se detiene si está en rango
            if (Math.floor(this.distanceTo(ig.game.player)) <= 125) {
              this.accel.x = 0;

              if (this.currentAnim == this.anims.walk) {
                this.currentAnim = this.anims.atkCD;
              }
            }

            // Solo ataca si está en la altura correcta
            if (
              this.distY(ig.game.player) < 35 &&
              this.distY(ig.game.player) > -35
            ) {
              if (this.atkAnim == false && timeATKDiff == 0) {
                this.currentAnim = this.anims.attack.rewind();
                this.atkAnim = true;
                this.accel.x = 0;

                if (this.timeAttack == false) {
                  this.timeAttack = true;
                  this.timeATKStart = performance.now();
                }

                // Esto sirve para decir donde atacar. Sirve para no girar de repente cuando está detrás
                // del personaje
                if (this.distX(ig.game.player) <= 0) {
                  // Va a la izquierda
                  this.flip = false;

                  // Va a la derecha
                } else {
                  this.flip = true;
                }
              } else if (this.atkAnim == false && timeATKDiff < 3) {
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
              }

              // Hace la animación
              if (this.atkAnim == true) {
                this.accel.x = 0;
                this.currentAnim = this.anims.attack;
              }
            }

            if (this.timeATKDiff < 3 && this.atkAnim == false) {
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

              // Hace la animación
            } else if (this.atkAnim == true) {
              this.accel.x = 0;

              if (this.attacking == false) {
                this.currentAnim = this.anims.attack;
              } else {
                this.currentAnim = this.anims.atkCD;
              }
            }

            // Lo que pasa mientras está dañado
          } else if (this.damaged == true) {
            // Si no ha ganado invencibilidad aún
            if (this.invincible == false) {
              this.accel.x = 0;

              if (this.timeDamaged == false) {
                this.currentAnim = this.anims.damaged.rewind();
                this.currentAnim.flip.x = this.flip;

                if (this.flip == false) {
                  this.offset.x = 26;
                } else {
                  this.offset.x = 144;
                }

                this.timeDamaged = true;
                this.timeStart = performance.now();
              }

              // Termina el ataque si se hizo antes
            } else if (this.atkAnim == true) {
              this.currentAnim = this.anims.attack;
              this.accel.x = 0;

              // Sigue atacando si el jugador está cerca
            } else {
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

              // Solo ataca si está en la altura correcta
              if (
                this.distY(ig.game.player) < 35 &&
                this.distY(ig.game.player) > -35
              ) {
                if (this.atkAnim == false && timeATKDiff == 0) {
                  this.currentAnim = this.anims.attack.rewind();
                  this.atkAnim = true;
                  this.accel.x = 0;

                  if (this.timeAttack == false) {
                    this.timeAttack = true;
                    this.timeATKStart = performance.now();
                  }

                  // Esto sirve para decir donde atacar. Sirve para no girar de repente cuando está detrás
                  // del personaje
                  if (this.distX(ig.game.player) <= 0) {
                    // Va a la izquierda
                    this.flip = false;

                    // Va a la derecha
                  } else {
                    this.flip = true;
                  }
                }
              }

              if (timeATKDiff < 3 && this.atkAnim == false) {
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
              }

              // Hace la animación
              if (this.atkAnim == true) {
                this.accel.x = 0;
                this.currentAnim = this.anims.attack;
              }
            }

            // El jugador está a una distancia mayor que la de rango ataque
          } else {
            // Si aún está en ataque, ataca (animación)
            if (this.atkAnim == true) {
              this.currentAnim = this.anims.attack;

              // Si no está atacando, patrulla
            } else {
              // Se mueve en la dirección indicada
              xdir = this.flip ? -1 : 1;
              this.accel.x = 60 * xdir;
              this.currentAnim = this.anims.walk;
            }
          }

          if (this.timeDamaged == true) {
            this.timeEnd = performance.now();
            timeDiff = this.timeEnd - this.timeStart; //in ms
            // strip the ms
            timeDiff /= 1000;

            // Si ha pasado 3 segundos, es invencible
            if (timeDiff > 3 && timeDiff < 5) {
              this.invincible = true;
            } else if (timeDiff > 5) {
              this.invincible = false;
              this.damaged = false;
              this.timeDamaged = false;
            } else if (timeDiff < 3) {
              this.currentAnim = this.anims.damaged;
            }
          }

          // -------------------------------------------------------------------------------------
          // Animaciones
          if (this.currentAnim == this.anims.idle) {
            this.currentAnim.flip.x = this.flip;

            if (this.flip == true) {
              this.offset.x = 144;
            } else {
              this.offset.x = 26;
            }
          } else if (this.currentAnim == this.anims.walk) {
            this.currentAnim.flip.x = this.flip;

            if (this.flip == true) {
              this.offset.x = 144;
            } else {
              this.offset.x = 26;
            }

            // Hay que ver para que cuando ataque se quede en esa dirección por un tiempo
          } else if (this.currentAnim == this.anims.attack) {
            this.currentAnim.flip.x = this.flip;

            if (this.currentAnim.frame == 0 && this.soundReload == false) {
              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Enemies/archerReload.ogg",
                false
              );
              soundEffect.play();
              this.soundReload = true;
            } else {
              this.soundReload = false;
            }

            if (this.currentAnim.frame == 4) {
              if (this.flip == true) {
                this.offset.x = 144;
              } else {
                this.offset.x = 26;
              }

              if (this.attacking == false) {
                soundEffect = new ig.Sound(
                  "./media/SoundEffects/Pixabay/Enemies/archerAttack.ogg",
                  false
                );
                soundEffect.volume = 0.9;
                soundEffect.play();

                ig.game.spawnEntity(
                  "EntityArcherAttack",
                  this.pos.x,
                  this.pos.y,
                  this.flip
                );
                this.attacking = true;
              }
            } else {
              if (this.flip == true) {
                this.offset.x = 144;
              } else {
                this.offset.x = 26;
              }

              // Terminó la animación de ataque
              if (this.currentAnim.frame == 6) {
                this.atkAnim = false;
                this.attacking = false;
              }
            }
          } else if (this.currentAnim == this.anims.atkCD) {
            if (this.flip == true) {
              this.offset.x = 147;
            } else {
              this.offset.x = 24;
            }

            this.currentAnim.flip.x = this.flip;
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
                "./media/SoundEffects/Pixabay/Enemies/archerDeath.ogg",
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
                this.offset.x = 144;
              } else {
                this.offset.x = 26;
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
            other.receiveDamage(3, this);
            other.damaged = true;

            if (other.health > 0) {
              soundEffect = new ig.Sound(
                "./media/SoundEffects/Pixabay/Player/playerHurt.ogg",
                false
              );
              soundEffect.play();
            } else if (other.health <= 0) {
              try {
                ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health5;
              } catch (error) {
                console.log(error);
              }
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
