ig.module("game.entities.spawnerArcher")
  .requires("impact.entity", "game.entities.archer")
  .defines(function () {
    // Subclase de ig.Enitity
    EntitySpawnerArcher = ig.Entity.extend({
      // Establece las dimensiones y distancias para la colisión
      type: ig.Entity.TYPE.B,
      size: { x: 16, y: 42 },
      offset: { x: 30, y: 14 },
      gravityFactor: 1,
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

        this.bossCheck = ig.game.getEntitiesByType(EntityBossMage)[0];
      },

      // Se llama a este método en cada frame de cada entidad.
      update: function () {
        this.parent();
        this.currentAnim = this.anims.idle;

        if (this.bossCheck.health < 320 && this.spawnTimer <= 0) {
          ig.game.spawnEntity("EntityArcher", this.pos.x, this.pos.y, true);
          // Alrededor de 15 segundos 1000
          this.spawnTimer = 4500;
        } else {
          if (this.bossCheck.health < 50) {
            this.spawnTimer--;
          }
        }

        console.log(this.spawnTimer + " | " + this.bossCheck.health);
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

      kill: function () {},
    });
  });
