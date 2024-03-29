ig.module("game.entities.barrerKnightAttack")
  .requires("impact.entity")
  .defines(function () {
    EntityBarrerKnightAttack = ig.Entity.extend({
      size: { x: 18, y: 20 }, //a small box
      vel: { x: 0, y: 0 }, //move very fast
      offset: { x: 55, y: 0 },
      bounciness: 0, //don't bounce
      lifetime: 0, //counter to limit the reach of a sword
      damaging: false,

      // how to behave when active collision occurs
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.NEVER,

      // init function
      init: function (x, y, flip) {
        var posicion = 24;

        if (flip == true) {
          posicion = -26;
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
      },

      check: function (other) {
        var soundEffect;

        if (this.damaging == false && other.invincible == false) {
          other.receiveDamage(5, this); // give damage when there is a hit
          other.damaged = true;
          this.damaging = true;

          if (other.health > 0) {
            soundEffect = new ig.Sound(
              "./media/SoundEffects/Pixabay/Player/playerHurt.ogg",
              false
            );
            soundEffect.play();
          } else if (other.health <= 0) {
            try {
              ig.game.healthBar.currentAnim = ig.game.healthBar.anims.health5;
            } catch (error) {
              console.log(error);
            }
          }
        }

        //this.kill(); // but only give damage once
        this.parent();
      },
    });
  });
