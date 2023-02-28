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
      cont: 0,
      title: new ig.Image("media/dialog.png"),

      text: "Good morning Hero.\n" +
      "I was waiting for you. A wicked wizard has arrived in our kingdom.\n"+
      "As you can see the streets are infested with his minions.\n"+
      "Help us finish with this evil wizard and his minions.\n"+
      "Good luck hero.",
      currentText: '',



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
        
        if (this.currentText.length < this.text.length) {
          this.currentText = this.text.substring(0, this.currentText.length + 1);
          setTimeout(this.update.bind(this), 100); // Ajusta este valor para controlar la velocidad del mecanografiado.
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
              this.currentText,
              ig.system.width / 2,
              175,
              ig.Font.ALIGN.CENTER
            );
        }
      }
    });
  });
