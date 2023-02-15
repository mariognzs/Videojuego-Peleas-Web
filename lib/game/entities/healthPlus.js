ig.module("game.entities.healthPlus")
  .requires("impact.entity", "game.entities.player")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityHealthPlus = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 14.2, y: 13 },
      offset: { x: 7.2, y: 8 },
      gravityFactor: 0,
      maxVel: { x: 75, y: 150 },
      friction: { x: 600, y: 0 },

      speed: 150,
      jump_speed: -600,

      animSheet: new ig.AnimationSheet("media/Items/heart.png", 28.5, 28.5),

      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.2, [0, 1, 2, 3]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        this.currentAnim = this.anims.idle;
      },

      check: function (other) {
        if (other instanceof EntityPlayer) {
          other.health += 10;

          // VIDA (Barra)
          if (other.health > 40) {
            // Para que muestre la barra completa si es mayor de 40 de vida
            ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health1;
          } else if (other.health > 30 && other.health <= 40) {
            // Si es menor de 40 pero mayor de 30 entonces lo pone a 4 vidas
            ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health2;
          } else if (other.health > 20 && other.health <= 30) {
            ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health3;
          } else if (other.health > 10 && other.health <= 20) {
            ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health4;
          } else if (other.health > 0 && other.health <= 10) {
            ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health5;
          }

          this.kill();
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
    });
  });
