export class Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;

  constructor(w: number, h: number, particleMaxVelocity: number, particleMaxLife: number) {
    this.x         = Math.random() * w;
    this.y         = Math.random() * h;
    this.velocityX = Math.random() * (particleMaxVelocity * 2) - particleMaxVelocity;
    this.velocityY = Math.random() * (particleMaxVelocity * 2) - particleMaxVelocity;
    this.life      = Math.random() * particleMaxLife * 60;
  }

  public reDraw(ctx: any, particleColor: string, particleRadius: number) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = particleColor;
    ctx.fill();
  }

  public position(w: number, h: number) {

    if (this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0) {
      this.velocityX *= -1;
    }

    if (this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0) {
      this.velocityY *= -1;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  public reCalculateLife(w: number, h: number, particleMaxVelocity: number, particleMaxLife: number) {
    if (this.life < 1) {
      this.x         = Math.random() * w;
      this.y         = Math.random() * h;
      this.velocityX = Math.random() * (particleMaxVelocity * 2) - particleMaxVelocity;
      this.velocityY = Math.random() * (particleMaxVelocity * 2) - particleMaxVelocity;
      this.life      = Math.random() * particleMaxLife * 60;
    }
    this.life--;
  }
}
