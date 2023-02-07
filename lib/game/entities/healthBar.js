//576 x 288, 32 bits -> resolucion imagen -> 96 x 96 cada sprite
//animaciones -> (0-3), (3-7), (7-11), (11-15), (15-19)

//      animSheet: new ig.AnimationSheet("media/HealthBar/HealthBar.png", 96, 96),

// // Añade animaciones para la hoja de animación
// this.addAnim("life1", 0.15, [0, 1, 2, 3]);
// this.addAnim("life2", 0.1, [3, 4, 5, 6, 7]);
// this.addAnim("life3", 0.17, [7, 8, 9, 10, 11]);
// this.addAnim("life4", 0.17, [11, 12, 13, 14, 15]);
// this.addAnim("life5", 0.2, [15, 16, 17, 18, 19]);

ig.module("game.entities.healthBar")
  .requires("impact.entity","game.entities.player"  
  )
  .defines(function () {
    EntityHealthBar = ig.Entity.extend({
      size: { x: 100, y: 20 },
      pos: { x: 10, y: 10 },
      maxLife: 100,
      gravityFactor: 0,
      player: null,

      currentLife: 100,
      animSheet: new ig.AnimationSheet("media/HealthBar/HealthBar.png", 96, 96),
      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim("life1", 0.4, [0, 1, 2, 3]);
        this.addAnim("life2", 0.4, [3, 4, 5, 6]);
        this.addAnim("life3", 0.4, [6, 7, 8, 9]);
        this.addAnim("life4", 0.4, [9, 10, 11, 12, 13]);
        this.addAnim("life5", 0.4, [13, 14, 15, 16, 17]);
        this.addAnim("health1", 0.1, [0]);
        this.addAnim("health2", 0.1, [3]);
        this.addAnim("health3", 0.1, [6]);
        this.addAnim("health4", 0.1, [9]);
        this.addAnim("health5", 0.1, [13]);
        this.addAnim("health6", 0.1, [17]);
        
      },

      update: function () {
        this.player = EntityPlayer;
        //VIDA
        if (this.player.health < 50) {
          this.healtBar.currentAnim = this.healtBar.anims.life1;
          //this.healtBar.currentAnim = this.healtBar.anims.health4;

          if (this.healtBar.currentAnim == this.healtBar.anims.life1) {
            if (this.healtBar.currentAnim.loopCount) {
              //Shot has played through all the way. Go to idle animation
              this.healtBar.currentAnim = this.healtBar.anims.health2;
            }
          }
        }
        if (this.player.health < 40) {
          this.healtBar.currentAnim = this.healtBar.anims.life2;
          //this.healtBar.currentAnim = this.healtBar.anims.health4;

          if (this.healtBar.currentAnim == this.healtBar.anims.life2) {
            if (this.healtBar.currentAnim.loopCount) {
              //Shot has played through all the way. Go to idle animation
              this.healtBar.currentAnim = this.healtBar.anims.health3;
            }
          }
        }
        if (this.player.health < 30) {
          this.healtBar.currentAnim = this.healtBar.anims.life3;
          //this.healtBar.currentAnim = this.healtBar.anims.health4;

          if (this.healtBar.currentAnim == this.healtBar.anims.life3) {
            if (this.healtBar.currentAnim.loopCount) {
              //Shot has played through all the way. Go to idle animation
              this.healtBar.currentAnim = this.healtBar.anims.health4;
            }
          }
        }
        if (this.player.health < 20) {
          this.healtBar.currentAnim = this.healtBar.anims.life4;
          //this.healtBar.currentAnim = this.healtBar.anims.health4;

          if (this.healtBar.currentAnim == this.healtBar.anims.life4) {
            if (this.healtBar.currentAnim.loopCount) {
              //Shot has played through all the way. Go to idle animation
              this.healtBar.currentAnim = this.healtBar.anims.health5;
            }
          }
        }
        if (this.player.health < 10) {
          this.healtBar.currentAnim = this.healtBar.anims.life5;
          //this.healtBar.currentAnim = this.healtBar.anims.health4;

          if (this.healtBar.currentAnim == this.healtBar.anims.life5) {
            if (this.healtBar.currentAnim.loopCount) {
              //Shot has played through all the way. Go to idle animation
              this.healtBar.currentAnim = this.healtBar.anims.health6;
            }
          }
        }
      },
    });
  });
