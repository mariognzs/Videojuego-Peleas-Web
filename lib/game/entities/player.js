ig.module("game.entities.player")
  .requires("impact.entity", "game.entities.playerAttack")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityPlayer = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.A,
      size: { x: 13, y: 22 },
      offset: { x: 55, y: 10 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 80, y: 120 },
      friction: { x: 600, y: 0 },
      health: 50,
      tiempoAttack: 0,
      attacking: false,
      damaged: false,
      dmgCountDown: 0,
      invincible: false,
      dead: false,

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet("media/Player/player.png", 126, 39),
      collides: ig.Entity.COLLIDES.PASSIVE,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.15, [19, 20, 21, 22, 23]);
        this.addAnim("run", 0.1, [24, 25, 26, 27, 28, 29, 30, 31]);
        this.addAnim("attack", 0.17, [0, 1, 2, 3]);
        this.addAnim("attack2", 0.17, [4, 5, 6, 7]);
        this.addAnim("damaged", 0.2, [17, 18, 17, 18]);
        this.addAnim("dead", 0.2, [11, 12, 13, 14, 15]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        var fastAttack = new ig.Sound("./media/SoundEffects/FastAttack.ogg");
        var fastAttack2 = new ig.Sound("./media/SoundEffects/FastAttack2.ogg");

        // Si es dañado, te empuja para atrás si no eres invencible
        if (
          this.damaged == true &&
          this.invincible == false &&
          this.health > 0
        ) {
          this.size = { x: 0, y: 0 };
          // this.offset = { x: 55, y: 30 }; (Tal vez para esquivar, uso futuro)
          this.accel.x = 0;

          // El jugador sale disparado arriba por unos segundos (lo ideal es entre lo que tarda en dejar de
          // ser invencible)
          if (this.flip == true) {
            this.vel.x = this.maxVel.x;
          } else {
            this.vel.x = -this.maxVel.x;
          }

          // Te manda al aire (knockback)
          this.vel.y = -this.maxVel.y;

          // Si alcanza el tiempo indicado, deja de ser invencible y puede ser herido de nuevo
          if (this.dmgCountDown > 15) {
            this.damaged = false;
            this.size = { x: 15, y: 22 };
            this.invincible = true;
          }

          this.dmgCountDown++;
        } else if (this.health > 0) {
          if (ig.input.state("left")) {
            this.accel.x = -this.speed;
            this.flip = true;
            this.offset.x = 52;
          } else if (ig.input.state("right")) {
            this.accel.x = this.speed;
            this.flip = false;
            this.offset.x = 61;
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
            this.currentAnim != this.anims.dead
          ) {
            //
            if (
              ig.input.pressed("attack") &&
              this.tiempoAttack <= 0 &&
              this.health > 0
            ) {
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
              this.tiempoAttack < 200 &&
              this.health > 0
            ) {
              ig.game.spawnEntity(
                "EntityPlayerAttack",
                this.pos.x,
                this.pos.y,
                this.flip
              );
              this.currentAnim = this.anims.attack2.rewind();
              fastAttack2.play();
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
            if (this.vel.x == 0) {
              this.currentAnim = this.anims.idle;

              if (this.flip == true) {
                this.offset.x = 53;
              } else {
                this.offset.x = 61;
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

            // Solo le pueden volver a atacar cuando el dmgCountDown es 0
            if (
              this.dmgCountDown < 100 &&
              this.dmgCountDown >= 15 &&
              this.currentAnim != this.anims.attack &&
              this.currentAnim != this.anims.attack2 &&
              this.currentAnim != this.anims.dead
            ) {
              this.dmgCountDown++;
              this.currentAnim = this.anims.damaged;
            } else {
              this.dmgCountDown = 0;
              this.invincible = false;
            }
          }

          if (
            this.currentAnim == this.anims.attack ||
            this.currentAnim == this.anims.attack2
          ) {
            if (this.dmgCountDown < 100 && this.dmgCountDown >= 15) {
              this.dmgCountDown++;
            } else {
              this.dmgCountDown = 0;
              this.invincible = false;
            }
          }
        }

        if (this.health <= 0 && this.currentAnim != this.anims.dead) {
          this.currentAnim = this.anims.dead.rewind();
          this.accel.x = 0;
          this.collides = ig.Entity.COLLIDES.NEVER;
        } else if (this.health <= 0 && this.currentAnim == this.anims.dead) {
          if (this.currentAnim.loopCount) {
            this.dead = true;
            this.kill();
          }
        }
      },

      // Si no hay método kill, entonces hace su por defecto que es destruir la entidad
      kill: function () {
        if (this.dead == true) {
          ig.game.removeEntity(this);
        }
      },
    });
  });
