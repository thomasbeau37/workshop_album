# Three.js

*  🔖 **Three.js**
*  🔖 **WebGLRenderer**
*  🔖 **Camera**
*  🔖 **Scene**
*  🔖 **Mesh**

___

## 📑 Three.js

Nous basculons sur cette librairie et souvenons-nous du schéma exposé précédemment.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/02/three.jpg)


Nous avons utilisé la même organisation de projet et nous allons maintenant nous adapter.

___

## 📑 WebGLRenderer

[WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)

A la construction les options peuvent être spécifiées.

```js
{
    antialias: true,
    alpha: true
}
```

La couleur de clear se définit avec `setClearColor`

```js
renderer.setClearColor(0x000000, 1.0);
```

Le viewport se défint avec `setSize`

```js
renderer.setSize(element.clientWidth, element.clientHeight);
```
___

👨🏻‍💻 Manipulation

Organisez votre contexte webgl en utilisant comme classe une `ThreeRenderer`.

___

## 📑 Camera

[PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)

Le `constructeur` de caméra correspond au prototype de la méthode `perspective` de `mat4`.

La position se définie avec `position.set`. L'ensemble des objets 3D possède `position` et `rotation` en propriété.

```js
camera.position.set(5, 1, 5);
```

La direction peut se spécifier avec `lookAt`.

```js
camera.lookAt(somePosition)
```
___

👨🏻‍💻 Manipulation

Organisez votre contexte webgl en utilisant comme classe une `ThreeCamera`.

___

## 📑 Scene

[Creating-a-scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

La scène possède une méthode pour ajouter des `meshs` qui représentent vertex et fragment.

```js
scene.add(mesh);
```

___

👨🏻‍💻 Manipulation

Organisez votre contexte webgl en utilisant comme classe une `ThreeScene`.

___

## 📑 Mesh

[Mesh](https://threejs.org/docs/#api/en/objects/Mesh)

Une mesh a besoin à la construction d'une géométrie et d'un matériel.

```js
var mesh = new Mesh(
    new BoxGeometry( 1, 1, 1 ),
    new MeshBasicMaterial({ color: 0xffff00})
);
```

### 🏷️ **Geometry**

[Geometry](https://threejs.org/docs/#api/en/core/Geometry)

De nombreuses géométries sont disponibles, il est possible de les construire point par point ou de les importer depuis un logiciel de modélisation.

### 🏷️ **Materiaux**

* MeshBasicMaterial: sans ombre
* MeshBasicMaterial: sans ombre
* MeshLambertMaterial: accepte l'ombre
* MeshPhongMaterial: spéculaire plus prononcée
* MeshStandardMaterial: plus précis

___

👨🏻‍💻 Manipulation

Ajoutez un cube et un plan à notre scène.