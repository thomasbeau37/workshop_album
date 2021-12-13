export class LoopEvent{

    #fps = 30;
    #callbackList = [];
    #from = window.Date.now();
    #id = 0;

    constructor(fps){
        this.#fps = fps;
    }

    add(callback){
        this.#callbackList.push(callback);
    }

    remove(callback){
        const index = this.#callbackList.indexOf(callback);
        if(-1 !== index){
            this.#callbackList.splice(index, 1);
        }
    }

    animate(){
        this.#id = requestAnimationFrame(() => this.animate());
        const ms = 1000 / this.#fps;
        const now = Date.now();
        const interval = now - this.#from ;
        if (interval > ms){
            this.#callbackList.forEach(callback => callback());
            this.#from = now - (interval % ms);
        }
    }

    stop(){
        cancelAnimationFrame(this.#id);
    }
}