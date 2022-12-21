ig.module("game.entities.playerAttack")
  .requires("impact.entity")
  .defines(function () {
    EntityPlayerAttack = ig.Entity.extend({
      size: { x: 39, y: 20 }, //a small box
      vel: { x: 0, y: 0 }, //move very fast
      offset: { x: 55, y: 10 },
      bounciness: 0, //don't bounce
      lifetime: 0, //counter to limit the reach of a sword
      // how to behave when active collision occurs
      collides: ig.Entity.COLLIDES.NEVER,
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.C,

      // init function
      init: function (x, y, flip) {
        // get the position from the player to start from
        // var player = ig.game.getEntitiesByType(EntityPlayer)[0];
        var posicion = 21;
        
        if(flip == true){
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
        other.receiveDamage(100, this); // give damage when there is a hit
        this.kill(); // but only give damage once
        this.parent(); // defaults
      },
    });
  });
