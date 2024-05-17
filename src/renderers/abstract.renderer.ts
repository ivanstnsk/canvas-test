import Manager from "../managers/abstract.manager";

export default abstract class Renderer<T extends Manager> {
  protected _canvas: HTMLCanvasElement | null = null;
  protected _manager: T | null = null;

  constructor(manager: T) {
    this._manager = manager;
  }

  public init(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  public resize() {
    if (!this._canvas) {
      return;
    }

    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    if (!this._manager) {
      return;
    }

    this._manager.resize();
  }

  public abstract render(): void;
}
