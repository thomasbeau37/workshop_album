import { ThreeCamera } from "./camera/three.camera";
import { LoopEvent } from "./event/loop.event";
import {NativeRenderer} from "./renderer/native.renderer";
import { ThreeRenderer } from "./renderer/three.renderer";
import {NativeScene} from "./scene/native.scene";
import { ThreeScene } from "./scene/three.scene";

//détecter que le navigateur est prêt, qu'il a fini de charger
window.onload= () => {
    const nativeRenderer = new NativeRenderer(document.querySelector("#native"));
    const nativeScene = new NativeScene(nativeRenderer.context);
    nativeRenderer.render(nativeScene);

    const container = document.querySelector("#three");
    const threeRenderer = new ThreeRenderer(container);
    const threeCamera = new ThreeCamera(container);

    const loopEvent = new LoopEvent(30);
    const threeScene = new ThreeScene(threeCamera, threeRenderer.domElement, loopEvent);

    loopEvent.add(() =>threeRenderer.render(threeScene, threeCamera));
    loopEvent.animate();

    //responsive, il faudrait attendre 200ms avant d'exécuter le resize, temporisation des évènements
    window.addEventListener("resize", () =>{
        threeRenderer.resize(container);
        threeCamera.resize(container);
        threeRenderer.render(threeScene, threeCamera);
    })
    
};