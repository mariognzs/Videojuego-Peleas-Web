ig.module("game.entities.bossMageAttack")
  .requires("impact.entity")
  .defines(function () {
    EntityBossMageAttack = ig.Entity.extend({
      size: { x: 70, y: 142 }, //a small box
      vel: { x: 0, y: 0 }, //move very fast
      offset: { x: 55, y: 0 },
      bounciness: 0, //don't bounce
      lifetime: 0, //counter to limit the reach of a sword
      damaging: false,

      // how to behave when active collision occurs
      collides: ig.Entity.COLLIDES.NEVER,
      checkAgainst: ig.Entity.TYPE.A,

      direction: "right",
      animSheet: new ig.AnimationSheet(
        "media/Enemies/EvilWizard/WizardAttack.png",
        160,
        141
      ),

      // init function
      init: function (x, y, flip) {
        // get the position from the player to start from
        // var player = ig.game.getEntitiesByType(EntityPlayer)[0];
        this.addAnim("mageAtk", 0.2, [0, 1, 2], true);

        var posicion = 24;
        this.offset.x = 92;

        if (flip == true) {
          posicion = -68;
          this.offset.x = 0;
        }

        // Hay que mirar que no cambie de direccion al girar el personaje
        if (flip == true) {
          this.currentAnim.flip.x = true;
        } else {
          this.currentAnim.flip.x = false;
        }

        this.parent(x + posicion, y - 35, flip); //defaults
      },

      update: function () {
        if (this.currentAnim.loopCount > 0) {
          this.currentAnim.stop;
          this.kill();
        }

        this.parent(); //defaults
      },

      check: function (other) {
        var soundEffect;

        // soundEffect = new ig.Sound("./media/SoundEffects/SwordStrike2.ogg");

        if (this.damaging == false && other.invincible == false) {
          // soundEffect.play();
          other.receiveDamage(5, this); // give damage when there is a hit
          other.damaged = true;
          this.damaging = true;
        }

        //this.kill(); // but only give damage once
        this.parent();
      },
    });
  });
