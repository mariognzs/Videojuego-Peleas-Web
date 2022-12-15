ig.module("game.entities.player")
    .requires("impact.entity")
    .defines(function() {
        // Subclase de ig.Enitity
        EntityPlayer = ig.Entity.extend({
            // Establece las dimensiones y distancias para la colisión
            type: ig.Entity.TYPE.A,
            size: { x: 126, y: 39 },
            flip: false,
            gravityFactor: 1,
            maxVel: { x: 100, y: 150 },
            friction: { x: 600, y: 0 },

            speed: 150,
            jump_speed: -600,

            // Carga una hoja de animaciones
            animSheet: new ig.AnimationSheet("media/Player/idle.png", 126, 39),

            init: function(x, y, settings) {
                // Llama al constructor del padre
                this.parent(x, y, settings);

                // Añade animaciones para la hoja de animación
                this.addAnim("idle", 1 [0]);
                this.addAnim('walk', 0.1, [0, 1, 2, 1]);
                this.addAnim('jump', 1, [3]);


            },

            // Se llama a este método en cada frame de cada entidad.
            update: function() {
                this.parent();

                if (ig.input.state("left")) {
                    this.accel.x = -this.speed;
                    this.flip = true;
                } else if (ig.input.state("right")) {
                    this.accel.x = this.speed;
                    this.flip = false;
                } else {
                    this.accel.x = 0;
                }

                if (ig.input.pressed("jump") && this.standing) {
                    this.vel.y = this.jump_speed;
                }

                if (!this.standing) {
                    this.currentAnim = this.anims.jump;
                } else if (this.vel.x == 0) {
                    this.currentAnim = this.anims.idle;
                } else {
                    this.currentAnim = this.anims.walk;
                }

                this.currentAnim.flip.x = this.flip;

                //muertes
                if (this.pos.y > ig.system.height) {
                    //this.kill();
                }

            },

            kill: function() {
                // reset the player position instead of destroying it
                this.pos.x = 64;
                this.pos.y = 144;
            }
        });
    });