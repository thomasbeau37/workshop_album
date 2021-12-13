import vertex from "./../shader/vertex.shader.glsl";
import fragment from "./../shader/fragment.shader.glsl";

export class NativeScene{

    /**
     * 
     * @param {WbGLRenderingContext} context 
     */
    constructor(context){
        //créer
        const vertexShader = context.createShader(context.VERTEX_SHADER);
        const fragmentShader = context.createShader(context.FRAGMENT_SHADER);

        //spécifier une source
        context.shaderSource(vertexShader, vertex);
        context.shaderSource(fragmentShader, fragment);

        //compiler
        context.compileShader(vertexShader);
        context.compileShader(fragmentShader);

        //vérifier la source
        if(!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)){
            context.deleteShader(vertexShader);
            throw new Error("vertex source invalide");
        }
        if(!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)){
            context.deleteShader(fragmentShader);
            throw new Error("fragment source invalide");
        }

        //créer un programme
        const program = context.createProgram();

        //attacher les shader au program
        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);

        //rattacher le programme au context
        context.linkProgram(program);
        context.useProgram(program);
    }

    draw(context){
        console.log("I want to draw");
        context.drawArrays(context.POINTS, 0, 1);
    }
}