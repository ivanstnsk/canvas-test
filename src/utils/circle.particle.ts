import Particle from "./abstract.particle";
import Vector3D from "./vector";

export default class CircleParticle extends Particle {
  constructor(
    pos: Vector3D,
    size: number,
    color: Vector3D,
    speed: number,
    angle: number,
    target: Vector3D
  ) {
    super("circle", pos, size, color, speed, angle, 0, 0, target);
  }
}
