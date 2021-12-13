import { FontLoader } from "three";
import { Gui } from "./gui";

export class LightGui{

    constructor(light, name){
        const gui = Gui.instance;
        const lightFolder = gui.addFolder(`${name} Light`);
        lightFolder.add(light, 'intensity', 0 ,5);
        lightFolder.addColor({color: {r: 0, g:0, b:0} }, "color").onChange(
            color => light.color =  {r: color.r / 255, g:color.g / 255, b:color.b / 255}
        );
        if("distance" in light){
            lightFolder.add(light, "distance", 0, 20);
        }
        if("angle" in light){
            lightFolder.add(light, "distance", 0, Math.PI);
        }
        if("groundColor" in light){
            lightFolder.addColor({color: {r: 0, g:0, b:0} }, "groundColor").onChange(
                color => light.color =  {r: color.r / 255, g:color.g / 255, b:color.b / 255}
            );
        }
    }

}