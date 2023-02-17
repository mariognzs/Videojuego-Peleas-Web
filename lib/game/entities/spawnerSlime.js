ig.module("game.entities.spawnerSlime")
  .requires("impact.entity", "game.entities.slime2", "game.entities.bossMage")
  .defines(function () {
    // Subclase de ig.Enitity
    EntitySpawnerSlime = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.NONE,
      size: { x: 16, y: 42 },
      offset: { x: 30, y: 14 },
      gravityFactor: 0,
      maxVel: { x: 75, y: 150 },
      friction: { x: 600, y: 0 },
      spawnTimer: 0,
      bossCheck: null,

      speed: 150,
      jump_speed: -600,

      animSheet: new ig.AnimationSheet(
        "media/Enemies/Spawner/spawner.png",
        64,
        72
      ),

      collides: ig.Entity.COLLIDES.NEVER,

      init: function (x, y, settings) {
        // Llama al constructor del padre
        this.parent(x, y, settings);

        // Añade animaciones para la hoja de animación
        this.addAnim("idle", 0.2, [0, 1, 2, 3, 4, 5, 6, 7]);

        try {
          this.bossCheck = ig.game.getEntitiesByType(EntityBossMage)[0];
        } catch (error) {
          console.log(error);
        }
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        this.currentAnim = this.anims.idle;

        if (this.bossCheck != null) {
          if (ig.Timer.timeScale == 1) {
            if (this.bossCheck.health < 220 && this.spawnTimer <= 0) {
              ig.game.spawnEntity("EntitySlime2", this.pos.x, this.pos.y, true);
              // Alrededor de 15 segundos 1000
              this.spawnTimer = 4750;
            } else {
              if (this.bossCheck.health < 220 && this.bossCheck.health > 0) {
                this.spawnTimer--;
              } else if (this.bossCheck.health <= 0) {
                this.kill();
              }
            }
          }
        } else {
          this.kill();
        }
      },

      // Mira distancia del eje X
      distX: function (other) {
        var xd =
          this.pos.x + this.size.x / 2 - (other.pos.x + other.size.x / 2);
        return xd;
      },

      // Mira distancia del eje Y
      distY: function (other) {
        var yd =
          this.pos.y + this.size.y / 2 - (other.pos.y + other.size.y / 2);
        return yd;
      },
    });
  });
