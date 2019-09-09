export class Circle {
  x: number;
  y: number;

  constructor(w: number, h: number, x = null, y = null) {
    this.x = x || Math.random() * w;
    this.y = y || Math.random() * h;
  }

  draw(ctx: any, x = null, y = null) {
    this.x = x || this.x;
    this.y = y || this.y;

    ctx.lineWidth   = 1.5;
    ctx.fillStyle   = 'white';
    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 32, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }

}
