import { Gui } from "./gui";

export class MatrixGui{

    constructor(mesh, name){
        const gui = Gui.instance;
        //position
        const position = gui.addFolder(`${name} Position`);
        position.add(mesh.position, "x", -20, 20);
        position.add(mesh.position, "y", -20, 20);
        position.add(mesh.position, "z", -20, 20);

        //rotation
        const rotation = gui.addFolder(`${name} Rotation`);
        rotation.add(mesh.rotation, "x", -Math.PI, Math.PI);
        rotation.add(mesh.rotation, "y", -Math.PI, Math.PI);
        rotation.add(mesh.rotation, "z", -Math.PI, Math.PI);

        //scale
        const scale = gui.addFolder(`${name} Scale`);
        scale.add(mesh.scale, "x", 0, 2);
        scale.add(mesh.scale, "y", 0, 2);
        scale.add(mesh.scale, "z", 0, 2);
    }

}