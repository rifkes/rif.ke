import { lerp } from './Grob';

class Player {
  constructor(args) {
    const { ctx, imageRight, imageLeft, width, height } = args;
    this.position = {
      x: 0,
      y: 0,
    }

    this.imageRight = imageRight;
    this.imageLeft = imageLeft;

    this.ctx = ctx;
    this.canvas = ctx.canvas;

    this.overallWidth = width;
    this.width = width;
    this.height = height;

    this.sides = {
      bottom: this.position.y + this.height,
      top: this.position.y,
      left: this.position.x,
      right: this.position.x + this.width,
    };

    this.speed = 0;
    this.upwards = 0;

    this.arrowPressed = 'none';
    this.direction = 'right';

    this.walkFrame = 0;
  }

  draw() {
    if (!this.ctx) return;

    const sx = this.direction === 'right' ?
      Math.floor(this.walkFrame) % 12 * this.width / 12 :
      (11 - Math.floor(this.walkFrame) % 12) * this.width / 12;
    
    const scale = 0.6;

    this.ctx.drawImage(
      this.direction === 'right' ? this.imageRight : this.imageLeft, // image
      sx, // sx
      0, // sy
      this.width / 12, // sWidth
      this.height, // sHeight
      this.position.x - (this.width / 12 - (this.width / 12 * scale)),
      this.position.y + (this.height - this.height * scale),
      this.width / 12 * scale,
      this.height * scale,
    );

    if (this.speed >= 0.1 || this.speed < -0.1 || Math.floor(this.walkFrame) % 6 !== 0) {
      this.walkFrame = this.walkFrame + 0.2;
    }

    if (this.arrowPressed === 'left') {
      this.speed = lerp(this.speed, -6, 0.05);
    } else if (this.arrowPressed === 'right') {
      this.speed = lerp(this.speed, 6, 0.05);
    } else {
      this.speed = lerp(this.speed, 0, 0.1);
    }
    if (this.speed < 0.1 && this.speed > -0.1 && this.arrowPressed === 'none') {
      this.speed = 0;
    }
    this.position.x += this.speed;

    this.update();
  }

  update() {
    if (this.sides.bottom < this.canvas.height) {
      this.position.y++;
      this.sides.bottom = this.position.y + this.height;
    }
  }
}

export default Player;