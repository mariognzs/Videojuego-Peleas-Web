ig.module("game.entities.magePrueba")
  .requires("impact.entity")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityMagePrueba = ig.Entity.extend({
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
        this.addAnim("attack1", 0.17, [17]);
        this.addAnim("attack2", 0.17, [18]);
        this.addAnim("attack3", 0.17, [19]);
        this.addAnim("damaged", 0.18, [23, 31, 2]);
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
        if (this.distanceTo(ig.game.player) < 115) {
          // Va a la derecha
          if (this.distX(ig.game.player) <= 0) {
            // Va a la izquierda
            this.flip = false;

            // Va a la derecha
          } else {
            this.flip = true;
          }
        }

        if (this.transforming != false) {
          this.currentAnim = this.anims.transform;
          this.currentAnim.flip.x = this.flip;

          if (this.currentAnim.loopCount > 0) {
            this.transforming = true;
          }
        } else {
          // this.currentAnim = this.anims.idle;

          if (this.currentAnim == this.anims.idle) {
            this.size.x = 26;

            if (this.flip == true) {
              this.offset.x = 32;
            } else {
              this.offset.x = 3;
            }
          }

          // this.currentAnim = this.anims.walk;

          this.size.x = 32;
          if (this.currentAnim == this.anims.walk) {
            if (this.flip == true) {
              this.offset.x = 10;
            } else {
              this.offset.x = 20;
            }
          }

          this.currentAnim = this.anims.attack1;
          this.currentAnim.flip.x = this.flip;

          // 17 - 19 (1 al 3 en frames)
          this.size.x = 26;
          this.pos.x += 1;
          if (this.flip == true) {
            this.offset.x = 30;
          } else {
            this.offset.x = 5;
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