import { useEffect, useRef, useState } from "react";
import "./App.css";

import ParticlesManager from "./managers/particles.manager";
import ParticlesRenderer from "./renderers/particles.renderer";

type Mode = "auto" | "click";

const managers = [new ParticlesManager()];
const renderers = [new ParticlesRenderer(managers[0])];
let timer: number | null = null;

const resize = () => {
  renderers.forEach((renderer) => renderer.resize());
};

const click = (e: MouseEvent) => {
  const x = e.clientX;
  const y = e.clientY;
  managers.forEach((manager) => manager.click(x, y));
};

const render = () => {
  managers.forEach((manager) => manager.update());
  renderers.forEach((renderer) => renderer.render());

  requestAnimationFrame(render);
};

function App() {
  const [mode, setMode] = useState<Mode>("auto");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    document.addEventListener("resize", resize);
    canvas.addEventListener("click", click);

    renderers.forEach((renderer) => renderer.init(canvas));
    managers.forEach((manager) => manager.init());

    resize();
    render();

    return () => {
      document.removeEventListener("resize", resize);
      canvas.removeEventListener("click", click);
    };
  }, []);

  useEffect(() => {
    if (mode === "auto") {
      if (timer) {
        clearInterval(timer);
      }

      timer = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        managers.forEach((manager) => manager.click(x, y));
      }, 1000 / 10);
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }
  }, [mode]);

  return (
    <div className="wrapper">
      <canvas ref={canvasRef} id="canvas" className="canvas"></canvas>
      <div className="controls">
        <button
          onClick={() => setMode("click")}
          className={mode === "click" ? "active" : ""}
        >
          Click
        </button>
        <button
          onClick={() => setMode("auto")}
          className={mode === "auto" ? "active" : ""}
        >
          Auto
        </button>
      </div>
      {mode === "click" && <div className="info">Click Somewhere</div>}
    </div>
  );
}

export default App;
