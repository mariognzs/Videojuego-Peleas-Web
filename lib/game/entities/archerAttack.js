ig.module("game.entities.archerAttack")
  .requires("impact.entity")
  .defines(function () {
    EntityArcherAttack = ig.Entity.extend({
      size: { x: 18, y: 5 }, //a small box
      vel: { x: 100, y: 0 }, //move very fast
      offset: { x: 30, y: 54 },
      bounciness: 0, //don't bounce
      gravityFactor: 0,
      lifetime: 0, //counter to limit the reach of a sword
      damaging: false,

      // how to behave when active collision occurs
      collides: ig.Entity.COLLIDES.PASSIVE,
      checkAgainst: ig.Entity.TYPE.A,

      direction: "right",
      animSheet: new ig.AnimationSheet(
        "media/Enemies/Archer/projectile.png",
        186,
        80
      ),

      // init function
      init: function (x, y, flip) {
        this.parent(x, y, flip);

        this.addAnim("arrow", 0.15, [1]);

        // get the position from the player to start from
        // var player = ig.game.getEntitiesByType(EntityPlayer)[0];
        var posicion = 25;

        if (flip == true) {
          posicion = -25;
          this.offset.x = 138;
          this.direction = "left";
        }

        if (this.direction == "right") {
          this.vel.x = 110;
          this.vel.y = 0;
          this.currentAnim = this.anims.arrow;
          this.currentAnim.flip.x = false;
        } else if (this.direction == "left") {
          this.vel.x = -110;
          this.vel.y = 0;
          this.currentAnim = this.anims.arrow;
          this.currentAnim.flip.x = true;
        }

        this.parent(x + posicion, y, flip); //defaults
      },

      update: function () {
        // a lifetime of 100 fps else kill
        if (this.lifetime <= 150) {
          this.lifetime += 1;
        } else {
          this.kill();
        }
        this.parent(); //defaults
      },

      // Si choca contra la pared, desaparece
      handleMovementTrace: function (res) {
        this.parent(res);

        if (res.tile.x == 1) {
          this.kill();
        }
      },

      check: function (other) {
        var soundEffect;

        if (this.damaging == false && other.invincible == false) {
          // soundEffect.play();
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

        this.kill(); // but only give damage once
        this.parent();
      },
    });
  });
