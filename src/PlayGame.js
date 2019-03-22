class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "assets/map1.json");
    this.load.image("tilesImage", "assets/tiles.gif");
    this.load.spritesheet("player", "assets/jeremy/jeremy-blonde.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.map = this.make.tilemap({
      key: "map"
    });
    const tileSet = this.map.addTilesetImage("tiles", "tilesImage");
    const groundLayer = this.map.createStaticLayer("background", tileSet);
    const blocksLayer = this.map.createStaticLayer("collitions", tileSet);
    blocksLayer.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 100, "player", 1);
    this.physics.add.collider(this.player, blocksLayer);

    this.marker = this.add
      .graphics()
      .lineStyle(3, 0xffffff, 1)
      .strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    //this.input.on("pointerup", () => {});

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [7, 6, 7, 8]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [4, 3, 4, 5]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [10, 9, 10, 11]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 0, 1, 2]
      }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    console.log(blocksLayer.getTileAt(2, 1));
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }

    // Rounds down to nearest tile
    var pointerTileX = this.map.worldToTileX(this.input.mousePointer.x);
    var pointerTileY = this.map.worldToTileY(this.input.mousePointer.y);
    this.marker.x = this.map.tileToWorldX(pointerTileX);
    this.marker.y = this.map.tileToWorldY(pointerTileY);
  }
}
