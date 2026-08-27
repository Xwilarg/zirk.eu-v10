import { type RefObject } from "react";
import { AScreen } from "./AScreen";
import { BallsScreen } from "./impl/BallsScreen";
import { ParticleOrbits } from "./impl/ParticleOrbit";
import { Gradient } from "./impl/Gradient";
import { randInt } from "../../utils";

export default function loadScreenSaver(canvasRef: RefObject<HTMLCanvasElement | null>, screenSaverRef: RefObject<AScreen | null>): () => void
{
    const elems = [ParticleOrbits, BallsScreen, Gradient];
    const sc = new elems[randInt(elems.length)](canvasRef.current!);

    screenSaverRef.current = sc;
    const listenerMouseMove = sc.handleMouse.bind(sc);
    const listenerResize = sc.updateBounds.bind(sc);

    document.addEventListener("mousemove", listenerMouseMove);
    window.addEventListener("resize", listenerResize);
    
    const animationFrameId = window.requestAnimationFrame(updateLoop);
    
    return () => {
        document.removeEventListener("mousemove", listenerMouseMove);
        window.removeEventListener("resize", listenerResize);
        window.cancelAnimationFrame(animationFrameId);
    };

    function updateLoop() {
        screenSaverRef.current?.updateCanvas();
        window.requestAnimationFrame(updateLoop);
    }
};