import { PerspectiveCamera } from "three";

export class ThreeCamera extends PerspectiveCamera{
    constructor(canvas){
        super(45, canvas.offsetWidth / canvas.offsetHeight, 1, 100);
        console.log(canvas.offsetWidth);
        console.log(canvas.offsetHeight);
    }

    resize(container){
        this.aspect = container.offsetWidth / container.offsetHeight;
        this.updateProjectionMatrix();
    }
}