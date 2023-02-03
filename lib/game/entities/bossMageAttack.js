ig.module("game.entities.bossMageAttack")
  .requires("impact.entity")
  .defines(function () {
    EntityBossMageAttack = ig.Entity.extend({
      size: { x: 18, y: 20 }, //a small box
      vel: { x: 0, y: 0 }, //move very fast
      offset: { x: 55, y: 0 },
      bounciness: 0, //don't bounce
      lifetime: 0, //counter to limit the reach of a sword

      // how to behave when active collision occurs
      collides: ig.Entity.COLLIDES.PASSIVE,
      checkAgainst: ig.Entity.TYPE.A,

      direction: "right",
      animSheet: new ig.AnimationSheet(
        "media/Enemies/EvilWizard/WizardAttack.png",
        160,
        41
      ),

      // init function
      init: function (x, y, flip) {
        // get the position from the player to start from
        // var player = ig.game.getEntitiesByType(EntityPlayer)[0];  
        this.addAnim("mageAtk", 0.5, [0, 1, 2]);

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
        this.parent(); //defaults
      },

      check: function (other) {
        var soundEffect;

        // soundEffect = new ig.Sound("./media/SoundEffects/SwordStrike2.ogg");
        // soundEffect.play();

        // other.receiveDamage(5, this); // give damage when there is a hit
        // other.damaged = true;

        this.kill(); // but only give damage once
        this.parent();
      },
    });
  });
