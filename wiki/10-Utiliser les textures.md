# Utiliser les textures

*  🔖 **Charger**
*  🔖 **Mapper**
*  🔖 **Vidéo**

___

## 📑 Charger

* 🔗 [TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader)

Pour charger des textures il faut utiliser le loader adapté.
Pour les ressources images, le TextureLoader doit être utilisé.

```js
const loader = new TextureLoader();
```

### 🏷️ **Synchrone**

Le chargement peut être synchrone sans gestion d'erreur.

```js
const texture = loader.load('assets/textures/checkerboard.jpg');
```

### 🏷️ **Asynchrone**

Le chargement peut être asynchrone avec gestion d'erreur.

```js
loader.load(
    'assets/textures/checkerboard.jpg',
	(texture) => {
        console.error('Texture loader', texture);
	},
	undefined,
	(error) => {
        console.error('An error happened', error);
	}
);
```

___

## 📑 Mapper

* 🔗 [Textures](https://threejs.org/docs/#api/en/constants/Textures)

Pour appliquer une texture il faut utiliser l'attribut adapté ou utiliser des options à la construction.

* Scene

```js
scene.background = texture;
```

* Mesh

```js
mesh.material.map = texture;
```

### 🏷️ **Ratio**

Le ratio de la texture peut se définit en utilisant son attribut `repeat`.

```js
texture.repeat.set(2, 1);
```

### 🏷️ **Wrapping**

Le mapping des textures peut se définir horizontalement et verticalement.

* RepeatWrapping
* ClampToEdgeWrapping
* MirroredRepeatWrapping

```js
texture.wrapT = RepeatWrapping;
texture.wrapS = RepeatWrapping;
```

### 🏷️ **Mapping**

Par défaut le mapping `UVMapping` est appliqué sur les géométries. Pour définir une texture par face il faut passer un tableau de matériaux définissant chacun leur texture.

```js
const cube = new Mesh(
	new BoxGeometry(1, 1, 1),
	[
		'assets/textures/cube_back.png', 
		'assets/textures/cube_bottom.png', 
		'assets/textures/cube_top.png', 
		'assets/textures/cube_right.png', 
		'assets/textures/cube_left.png', 
		'assets/textures/cube_front.png', 
	].map(image => new MeshLambertMaterial({
		map: textureLoader.load(image)
	}))
);
```
___

👨🏻‍💻 Manipulation

Ajoutez une texture sur la plan et le cube.

___

## 📑 Vidéo

Pour utiliser une texture comme vidéo il faut passer par une balise vidéo.

```js
let video = wwindow.document.createElement("video");
video.loop = "loop";
video.src = "/assets/textures/wave.mp4";
video.load();
video.play();
```

Une fois la balise vidéo avec une source en lecture on peut récupérer une texture vidéo et l'appliquer comme les autres textures avec la classe `VideoTexture`.

```js
material.map = new VideoTexture(video);
```

___

👨🏻‍💻 Manipulation

Ajouter une texture vidéo sur la scène.