import { ParticleType } from "./particle";
import Vector3D from "./vector";

export default abstract class Particle {
  protected _type: ParticleType;
  protected _pos: Vector3D;
  protected _size: number;
  protected _color: Vector3D;
  protected _speed: number;
  protected _angle: number;
  protected _rotation: number;
  protected _rotateAngle: number;
  protected _target: Vector3D;

  constructor(
    type: ParticleType,
    pos: Vector3D,
    size: number,
    color: Vector3D,
    speed: number,
    angle: number,
    _rotation: number,
    rotateAngle: number,
    target: Vector3D
  ) {
    this._type = type;
    this._pos = pos;
    this._size = size;
    this._color = color;
    this._speed = speed;
    this._angle = angle;
    this._rotation = _rotation;
    this._rotateAngle = rotateAngle;
    this._target = target;
  }

  public get pos(): Vector3D {
    return this._pos;
  }

  public set pos(value: Vector3D) {
    this._pos = value;
  }

  public get size(): number {
    return this._size;
  }

  public set size(value: number) {
    this._size = value;
  }

  public get color(): Vector3D {
    return this._color;
  }

  public set color(value: Vector3D) {
    this._color = value;
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public get angle(): number {
    return this._angle;
  }

  public set angle(value: number) {
    this._angle = value;
  }

  public get rotation(): number {
    return this._rotation;
  }

  public set rotation(value: number) {
    this._rotation = value;
  }

  public get rotateAngle(): number {
    return this._rotateAngle;
  }

  public set rotateAngle(value: number) {
    this._rotateAngle = value;
  }

  public get type(): ParticleType {
    return this._type;
  }

  public set type(value: ParticleType) {
    this._type = value;
  }

  public get target(): Vector3D {
    return this._target;
  }
}
