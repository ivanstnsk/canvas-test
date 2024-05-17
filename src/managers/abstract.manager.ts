export default abstract class Manager {
  protected _time: number = -1;
  protected _delta: number = 0;
  protected _click: number[] | null = null;

  public abstract resize(): void;

  public init(): void {
    this._time = performance.now();
  }

  public click(x: number, y: number): void {
    this._click = [x, y];
  }

  public update(): void {
    const time = performance.now();
    this._delta = time - this._time;
    this._time = time;
  }
}
