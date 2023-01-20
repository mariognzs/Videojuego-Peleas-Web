ig.module("game.entities.barrerKnightAttack")
  .requires("impact.entity")
  .defines(function () {
    EntityBarrerKnightAttack = ig.Entity.extend({
      size: { x: 19, y: 20 }, //a small box
      vel: { x: 0, y: 0 }, //move very fast
      offset: { x: 55, y: 0 },
      bounciness: 0, //don't bounce
      lifetime: 0, //counter to limit the reach of a sword
      // how to behave when active collision occurs
      collides: ig.Entity.COLLIDES.PASSIVE,
      checkAgainst: ig.Entity.TYPE.A,

      // init function
      init: function (x, y, flip) {
        // get the position from the player to start from
        // var player = ig.game.getEntitiesByType(EntityPlayer)[0];
        var posicion = 21;

        if (flip == true) {
          posicion = -39;
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
        var sound;
        var soundEffect;
        sound = Math.floor(Math.random() * 3);

        other.receiveDamage(45, this); // give damage when there is a hit
        other.damaged = true;

        switch (sound) {
          case 0:
            soundEffect = new ig.Sound( './media/SoundEffects/SwordStrike1.ogg' );
            soundEffect.play();
            break;

          case 1:
            soundEffect = new ig.Sound( './media/SoundEffects/SwordStrike2.ogg' );
            soundEffect.play();
            break;

          case 3:
            soundEffect = new ig.Sound( './media/SoundEffects/SwordStrike3.ogg' );
            soundEffect.play();
            break;

          default:
            break;
        }
        this.kill(); // but only give damage once
        this.parent();
      }
    });
  });