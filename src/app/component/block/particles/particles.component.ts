import { Component, OnInit } from '@angular/core';
import {Particle} from '../../../model/view/particle';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.less']
})
export class ParticlesComponent implements OnInit {

  canvas: any;
  ctx: any;
  w: number;
  h: number;
  particles: Particle[];

  properties = {
    bgColor             : 'rgba(28, 33, 40, 0.95)',
    particleColor       : 'rgba(255, 255, 255, 0.8)',
    particleRadius      : 3,
    particleCount       : 60,
    particleMaxVelocity : 0.5,
    lineLength          : 150,
    particleMaxLife     : 6,
  };

  constructor() { }

  ngOnInit() {
    this.canvas    = document.createElement('canvas');
    this.ctx       = this.canvas.getContext('2d');
    this.w         = this.canvas.width  = window.innerWidth;
    this.h         = this.canvas.height = window.innerHeight;
    this.particles = [];

    document.querySelector('#particles-container').appendChild(this.canvas);

    window.onresize = () => {
      this.w = this.canvas.width  = window.innerWidth;
      this.h = this.canvas.height = window.innerHeight;
    };

    this.init();
  }

  private init() {
    for (let i = 0; i < this.properties.particleCount; i++) {
      this.particles.push(new Particle(this.w, this.h, this.properties.particleMaxVelocity, this.properties.particleMaxLife));
    }
    this.loop();
  }

  private loop() {
    this.reDrawBackground();
    this.reDrawParticles();
    this.drawLines();

    requestAnimationFrame(() => {
      this.loop();
    });
  }

  private reDrawBackground() {
    this.ctx.fillStyle = this.properties.bgColor;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  private drawLines() {
    let x1;
    let x2;
    let y1;
    let y2;
    let length;
    let opacity;

    for (const particle1 of this.particles) {
      for (const particle2 of this.particles) {
        x1 = particle1.x;
        y1 = particle1.y;
        x2 = particle2.x;
        y2 = particle2.y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (length < this.properties.lineLength) {
          opacity = 1 - length / this.properties.lineLength;
          this.ctx.lineWidth   = '0,5';
          this.ctx.strokeStyle = this.properties.particleColor;
          this.ctx.globalAlpha = opacity;

          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
  }

  private reDrawParticles() {
    for (const particle of this.particles) {
      particle.reCalculateLife(this.w, this.h, this.properties.particleMaxVelocity, this.properties.particleMaxLife);
      particle.position(this.w, this.h);
      particle.reDraw(this.ctx, this.properties.particleColor, this.properties.particleRadius);
    }
  }

}
