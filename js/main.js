var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var screenWidth = 500;
if (document.documentElement.scrollWidth < 500)
  screenWidth = document.documentElement.scrollWidth - 30;
var screenHeight = document.documentElement.scrollHeight - 30;
if (document.documentElement.scrollHeight > 1230) screenHeight = 1200;
canvas.width = screenWidth;
canvas.height = screenHeight;
canvas.style =
  "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid blue; background: linear-gradient(#3f36fe, #affaec);";
document.body.appendChild(canvas);
window.addEventListener("keydown", this.keydown, false);
window.addEventListener("keyup", this.keyup, false);
window.addEventListener("touchstart", this.touchStarted);
window.addEventListener("touchcancel", this.touchCanceled);
window.addEventListener("touchend", this.touchCanceled);

var keycode;
const gravity = 0.35;
var leftKeyDown = false;
var rightKeyDown = false;
var end = false;
var lowest = 0;
var total = 0;

var score = 0;
var difficulty = 0;
var lvl = 12;

var platforms = [];
var platformGo = new platform();

window.onload = function () {};

function restart() {
  platforms = [];
  lowest = 0;
  difficulty = 0;
  score = 0;
  lvl = 12;
  total = 0;
  robot.bootsJumpCount = 0;
  robot.shieldJumpCount = 0;
  robot.velocityForX = 7;
  robot.velocityForY = 0;

  platforms.push(new platform());
  platforms[0].x = 250;
  platforms[0].y = 650;
  platforms[0].monster = 0;
  platforms[0].type = 0;
  platforms[0].powerup = 0;

  platformGo.platformsSet();

  robot.x = 250;
  robot.y = 500;

  end = false;
}

function keydown(e) {
  if (e.code == "ArrowLeft" || e.code == "KeyA") {
    leftKeyDown = true;
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    rightKeyDown = true;
  }

  if (e.code === "Space" && end) {
    restart();
  }
}

function keyup(e) {
  if (e.code == "ArrowLeft" || e.code == "KeyA") {
    leftKeyDown = false;
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    rightKeyDown = false;
  }
}

function touchStarted(e) {
  if (!end) {
    if (e.touches[0].clientX < window.innerWidth / 2) {
      leftKeyDown = true;
    } else if (e.touches[0].clientX >= window.innerWidth / 2) {
      rightKeyDown = true;
    }
  } else {
    restart();
  }
}

function touchCanceled() {
  leftKeyDown = false;
  rightKeyDown = false;
}

function showScore() {
  if (total > score) {
    score = Math.round(total);
  }

  context.font = "36px Arial";
  context.fillStyle = "black";
  context.textAlign = "left";
  context.fillText(score, 15, 40);
}

platforms.push(new platform());
platforms[0].x = 250;
platforms[0].y = 650;
platforms[0].monster = 0;
platforms[0].type = 0;
platforms[0].powerup = 0;

platformGo.platformsSet();

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i] !== 0) {
      platforms[i].update();
      platforms[i].draw();
    }
  }

  if (!end) {
    robot.velocityForY += gravity;
    if (robot.y <= screen.height / 2 - 200 && robot.velocityForY <= 0) {
      for (var i = 0; i < platforms.length; i++) {
        platforms[i].y -= robot.velocityForY;
      }
    } else {
      robot.y += robot.velocityForY;
    }
    total -= robot.velocityForY;
  } else {
    context.font = "60px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("You Died!", screenWidth / 2, screenHeight / 2);
    context.font = "36px Arial";
    context.fillText(
      "Press SPACE to restart",
      screenWidth / 2,
      screenHeight / 2 + 50
    );
  }

  if (leftKeyDown) {
    robot.x -= robot.velocityForX;
    if (robot.x <= -robot.width) {
      robot.x = screenWidth;
    }
  }
  if (rightKeyDown) {
    robot.x += robot.velocityForX;
    if (robot.x >= screenWidth) {
      robot.x = -robot.width;
    }
  }

  for (var i = 0; i < platforms.length; i++) {
    if (robot.velocityForY >= 0) {
      if (robot.onPlatform(robot, platforms[i])) {
        if (platforms[i].type === "break") {
          platforms[i] = 0;
        } else if (platforms[i].monster !== 0) {
          robot.jump(platforms[i].powerup, platforms[i].type);
          platforms[i] = 0;
        } else {
          robot.jump(platforms[i].powerup, platforms[i].type);
        }
      }
    }
    if (robot.y > platforms[i].y) {
      if (platforms[i].monster !== 0 && robot.shieldJumpCount <= 0) {
        if (robot.touchMonster(robot, platforms[i])) {
          end = true;
        }
      }
    }
  }

  for (var i = platforms.length - 1; i > 0; i--) {
    if (platforms[i].y > screenHeight) {
      lowest = i + 1;
      break;
    }
  }

  if (robot.y >= screenHeight) {
    end = true;
  }

  if (lowest >= 45) {
    if (difficulty < 6) {
      difficulty += 1;
    }
    platformGo.platformsSet();
  }

  robot.draw();
  showScore();
  context.fill();
}

update();
