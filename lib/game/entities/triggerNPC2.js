ig.module("game.entities.triggerNPC2")
  .requires("impact.entity","impact.font",  'impact.entity',)
  .defines(function () {
    EntityTriggerNPC2 = ig.Entity.extend({
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
      cont: 0,
      title: new ig.Image("media/dialog.png"),


      //type: ig.Entity.TYPE.NONE,
      checkAgainst: ig.Entity.TYPE.A,
      //collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        this.parent(x, y, settings);

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
            this.pressE = false;
          }

      },
      draw: function () {
        if(this.checker == true){
          var cx = ig.system.width / 2;
          this.title.draw(cx - this.title.width / 2, 0);
            this.font.draw(
              "Hello again Hero.\n" +
              "As I see you have managed to kill some minioms.\n"+
              "Grab as many hearts as possible as you are about\n to face the evil wizard.\n"+
              "Best of luck in your battle, I hope you get this over with now.\n"+
              "Good luck hero.",
              ig.system.width / 2,
              175,
              ig.Font.ALIGN.CENTER
            );
        }
      }
    });
  });
