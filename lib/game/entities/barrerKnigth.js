ig.module("game.entities.barrerKnigth")
  .requires("impact.entity")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityBarrerKnigth = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x:20, y: 23 },
      offset: { x: 38, y: 25 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 100, y: 150 },
      friction: { x: 600, y: 0 },

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet(
        "media/Enemies/BarrelKnight/BarrerKnight.png",
        156,
        64
      ),

      checkAgainst: ig.Entity.TYPE.A,

      check: function (other) {
        // If the only entity with the type A is the player, we can safely
        // assume here that 'other' is always the player entity.

        // You can always do some further checks here.

        // give the player some damage on collision:
        other.pos.x = 62;
        other.pos.y = 107;
      },

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 1, [30, 31, 32]);
        this.addAnim("walk", 0.1, [42, 43, 44, 45, 46, 47, 48]);
        this.addAnim(
          "attack",
          0.17,
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        );
        this.addAnim("dead", 0.2, [14, 15, 16, 17, 18, 19]);
        this.addAnim("damaged", 0.18, [28, 29]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();

        var xdir = this.flip ? -1 : 1;
        this.accel.x = 60 * xdir;

        this.currentAnim.flip.x = this.flip;

        // Cambia posición de la hitbox dependiendo del movimiento del enemigo
        if(this.flip == true) {
          this.offset.x = 100;
        } else {
          this.offset.x = 38;
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

      kill: function () {
        // reset the player position instead of destroying it
        this.pos.x = 64;
        this.pos.y = 144;
      },
    });
  });
