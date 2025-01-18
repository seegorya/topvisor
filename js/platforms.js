class platform {
  constructor() {
    this.x;
    this.y;
    this.width = 100;
    this.height = 15;
    this.powerup;
    this.type;
    this.img = new Image();
    this.monster;
    this.direction = "right";
    this.moveTime = 10;
    this.speed;
    this.imgaddon = new Image();

    this.draw = function () {
      if (this.type === "break") {
        this.img.src = "img/platform1.png";
      } else if (this.type === "top90") {
        this.img.src = "img/platform2.png";
      } else if (this.type === "top80") {
        this.img.src = "img/platform3.png";
      } else if (this.type === "top70") {
        this.img.src = "img/platform4.png";
      } else if (this.type === "top60") {
        this.img.src = "img/platform5.png";
      } else if (this.type === "top50") {
        this.img.src = "img/platform6.png";
      } else if (this.type === "top40") {
        this.img.src = "img/platform7.png";
      } else if (this.type === "top30") {
        this.img.src = "img/platform8.png";
      } else if (this.type === "top20") {
        this.img.src = "img/platform9.png";
      } else if (this.type === "top10") {
        this.img.src = "img/platform10.png";
      } else if (this.type === "top8") {
        this.img.src = "img/platform11.png";
      } else if (this.type === "top3") {
        this.img.src = "img/platform12.png";
      } else if (this.type === "top1") {
        this.img.src = "img/platform13.png";
      } else {
        this.img.src = "img/platform2.png";
      }

      if (this.monster === 0) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        monsterFunctions[this.monster].draw(this.x, this.y);
      }

      if (this.powerup === "spring") {
        this.imgaddon.src = "img/Addons/spring.png";
        context.drawImage(this.imgaddon, this.x + 40, this.y - 27, 30, 30);
      } else if (this.powerup === "shoes") {
        this.imgaddon.src = "img/Addons/shoes.png";
        context.drawImage(this.imgaddon, this.x + 40, this.y - 30, 30, 30);
      } else if (this.powerup === "shield") {
        this.imgaddon.src = "img/Addons/shield.png";
        context.drawImage(this.imgaddon, this.x + 40, this.y - 22, 20, 20);
      }
    };

    this.update = function () {
      if (this.type === "sideways") {
        //move = this.speed();
        if (this.x >= screenWidth - this.width) {
          this.direction = "left";
        } else if (this.x <= 0) {
          this.direction = "right";
        }

        if (this.direction === "right") {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }
      }

      if (this.monster != 0) {
        if (this.direction === "right") {
          this.x += 1;
          this.moveTime -= 1;

          if (this.moveTime === 0) {
            this.direction = "left";
            this.moveTime = 10;
          }
        } else {
          this.x -= 1;
          this.moveTime -= 1;

          if (this.moveTime === 0) {
            this.direction = "right";
            this.moveTime = 10;
          }
        }
      }
    };

    this.spawnplatform = function () {
      //console.log(lvl);
      var platformChances = {
        break: 15,
        sideways: Math.round(10 / difficulty),
        top90: Math.round(0.5 - (lvl - 12) * 0.025),
        top80: Math.round(0.5 - (lvl - 11) * 0.025),
        top70: Math.round(0.5 - (lvl - 10) * 0.025),
        top60: Math.round(0.5 - (lvl - 9) * 0.025),
        top50: Math.round(0.5 - (lvl - 9) * 0.025),
        top40: Math.round(0.5 - (lvl - 9) * 0.025),
        top30: Math.round(0.5 - (lvl - 8) * 0.025),
        top20: Math.round(0.5 - (lvl - 8) * 0.025),
        top10: Math.round(0.5 - (lvl - 8) * 0.025),
        top8: Math.round(0.5 - (lvl - 5) * 0.025),
        top3: Math.round(0.5 - (lvl - 3) * 0.025),
        top1: Math.round(0.5 - (lvl - 1) * 0.025),
      };

      if (Math.round(Math.random() * platformChances["break"]) === 0) {
        return "break";
      } else if (
        Math.round(Math.random() * platformChances["sideways"]) === 0
      ) {
        //console.log("sideways");
        return "sideways";
      } else if (
        Math.round(Math.random() * platformChances["top90"]) === 0 &&
        difficulty < 2
      ) {
        return "top90";
      } else if (
        Math.round(Math.random() * platformChances["top80"]) === 0 &&
        difficulty < 2
      ) {
        return "top80";
      } else if (
        Math.round(Math.random() * platformChances["top70"]) === 0 &&
        difficulty < 2
      ) {
        return "top70";
      } else if (
        Math.round(Math.random() * platformChances["top60"]) === 0 &&
        difficulty < 3
      ) {
        return "top60";
      } else if (
        Math.round(Math.random() * platformChances["top50"]) === 0 &&
        difficulty < 3
      ) {
        return "top50";
      } else if (
        Math.round(Math.random() * platformChances["top40"]) === 0 &&
        difficulty < 4
      ) {
        return "top40";
      } else if (
        Math.round(Math.random() * platformChances["top30"]) === 0 &&
        difficulty < 4
      ) {
        return "top30";
      } else if (
        Math.round(Math.random() * platformChances["top20"]) === 0 &&
        difficulty < 5
      ) {
        return "top20";
      } else if (
        Math.round(Math.random() * platformChances["top10"]) === 0 &&
        difficulty < 5
      ) {
        return "top10";
      } else if (
        Math.round(Math.random() * platformChances["top8"]) === 0 &&
        difficulty < 6
      ) {
        //console.log(platformChances["top8"]);
        return "top8";
      } else if (
        Math.round(Math.random() * platformChances["top3"]) === 0 &&
        difficulty < 6
      ) {
        return "top3";
      } else if (Math.round(Math.random() * platformChances["top1"]) === 0) {
        return "top1";
      }
      return 0;
    };

    this.platformsSet = function () {
      if (lowest === 0) {
        var i = 1;
      } else {
        var i = lowest;
      }

      for (i; i < lowest + 100; i++) {
        if (i >= platforms.length) {
          platforms.push(new platform());
          platforms[i].type = this.spawnplatform();
          platforms[i].powerup = 0;
          platforms[i].monster = 0;
          platforms[i].speed = Math.floor(Math.random() * 3) + 1;

          if (platforms[i].type != "break") {
            platforms[i].powerup = powerup();

            if (platforms[i].powerup === 0) {
              platforms[i].monster = monster();
            }
          }

          platforms[i].x = Math.random() * (screenWidth - platforms[i].width);
          if (
            platforms[i].type === "break" ||
            platforms[i - 1].type === "break"
          ) {
            platforms[i].y =
              platforms[i - 1].y -
              (Math.random() * (70 + difficulty * 25) + 20) / 2;
          } else {
            platforms[i].y =
              platforms[i - 1].y -
              (Math.random() * (70 + difficulty * 25) + 20);
          }
        }
      }
      lvl -= 1;
      for (var i = 0; i < lowest - 2; i++) {
        platforms.shift();
      }
    };
  }
}
