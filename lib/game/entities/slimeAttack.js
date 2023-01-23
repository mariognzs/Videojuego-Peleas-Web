ig.module("game.entities.slimeAttack")
  .requires("impact.entity")
  .defines(function () {
    EntitySlimeAttack = ig.Entity.extend({
      size: { x: 42, y: 20 }, //a small box
      vel: { x: 0, y: 0 }, //move very fast
      offset: { x: 55, y: 0 },
      bounciness: 0, //don't bounce
      lifetime: 0, //counter to limit the reach of a sword
      // how to behave when active collision occurs
      collides: ig.Entity.COLLIDES.PASSIVE,
      checkAgainst: ig.Entity.TYPE.A,

      // init function
      init: function (x, y, flip) {
        var posicion = -12;

        if (flip == true) {
          posicion = -15;
        }

        this.parent(x + posicion, y, flip); //defaults
      },

      update: function () {
        // a lifetime of 100 fps else kill
        if (this.lifetime <= 5) {
          this.lifetime += 1;
        } else {
          this.kill();
        }
        this.parent(); //defaults
      },

      check: function (other) {
        var soundEffect;
        
        soundEffect = new ig.Sound( './media/SoundEffects/SwordStrike2.ogg' );
        soundEffect.play();
        
        other.receiveDamage(5, this); // give damage when there is a hit
        other.damaged = true;

        this.kill(); // but only give damage once
        this.parent();
      }
    });
  });
