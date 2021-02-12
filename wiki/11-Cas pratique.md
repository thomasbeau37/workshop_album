# Cas pratique

*  🔖 **Import**
*  🔖 **Controls**
*  🔖 **RayCaster**
*  🔖 **Cas pratique**

___

## 📑 Import

[Loading-3D-models](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models)

Pour modéliser, un logiciel est plus pratique afin de travailler ses formes, textures et lumières avec une UI adaptée. Il est possible d'importer des scènes provenant de logiciels de modélisation.

Chaque format necessite un loader particulier. Actuellement le format GLTF est conseillé.

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
```

Son utilisation est simple.

```js
loader.load( 
	'path/to/model.glb',
    (gltf) => scene.add(gltf.scene), 
	undefined,
	(error) => console.error( error )
);
```

### 🏷️ **Viewers**

[gltf-viewer](https://gltf-viewer.donmccurdy.com/)

De nombreux viewers en ligne sont disponibles avant de l'importer dans votre application. Si un problème apparaît le modèle 3D est à corriger.

___

## 📑 Controls

De nombreuses classes sont disponibles pour controller la caméra et de la coupler à des évènements souris, clavier, d'orientation.

[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

Pour utiliser l'un deux **il faut malheureusement disposer d'une variable globale représentant THREE** comme l'illustre le code suivant.

```js
import * as THREE from 'three';
//
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');
//
const control = new window.THREE.OrbitControls(camera, element);
control.update();
```

___

## 📑 RayCaster

Cette classe est conçue pour aider au raycasting. Le Raycasting est utilisé entre autres pour sélectionner des objets (déterminer quels objets dans l'espace 3D la souris survole).

[Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)

L'idée est de représenter le vecteur directionnel du curseur de la souris et de demander quels sont les objets traversés.

```js
const raycaster = new window.THREE.Raycaster();
const mouse = new window.THREE.Vector2();

const mouseClick = (event) => {
	mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
	mouse.y = - (event.clientY / renderer.domElement.height) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	for (var i = 0, l = intersects.length; i < l; i++) {
		console.log(intersects[i].object);
		break;
	}
}

window.addEventListener('click', mouseClick, false);
```
___

## 📑 Cas pratique

En utilisant les notions abordées et en découvrant celles qui vous manque, je vous propose d'ateindre le cas pratique suivant:

* Proposez une scène important des modèles dont l'intégrité est vérifié au préalable. 
* Au click sur un élément intéractif, un élément HTML propose une description de ce dernier.
* Soignez les lumières, ombres, textures et le paramétrage de votre scène.