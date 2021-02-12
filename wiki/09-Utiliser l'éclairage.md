# Utiliser l'éclairage

*  🔖 **Lumières**
*  🔖 **Ombres**

___

## 📑 Lumières

[Light](https://threejs.org/docs/#api/en/lights/Light)

### 🏷️ **Types**

* AmbientLight: lumière globale sans ombre
* HemisphereLight: dégrade le ciel et le sol
* PointLight: toute direction
* SpotLight: une direction conique
* DirectionalLight: une direction globale

### 🏷️ **Helper**

[DirectionalLightHelper](https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper)

Il est difficile de visualiser l'emplacement d'une source lumineuse, des helpers les matérialisent en fonction de leur type.

___

👨🏻‍💻 Manipulation

Ajoutez une lumière ambiante et un point lumineux avec un helper pour éclairer les `meshs` possédant le `material` adapté.

___

## 📑 Ombres

### 🏷️ **Ombre de surface**

Appliquer un `material` acceptant l'ombrage (`MeshLambertMaterial`)

### 🏷️ **Ombre projetée**

[shadowMap](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap)

Pour obtenir une ombre projetée il faut l'activer dans le `renderer`.

```js
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
```

[castShadow](https://threejs.org/docs/#api/en/core/Object3D.castShadow)

Les objets peuvent spécifier s'ils projettent de l'ombre.

```js
object.castShadow = true;
```

[receiveShadow](https://threejs.org/docs/#api/en/core/Object3D.receiveShadow)

Les objets peuvent spécifier s'ils reçoivent de l'ombre projetée.

```js
object.receiveShadow = true;
```

[LightShadow](https://threejs.org/docs/#api/en/lights/shadows/LightShadow)

La taille de la texture utilisée pour rendre une ombre projetée peut être spécifiée.

```js
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
```

___

👨🏻‍💻 Manipulation

Acceptez les ombre projetées.