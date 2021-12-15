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
        let arrayMusic = ['assets/sounds/son.mp3','assets/sounds/son2.mp3','assets/sounds/son3.mp3','assets/sounds/son4.mp3']
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

        let initMusic =-1;

        //this.background = new Color(0xff0000); //background color
        //this.fog = new Fog(0xffffff, 1 , 20);
        

        //pour vidéo car on l'utilisateur doit donner l'autorisation pour lire une vidéo
        /*document.body.onclick () => {

        }*/
        const listener = new THREE.AudioListener();
        camera.add( listener );

// create a global audio source
        const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();

        function playMusic(audioLoader,mp3url){
            audioLoader.load( mp3url, function( buffer ) {
                console.log(buffer)
                sound.setBuffer( buffer );
                sound.setLoop( true );
                sound.setVolume( 0.5 );
                if(sound.isPlaying){
                    sound.stop()
                }
                sound.play();

            });
        }



        document.getElementById("right").addEventListener("click", function() {
            const initPos = camera.rotation.y;

            const rotate_right = () => {
                camera.rotation.y -= 0.1;
                if(camera.rotation.y < initPos-(Math.PI / 2)){
                    loopEvent.remove(rotate_right);
                    initMusic = initMusic+1
                    if(initMusic > 3){
                        initMusic = 0
                    }
                    playMusic(audioLoader,arrayMusic[initMusic])


                    camera.rotation.y =  initPos-(Math.PI / 2);
                }
            }
            loopEvent.add(rotate_right);
        }); 
        document.getElementById("left").addEventListener("click", function() {
            const initPos = camera.rotation.y;
            const rotate_left = () => {
                camera.rotation.y += 0.1;
                if(camera.rotation.y > initPos+(Math.PI / 2)){
                    loopEvent.remove(rotate_left);
                    camera.rotation.y =  initPos+(Math.PI / 2);
                }
            }
            loopEvent.add(rotate_left);
        }); 

        this.initCamera(camera, domElement);
        this.initCameraAnimation(camera, loopEvent);
        this.initLight();
        this.initMesh(loopEvent);
        
        const loader = new GLTFLoader();
        loader.load(
            "assets/models/LowPolyMill.glb",
            (gltf) => {
                this.#scene = gltf.scene;
                this.#propeller = this.#scene.children[5];
                gltf.scene.position.y += 1;
                this.add(this.#scene);
                //camera.lookAt(this.#scene.position);
                this.initModelInteraction(loopEvent);
                this.initModelRaycaster(loopEvent, domElement, camera);
            },
            () => {
                console.log("Progress");
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initModelRaycaster(loopEvent, domElement, camera){
        const raycaster = new Raycaster;
        let hasRotated = false;
        const mouse = {};
        const rotate = () => {
            this.#propeller.rotateY(0.1);           
        }
        domElement.addEventListener("click", (e) => {
            const {left, top} = domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - left) / domElement.offsetWidth) * 2 - 1;
            mouse.y = -((e.clientY - top) / domElement.offsetHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(this.#propeller.children);
            if(intersects.length){
                hasRotated = !hasRotated;
                !hasRotated ? loopEvent.add(rotate) : loopEvent.remove(rotate);
            }
        })
    }

    initModelInteraction(loopEvent){
        const animation = Gui.instance.addFolder("Hélice Animation");
        const rotate = () => {
            this.#propeller.rotateY(0.1);           
        }
        animation.add({rotate:false}, "rotate", 0, 1).onChange((data)=>{
            if(data == true){
                loopEvent.add(rotate);
            }else{
                loopEvent.remove(rotate);
            }
        });
    }

    initMesh(loopEvent){
        //pour vidéo, mais il faut un clique pour l'activer sinon le navigateur refuse
        /*const videoElement = document.createElement("video");
        document.body.appendChild(videoElement);
        videoElement.style.display = "none";
        videoElement.src = "assets/textures/wave.mp4";
        videoElement.load();
        videoElement.play();*/

        //const videoLoader = new VideoTexture(); 
        const box = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshLambertMaterial({ color:0xFF0000, wireframe: true}), //wireframe = fillaire
        );

        const box2 = new Mesh(
            new BoxGeometry(1, 1, 0.1),
            /*[
                'assets/textures/cube_back.png', 
                'assets/textures/cube_bottom.png', 
                'assets/textures/cube_top.png', 
                'assets/textures/cube_right.png', 
                'assets/textures/cube_left.png', 
                'assets/textures/cube_front.png', 
            ].map(image => new MeshLambertMaterial({
                map: loader.load(image)
            })),*/
            new MeshLambertMaterial({ color:0x00FF00}),  
        );

        const box3 = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshLambertMaterial({ color:0x00FF00}),
        );
        const box4 = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshLambertMaterial({ color:0x0000FF}),
        );

        //si une couleur par face faire une tableau de material
            /*
        [
            new MeshLambertMaterial({ color:0xFF0000}),
            new MeshLambertMaterial({ color:0xFF0000}),
            new MeshLambertMaterial({ color:0xFF0000}),
            new MeshLambertMaterial({ color:0xFF0000}),
            new MeshLambertMaterial({ color:0xFF0000}),
            new MeshLambertMaterial({ color:0xFF0000})
        ]*/

        box.position.z = 5;
        box.position.x = 0;

        box2.position.z = -5;

        box3.position.x = 5;

        box4.position.x = -5;

        const loader = new TextureLoader();
        const texture = loader.load("assets/textures/checkerboard.jpg");
        texture.wrapS = RepeatWrapping;
        const floor = new Mesh(
            new PlaneGeometry(20,10),
            new MeshLambertMaterial({ color: 0xffffff, map : texture})
        );
       
        //floor.material.map = texture; //changer la texture, si marche pas =>  floor.needUpdate = true;
        floor.rotation.x = -Math.PI/2;
        
        box.receiveShadow = true;
        box.castShadow = true;
        floor.receiveShadow = true;
        floor.castShadow = true;

        //new MatrixGui(box, "cube");

        this.add(floor);
        this.add(box);
        this.add(box2);
        this.add(box3);
        this.add(box4);
        this.initBoxAnimation(box2, loopEvent);
    }

    initLight(){
        const ambiantLight = new AmbientLight(0xffffff, 0.8);
        this.add(ambiantLight);
        new LightGui(ambiantLight, "ambiant");

        const pointLight = new PointLight(0xffffff, 1, 10);
        const pointLightHelper = new PointLightHelper(pointLight, 0.5);
        pointLight.castShadow = true;
        pointLight.position.set(-1, 2 ,2);
        this.add(pointLight, pointLightHelper);
        new LightGui(pointLight, "Point");
    }

    initBoxAnimation(box, loopEvent){
        const rotate = () => box.rotation.y += 0.05;
        const animation = Gui.instance.addFolder("Animation");
        animation.add({rotate:false}, "rotate", 0, 1).onChange((data)=>{
            if(data == true){
                loopEvent.add(rotate);
            }else{
                loopEvent.remove(rotate);
            }
        });
    }

    initCameraAnimation(camera, loopEvent){
        const rotate_right = () => camera.rotation.y -= 0.02;
        const animation = Gui.instance.addFolder("Camera");
        animation.add({rotate:false}, "rotate", 0, 1).onChange((data)=>{
            if(data == true){
                loopEvent.add(rotate_right);
            }else{
                loopEvent.remove(rotate_right);
            }
        });
        const rotate_left = () => camera.rotation.y += 0.01;
        animation.add({rotate:false}, "rotate", 0, 1).onChange((data)=>{
            if(data == true){
                loopEvent.add(rotate_left);
            }else{
                loopEvent.remove(rotate_left);
            }
        });
    }

    initCamera(camera, domElement){
        //const control = new OrbitControls(camera, domElement);
        camera.position.z = 0;
        camera.position.y = 0;
        //camera.lookAt(0,0,0);
    }

}