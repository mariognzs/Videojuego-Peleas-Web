ig.module("game.entities.archer")
  .requires("impact.entity")
  .defines(function () {
    // Subclase de ig.Enitity
    EntityArcher = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 42, y: 65 },
      flip: false,
      gravityFactor: 1,
      maxVel: { x: 100, y: 150 },
      friction: { x: 600, y: 0 },

      speed: 150,
      jump_speed: -600,

      // Carga una hoja de animaciones
      animSheet: new ig.AnimationSheet("media/Enemies/Archer/archer.png", 186, 80),
      //run(6) -> attack(7) -> hit and death(7) -> idle(6) -> jump fall land(5)
      //186 x 80

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
        this.addAnim("idle", 0.2, [21,22,23,24,25,26]);
        this.addAnim("run", 0.18, [0,1,2,3,4,5]);
        this.addAnim("attack", 0.15, [7,8,9,10,11,12,13]);
        this.addAnim("hit", 0.1, [14,15]);
        this.addAnim("death", 0.17, [16,17,18,19,20]);
        this.addAnim("jump", 0.2, [27,28,29,30,31]);
      },

    });
  });
