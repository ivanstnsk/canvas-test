import Particle from "./abstract.particle";
import Vector3D from "./vector";

export default class SquareParticle extends Particle {
  constructor(
    pos: Vector3D,
    size: number,
    color: Vector3D,
    speed: number,
    angle: number,
    rotation: number,
    rotateAngle: number,
    target: Vector3D
  ) {
    super(
      "square",
      pos,
      size,
      color,
      speed,
      angle,
      rotation,
      rotateAngle,
      target
    );
  }
}
