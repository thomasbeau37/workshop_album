export class NativeRenderer {


    #canvas;

    #context;

    get context(){
        return this.#context;
    }

    constructor (container) {
        this.#canvas = window.document.createElement('canvas');
        container.appendChild(this.#canvas);
        this.#context = this.#canvas.getContext("webgl")|| this.#canvas.getContext('experimental-webgl');

        //dimensionner this.#canvas
        this.#canvas.width = this.#canvas.offsetWidth;
        this.#canvas.height = this.#canvas.offsetHeight;

        //dimensionner this.#context
        this.#context.viewport(0,0,this.#context.drawingBufferWidth,this.#context.drawingBufferHeight);

        //dimensionner le calcul, calcul que ce qui va s'afficher ( par exemple pas à pont à 200m)
        this.#context.enable(this.#context.SCISSOR_TEST);
        this.#context.scissor(0,0,this.#context.drawingBufferWidth,this.#context.drawingBufferHeight
        );

        //configurer le nettoyage
        this.#context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.#context.clearDepth(1.0);
        this.#context.clearStencil(1);


        //exécuter le nettoyage
        this.#context.clear(
            this.#context.COLOR_BUFFER_BIT
        | this.#context.DEPTH_BUFFER_BIT
        | this.#context.STENCIL_BUFFER_BIT
        );
    }

    render(scene){
        scene.draw(this.#context);
    }
}