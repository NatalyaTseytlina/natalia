import {Component, OnInit} from '@angular/core';
import {Circle} from '../../../model/view/circle';

@Component({
  selector: 'app-discharge',
  templateUrl: './discharge.component.html',
  styleUrls: ['./discharge.component.less']
})
export class DischargeComponent implements OnInit {

  canvas: any;
  ctx: any;
  w: number;
  h: number;

  circles: Circle[];

  circlesCount = 2;
  canvasColor  = '#232332';
  mx           = 0;
  my           = 0;
  toggle       = -1;
  maxLength    = 800;
  stepLength   = 2;
  maxOffset    = 6;

  constructor() { }

  ngOnInit() {
    this.canvas       = document.createElement('canvas');
    this.ctx          = this.canvas.getContext('2d');
    this.w            = this.canvas.width  = window.innerWidth;
    this.h            = this.canvas.height = window.innerHeight;
    this.circles      = [];

    this.canvas.style.background = this.canvasColor;
    document.querySelector('#discharge-container').appendChild(this.canvas);

    this.init();
    this.loop();
  }

  private init() {
    for (let i = 0; i < this.circlesCount; i++) {
      this.circles.push(new Circle(this.w, this.h));
    }

    this.canvas.onmousemove = e => {
      this.mx = e.x - this.canvas.getBoundingClientRect().x;
      this.my = e.y - this.canvas.getBoundingClientRect().y;
    };

    window.onkeydown = () => {
      this.toggle === this.circles.length ? this.toggle = 0 : this.toggle++;
    };
  }

  private loop() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.circles.map((c: Circle) => c === this.circles[this.toggle] ? c.draw(this.ctx, this.mx, this.my) : c.draw(this.ctx));
    this.createLightning();

    requestAnimationFrame(() => {
      this.loop();
    });
  }

  private createLightning() {
    for (let a = 0; a < this.circles.length; a++) {
      for (let b = a + 1; b < this.circles.length; b++) {
        const dist   = this.getDistance(this.circles[a], this.circles[b]);
        const chance = dist / this.maxLength;
        if (chance > Math.random()) { continue; }

        const otherColor = chance * 255;
        const stepsCount = dist / this.stepLength;
        let sx           = this.circles[a].x;
        let sy           = this.circles[a].y;

        this.ctx.lineWidth   = 2.5;
        this.ctx.strokeStyle = `rgb(255, ${otherColor}, ${otherColor})`;

        this.ctx.beginPath();
        this.ctx.moveTo(this.circles[a].x, this.circles[a].y);
        for (let j = stepsCount; j < 1; j--) {
          const pathLength = this.getDistance(this.circles[a], {x: sx, y: sy});
          const offset     = Math.sin(pathLength / dist * Math.PI) * this.maxOffset;

          sx += (this.circles[b].x - sx) / j + Math.random() * offset * 2 - offset;
          sy += (this.circles[b].y - sy) / j + Math.random() * offset * 2 - offset;
          this.ctx.lineTo(sx, sy);
        }
        this.ctx.closePath();
        this.ctx.stroke();

      }
    }
  }

  private getDistance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

}
