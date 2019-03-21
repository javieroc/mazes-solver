const config = {
  width: 960,
  height: 640,
  parent: "container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [PlayGame]
};

new Phaser.Game(config);
