import Particle from "../utils/abstract.particle";
import CircleParticle from "../utils/circle.particle";
import SquareParticle from "../utils/square.particle";
import Vector3D from "../utils/vector";
import Manager from "./abstract.manager";

export default class ParticlesManager extends Manager {
  private _particles: Particle[] = [];

  public resize(): void {
    this._particles = [];
  }

  public update(): void {
    super.update();

    this.addParticles();
    this.updateParticles();
  }

  public getParticles(): Particle[] {
    return this._particles;
  }

  public addParticles(): void {
    if (this._click) {
      const x = this._click[0];
      const y = this._click[1];

      for (let i = 0; i < 50; i += 1) {
        this._particles.push(this.createRandomParticle(x, y));
      }

      this._click = null;
    }
  }

  public updateParticles(): void {
    this._particles.forEach((particle) => {
      const dx = particle.speed * Math.sin(particle.angle);
      const dy = particle.speed * Math.cos(particle.angle);

      particle.pos.x += dx * this._delta;
      particle.pos.y += dy * this._delta;

      particle.pos.z += 0.1 * this._delta;

      if (
        particle.pos.z > 100 ||
        particle.pos.y < 0 ||
        particle.pos.y > window.innerHeight ||
        particle.pos.x < 0 ||
        particle.pos.x > window.innerWidth
      ) {
        this._particles = this._particles.filter((p) => p !== particle);
      }
    });
  }

  private createRandomParticle(x: number, y: number): Particle {
    const type = Math.random() > 0.5 ? "square" : "circle";
    const randomSize = 50;
    const z = 0;
    const randomColor = new Vector3D(
      Math.floor(Math.random() * 120),
      Math.floor(Math.random() * 120),
      Math.floor(Math.random() * 120)
    );
    const randomSpeed = 0.6 * Math.random();
    const randomAngle = Math.random() * Math.PI * 2;
    const randomTarget = new Vector3D(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
      0
    );

    switch (type) {
      case "circle": {
        return new CircleParticle(
          new Vector3D(x, y, z),
          randomSize,
          randomColor,
          randomSpeed,
          randomAngle,
          randomTarget
        );
      }
      case "square": {
        const randomRotateAngle = Math.random() * Math.PI * 2 * 0.001;
        const randomRotation = Math.random() * Math.PI * 2;
        return new SquareParticle(
          new Vector3D(x, y, z),
          randomSize,
          randomColor,
          randomSpeed,
          randomAngle,
          randomRotation,
          randomRotateAngle,
          randomTarget
        );
      }
    }
  }
}
