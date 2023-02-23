ig.module("game.entities.triggerNPC")
  .requires("impact.entity","impact.font",  'impact.entity',)
  .defines(function () {
    EntityTriggerNPC = ig.Entity.extend({
      size: { x: 16, y: 16 },

      _wmScalable: true,
      _wmDrawBox: true,
      _wmBoxColor: "rgba(135, 0, 0, 0.7)",

      target: null,
      wait: -1,
      waitTimer: null,
      canFire: true,
      checker: false,
      font: new ig.Font("media/04b03.font.png"),


      //type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      //collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        this.parent(x, y, settings);
        ig.input.bind(ig.KEY.E, "dialog");

      },

      check: function (other) {
        if (this.touches(other)) {
            // Si la entidad está tocando el trigger, establece la variable isTouching en true
            this.checker = true;
        }
      },

      update: function () {
        if (EntityTriggerNPC.check !== undefined) {
            // Si la propiedad check está definida, el método check está siendo llamado en cada fotograma
            this.checker = true;
          } else {
            // Si la propiedad check no está definida, el método check no está siendo llamado
            this.checker = false;
        }
      },
      draw: function () {
        if(this.checker == true){
            this.font.draw(
              " - Press E to interact - ",
              ig.system.width / 2,
              175,
              ig.Font.ALIGN.CENTER
            );
        }

      }
    });
  });
