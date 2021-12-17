import { AmbientLight, BoxGeometry, Color, DirectionalLight, DirectionalLightHelper, Fog, HemisphereLight, HemisphereLightHelper, Mesh, MeshLambertMaterial, Plane, PlaneGeometry, PointLight, PointLightHelper, Raycaster, RepeatWrapping, Scene, SpotLight, SpotLightHelper, TextureLoader, Vector3, VideoTexture } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Gui } from "../gui/gui";
import { LightGui } from "../gui/light.gui ";
import { MatrixGui } from "../gui/matrix.gui";
import * as THREE from 'three';

export class ThreeScene extends Scene{

    #scene;

    #propeller;

    #rotating = false;

    constructor(camera, domElement, loopEvent){
        super();
        let arrayMusic = [
            ['assets/sounds/son.mp3', "Le monde est petit", "./assets/images/album.jpg"],
            ['assets/sounds/free-22gz-nyuk-drill-type-beat-demons-prod-by-ricorundat.mp3', "BONBON", "./assets/images/album1.jpg"],
            ['assets/sounds/free-lucki-type-beat-2021-nobody.mp3', "Encore", "./assets/images/album2.jpg"]
            ,['assets/sounds/free-lucki-x-unotheactivist-type-beat-2020-what-is-real-prod-nate22.mp3', "Notorious", "./assets/images/album3.jpg"]]
        const loader2 = new THREE.CubeTextureLoader();
        const texture = loader2.load([
            'assets/textures/nx.png',
            'assets/textures/px.png',
            'assets/textures/py.png',
            'assets/textures/ny.png',
            'assets/textures/nz.png',
            'assets/textures/pz.png',
        ]);
        this.background = texture;

        let initMusic = 0;

        let frame = 0;
        let time = 0;
        let action = true;

        const listener = new THREE.AudioListener();
        camera.add( listener );

        // create a global audio source
        const sound = new THREE.Audio( listener );

        sound.onEnded( (e) => {
            time = 0;
        });



        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();

        playMusic(audioLoader,arrayMusic[initMusic][0]);

        function playMusic(audioLoader,mp3url){
            audioLoader.load( mp3url, function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( true );
                sound.setVolume( 0.2 );
                if(sound.isPlaying){
                    sound.stop()
                    document.getElementById("progress").style.width= "0%";
                    document.getElementById("button-play").children[0].src = "./assets/images/play.png";
                    loopEvent.remove(progress);
                }
                sound.play();
                loopEvent.add(progress);
                document.getElementById("button-play").children[0].src = "./assets/images/pause.png";
                document.getElementById("duration").innerHTML = timeFormat(sound.buffer.duration);
                document.getElementById("current-song").innerHTML = arrayMusic[initMusic][1];
                document.getElementById("curent-album").src = arrayMusic[initMusic][2];
            });
        }

        function progress(){
            frame++;
            if(frame == 60){
                frame = 0;
                const percent = Math.round((time/sound.buffer.duration)*100)+"%";
                document.getElementById("progress").style.width = percent;
                document.getElementById("current").innerHTML = timeFormat(time);
                time++;
            }
        }

        function timeFormat(duration)
        {   
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }

        document.getElementById("button-play").addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if(this.children[0].src.includes("play")){
                this.children[0].src = "./assets/images/pause.png";
                sound.play()
                loopEvent.add(progress);
            }else{
                this.children[0].src = "./assets/images/play.png";
                sound.pause()
                loopEvent.remove(progress);
            }
        });

        document.getElementById("right").addEventListener("click", function() {
            if(action == true){
                action = false;
                time = 0;
                document.getElementById("progress").style.width = "0%";
                const initPos = camera.rotation.y;
                const rotate_right = () => {
                    camera.rotation.y -= 0.1;
                    if(camera.rotation.y < initPos-(Math.PI / 2)){
                        loopEvent.remove(rotate_right);
                        initMusic = initMusic+1
                        if(initMusic > 3){
                            initMusic = 0
                        }
                        playMusic(audioLoader,arrayMusic[initMusic][0])
                        camera.rotation.y =  initPos-(Math.PI / 2);
                        action = true;
                    }
                }
                loopEvent.add(rotate_right);
            }
            
        }); 
        document.getElementById("next").addEventListener("click", function() {
            if(action == true){
                action = false;
                time = 0;
                document.getElementById("progress").style.width = "0%";
                const initPos = camera.rotation.y;
                const rotate_right = () => {
                    camera.rotation.y -= 0.1;
                    if(camera.rotation.y < initPos-(Math.PI / 2)){
                        loopEvent.remove(rotate_right);
                        initMusic = initMusic+1
                        if(initMusic > 3){
                            initMusic = 0
                        }
                        playMusic(audioLoader,arrayMusic[initMusic][0])
                        camera.rotation.y =  initPos-(Math.PI / 2);
                        action = true;
                    }
                }
                loopEvent.add(rotate_right);
            }
        }); 
        document.getElementById("left").addEventListener("click", function() {
            if(action == true){
                action = false;
                time = 0;
                document.getElementById("progress").style.width = "0%";
                const initPos = camera.rotation.y;
                const rotate_left = () => {
                    camera.rotation.y += 0.1;
                    if(camera.rotation.y > initPos+(Math.PI / 2)){
                        loopEvent.remove(rotate_left);
                        initMusic = initMusic-1
                        if(initMusic < 0){
                            initMusic = 3
                        }
                        playMusic(audioLoader,arrayMusic[initMusic][0])
                        camera.rotation.y =  initPos+(Math.PI / 2);
                        action = true;
                    }
                }
                loopEvent.add(rotate_left);
            }
        }); 
        document.getElementById("previous").addEventListener("click", function() {
            if(action == true){
                action = false;
                time = 0;
                document.getElementById("progress").style.width = "0%";
                const initPos = camera.rotation.y;
                const rotate_left = () => {
                    camera.rotation.y += 0.1;
                    if(camera.rotation.y > initPos+(Math.PI / 2)){
                        loopEvent.remove(rotate_left);
                        initMusic = initMusic-1
                        if(initMusic < 0){
                            initMusic = 3
                        }
                        playMusic(audioLoader,arrayMusic[initMusic][0])
                        camera.rotation.y =  initPos+(Math.PI / 2);
                        action = true;
                    }
                }
                loopEvent.add(rotate_left);
            }
        }); 

        this.initCamera(camera, domElement);
        this.initCameraAnimation(camera, loopEvent);
        this.initLight();
        this.initMesh(loopEvent);
        
        const loader = new GLTFLoader();
        loader.load(
            "assets/models/pochette-avant.glb",
            (gltf) => {
                this.#scene = gltf.scene;
                console.log(this.#scene);
                this.#propeller = this.#scene.children[5];
                gltf.scene.position.z = -1.5;
                gltf.scene.position.x = 0;
                gltf.scene.position.y = -0.25;
                gltf.scene.scale.set(2.5,2.5,2.5);
                this.add(this.#scene);
                const rotate = () => {
                    gltf.scene.rotation.y += 0.01;
                }
                loopEvent.add(rotate);
            },
            () => {
                console.log("Progress");
            },
            (error) => {
                console.log(error);
            }
        );
        loader.load(
            "assets/models/cd1.glb",
            (gltf) => {
                this.#scene = gltf.scene;
                console.log(this.#scene);
                this.#propeller = this.#scene.children[5];
                gltf.scene.position.z = 0.6;
                gltf.scene.position.x = 1.2;
                gltf.scene.position.y = -0.25;
                gltf.scene.rotation.y = -Math.PI/2;
                gltf.scene.scale.set(3.5,3.5,3.5);
                this.add(this.#scene);
            },
            () => {
                console.log("Progress");
            },
            (error) => {
                console.log(error);
            }
        );
        loader.load(
            "assets/models/cd2.glb",
            (gltf) => {
                this.#scene = gltf.scene;
                console.log(this.#scene);
                this.#propeller = this.#scene.children[5];
                gltf.scene.position.z = 1.2;
                gltf.scene.position.x = -0.62;
                gltf.scene.position.y = -0.25;
                gltf.scene.rotation.y = Math.PI;
                gltf.scene.scale.set(3.5,3.5,3.5);
                this.add(this.#scene);
            },
            () => {
                console.log("Progress");
            },
            (error) => {
                console.log(error);
            }
        );
        loader.load(
            "assets/models/cd3.glb",
            (gltf) => {
                this.#scene = gltf.scene;
                console.log(this.#scene);
                this.#propeller = this.#scene.children[5];
                gltf.scene.position.z = -0.7;
                gltf.scene.position.x = -1.2;
                gltf.scene.position.y = -0.25;
                gltf.scene.rotation.y = Math.PI/2;
                gltf.scene.scale.set(3.5,3.5,3.5);
                this.add(this.#scene);
            },
            () => {
                console.log("Progress");
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initMesh(loopEvent){

    }

    initLight(){
        const ambiantLight = new AmbientLight(0xffffff, 2);
        this.add(ambiantLight);

        const pointLight = new PointLight(0xffffff, 1, 10);
    
        pointLight.castShadow = true;
        pointLight.position.set(-1, 2 ,2);
    }

    initBoxAnimation(box, loopEvent){
        const rotate = () => box.rotation.y += 0.05;
    }

    initCameraAnimation(camera, loopEvent){
        const rotate_right = () => camera.rotation.y -= 0.02;
        const rotate_left = () => camera.rotation.y += 0.01;
    }

    initCamera(camera, domElement){
        //const control = new OrbitControls(camera, domElement);
        camera.position.z = 0;
        camera.position.y = 0;
    }

}