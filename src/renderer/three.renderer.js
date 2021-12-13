import {PCFShadowMap, PCFSoftShadowMap, WebGLRenderer} from "three";

export class ThreeRenderer extends WebGLRenderer{

    constructor(container){
        super({
            antialias: true,
            alpha: true, //transparent
        });
        container.appendChild(this.domElement);
        this.resize(container);
        this.shadowMap.enabled = true;
        this.shadowMap.type = PCFSoftShadowMap;
        //this.setClearColor(0xffffff);
    }

    resize(container){
        this.setSize(container.offsetWidth, container.offsetHeight);
    }
}