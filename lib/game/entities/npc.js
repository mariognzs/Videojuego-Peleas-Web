ig.module("game.entities.npc")
  .requires("impact.entity")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityNpc = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 12, y: 20 },
      offset: { x: 10, y: 12 },

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet(
        "media/npc/IdleNPC.png",
        32,
        32
      ),
      //186 x 80

      // checkAgainst: ig.Entity.TYPE.A,
      // collides: ig.Entity.COLLIDES.PASSIVE,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.2, [0, 1, 2, 3, 4]);
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
       
      },    

    });
  });
