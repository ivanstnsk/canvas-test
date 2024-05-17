import ParticlesManager from "../managers/particles.manager";
import Particle from "../utils/abstract.particle";
import Renderer from "./abstract.renderer";

export default class ParticlesRenderer extends Renderer<ParticlesManager> {
  public render(): void {
    if (!this._canvas) {
      return;
    }
    const ctx = this._canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    if (!this._manager) {
      return;
    }

    const particles: Particle[] = this._manager.getParticles();
    console.log(particles);

    particles
      .sort((p1, p2) => p1.pos.z - p2.pos.z)
      .forEach((particle) => {
        const percent = particle.pos.z / 100;
        const white = percent * 135 > 255 ? 255 : percent * 135;
        const scale = 1 - percent < 0 ? 0 : 1 - percent;
        const r = particle.color.x + white;
        const g = particle.color.y + white;
        const b = particle.color.z + white;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        switch (particle.type) {
          case "circle": {
            ctx.beginPath();
            ctx.moveTo(particle.pos.x, particle.pos.y);
            ctx.arc(
              particle.pos.x,
              particle.pos.y,
              (particle.size / 2) * scale,
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.closePath();
            break;
          }
          case "square": {
            ctx.beginPath();
            ctx.moveTo(
              particle.pos.x - (particle.size / 2) * scale,
              particle.pos.y
            );
            ctx.lineTo(
              particle.pos.x + (particle.size / 2) * scale,
              particle.pos.y
            );
            ctx.lineTo(
              particle.pos.x + (particle.size / 2) * scale,
              particle.pos.y + particle.size * scale
            );
            ctx.lineTo(
              particle.pos.x - (particle.size / 2) * scale,
              particle.pos.y + particle.size * scale
            );
            ctx.lineTo(
              particle.pos.x - (particle.size / 2) * scale,
              particle.pos.y
            );
            ctx.fill();
            // ctx.moveTo(particle.pos.x, particle.pos.y);
            // ctx.lineTo(particle.target.x, particle.target.y);
            // ctx.stroke();
            ctx.closePath();
            break;
          }
        }
      });
  }
}
