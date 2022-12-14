ig.module("game.levels.level_1")
  .requires("impact.image", "game.entities.player")
  .defines(function () {
    LevelLevel_1 = /*JSON[*/ {
      entities: [],
      layer: [
        {
          name: "fondo__imagen_0",
          width: 60,
          height: 12,
          linkWithCollision: false,
          visible: 1,
          tilesetName: " media/Scenarios/Noche/background_0.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 16,
          foreground: false,
          data: [
            [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1,
              2, 27, 27, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1,
              2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2,
              3, 4, 5, 6,
            ],
            [
              19, 20, 21, 22, 23, 24, 25, 26, 27, 27, 27, 30, 31, 32, 33, 34,
              35, 36, 27, 27, 27, 27, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
              33, 34, 35, 36, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 27, 30,
              31, 32, 33, 34, 35, 36, 19, 20, 21, 22, 23, 24,
            ],
            [
              37, 38, 39, 40, 41, 42, 43, 44, 45, 27, 27, 48, 49, 50, 51, 52,
              53, 54, 27, 27, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
              51, 52, 53, 54, 37, 38, 39, 40, 27, 42, 43, 44, 45, 27, 27, 48,
              49, 50, 51, 52, 53, 54, 37, 38, 39, 40, 41, 42,
            ],
            [
              55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
              71, 72, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
              69, 70, 71, 72, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
              67, 68, 69, 70, 71, 72, 55, 56, 57, 58, 59, 60,
            ],
            [
              73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
              89, 90, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
              87, 88, 89, 90, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
              85, 86, 87, 88, 89, 90, 73, 74, 75, 76, 77, 78,
            ],
            [
              91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
              106, 107, 108, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102,
              103, 104, 105, 106, 107, 108, 91, 92, 93, 94, 95, 96, 97, 98, 99,
              100, 101, 102, 103, 104, 105, 106, 107, 108, 91, 92, 93, 94, 95,
              96,
            ],
            [
              109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121,
              122, 123, 124, 125, 126, 109, 110, 111, 112, 113, 114, 115, 116,
              117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 109, 110, 111,
              112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124,
              125, 126, 109, 110, 111, 112, 113, 114,
            ],
            [
              127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139,
              140, 141, 142, 143, 144, 127, 128, 129, 130, 131, 132, 133, 134,
              135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 127, 128, 129,
              130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142,
              143, 144, 127, 128, 129, 130, 131, 132,
            ],
            [
              145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
              158, 159, 160, 161, 162, 145, 146, 147, 148, 149, 150, 151, 152,
              153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 145, 146, 147,
              148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
              161, 162, 145, 146, 147, 148, 149, 150,
            ],
            [
              163, 164, 147, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
              176, 177, 178, 179, 180, 163, 164, 165, 166, 167, 168, 169, 170,
              171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 163, 164, 165,
              166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
              179, 180, 163, 164, 165, 166, 167, 168,
            ],
            [
              181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,
              194, 195, 196, 197, 198, 181, 182, 183, 184, 185, 186, 187, 188,
              189, 190, 191, 192, 193, 194, 195, 196, 197, 147, 147, 147, 147,
              147, 147, 147, 147, 147, 147, 147, 191, 192, 193, 194, 195, 196,
              197, 198, 181, 182, 183, 184, 185, 186,
            ],
            [
              147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147,
              147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147,
              147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147,
              147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147,
              147, 147, 147, 147, 147, 147, 147, 147,
            ],
          ],
        },
        {
          name: "fondo_imagen_1",
          width: 60,
          height: 12,
          linkWithCollision: false,
          visible: 1,
          tilesetName: " media/Scenarios/Noche/background_1.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 16,
          foreground: false,
          data: [
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 0,
              140, 141, 142, 143, 144, 127, 128, 129, 130, 131, 132, 133, 134,
              135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 127, 128, 129,
              130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142,
              143, 144, 127, 128, 129, 130, 131, 132,
            ],
            [
              145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
              158, 159, 160, 161, 162, 145, 146, 147, 148, 149, 150, 151, 152,
              153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 145, 146, 147,
              148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
              161, 162, 145, 146, 147, 148, 149, 150,
            ],
            [
              163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
              176, 177, 178, 179, 180, 163, 164, 165, 166, 167, 168, 169, 170,
              171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 163, 164, 165,
              166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
              179, 180, 163, 164, 165, 166, 167, 168,
            ],
            [
              181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,
              194, 195, 196, 197, 198, 181, 182, 183, 184, 185, 186, 187, 188,
              189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 181, 182, 183,
              184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196,
              197, 198, 181, 182, 183, 184, 185, 186,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
          ],
        },
        {
          name: "fondo_imagen_2",
          width: 60,
          height: 12,
          linkWithCollision: false,
          visible: 1,
          tilesetName: " media/Scenarios/Noche/background_2.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 16,
          foreground: false,
          data: [
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139,
              140, 141, 142, 143, 144, 127, 128, 129, 130, 131, 132, 133, 134,
              135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 127, 0, 129,
              130, 131, 132, 133, 134, 135, 136, 137, 138, 0, 140, 141, 142,
              143, 144, 127, 128, 129, 130, 131, 132,
            ],
            [
              145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
              158, 159, 160, 161, 162, 145, 146, 147, 148, 149, 150, 151, 152,
              153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 0, 0, 147, 148,
              149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161,
              162, 145, 146, 147, 148, 149, 150,
            ],
            [
              163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
              176, 177, 178, 179, 180, 163, 164, 165, 166, 167, 168, 169, 170,
              171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 163, 164, 165,
              166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
              179, 180, 163, 164, 165, 166, 167, 168,
            ],
            [
              181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,
              194, 195, 196, 197, 198, 181, 182, 183, 184, 185, 186, 187, 188,
              189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 181, 182, 183,
              184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196,
              197, 198, 181, 182, 183, 184, 185, 186,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
          ],
        },
        {
          name: "main",
          width: 60,
          height: 12,
          linkWithCollision: false,
          visible: 1,
          tilesetName: " media/Scenarios/Noche/tileset.png",
          repeat: false,
          preRender: false,
          distance: "1",
          tilesize: 16,
          foreground: false,
          data: [
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 30, 31, 32, 33, 34, 35, 36, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31, 32, 33,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 48, 49, 50, 51, 52, 53, 54, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49, 50, 51,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 66, 67, 68, 69, 70, 71, 72, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 67, 68, 69,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 84, 85, 86, 87, 88, 89, 90, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 85, 86, 87,
            ],
            [
              91, 92, 93, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 92, 93,
              94, 0, 0, 0, 0, 0, 0, 0, 102, 103, 104, 105, 106, 107, 108, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102,
              103, 104, 105,
            ],
            [
              109, 110, 111, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110,
              111, 112, 0, 0, 0, 0, 0, 0, 0, 120, 121, 122, 123, 124, 125, 126,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              120, 121, 122, 123,
            ],
            [
              127, 128, 129, 130, 130, 131, 132, 133, 134, 135, 0, 0, 58, 0, 0,
              0, 127, 128, 129, 130, 0, 0, 0, 98, 99, 100, 0, 138, 139, 140,
              141, 142, 143, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 138, 139, 140, 141,
            ],
            [
              145, 146, 147, 148, 148, 149, 150, 151, 152, 153, 154, 0, 76, 77,
              0, 0, 145, 146, 147, 148, 95, 136, 0, 116, 117, 118, 0, 156, 157,
              158, 159, 160, 161, 162, 0, 0, 74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 149, 150, 151, 152, 153, 155, 156, 156, 157, 158, 159,
            ],
            [
              163, 164, 165, 166, 166, 167, 168, 169, 170, 171, 172, 172, 171,
              171, 171, 173, 174, 167, 168, 169, 170, 165, 180, 167, 168, 169,
              170, 174, 175, 176, 177, 178, 179, 180, 163, 164, 165, 166, 167,
              168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 167, 168, 169,
              170, 171, 173, 174, 174, 168, 169, 170,
            ],
            [
              181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 181, 182, 183,
              184, 185, 186, 187, 188, 189, 190, 181, 182, 183, 184, 185, 186,
              187, 188, 189, 190, 181, 182, 183, 184, 185, 186, 187, 188, 189,
              190, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 181, 182,
              183, 184, 185, 186, 187, 188, 189, 190,
            ],
          ],
        },
        {
          name: "collision",
          width: 60,
          height: 12,
          linkWithCollision: false,
          visible: 1,
          tilesetName: "",
          repeat: false,
          preRender: false,
          distance: 1,
          tilesize: 16,
          foreground: false,
          data: [
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            [
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ],
            [
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ],
          ],
        },
      ],
    } /*]JSON*/;
    LevelLevel_1Resources = [
      new ig.Image(" media/Scenarios/Noche/background_0.png"),
      new ig.Image(" media/Scenarios/Noche/background_1.png"),
      new ig.Image(" media/Scenarios/Noche/background_2.png"),
      new ig.Image(" media/Scenarios/Noche/tileset.png"),
    ];
  });
