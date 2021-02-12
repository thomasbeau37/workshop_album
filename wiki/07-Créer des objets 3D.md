# Créer des objets 3D

*  🔖 **Perspective**
*  🔖 **Draw**
*  🔖 **ThreeJS**

___

## 📑 Perspective

Pour obtenir une vue sur l'axe Z il faut procéder à une déformation matricielle, une projection, une perspective.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/07/01-Perspective.jpg)

### 🏷️ **Syntaxe**

Notre librairie matricielle nous fournie une méthode de projection.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/07/02-Projection.jpg)

```js
const projection = mat4.create();
mat4.perspective(
    projection,
    45 * Math.PI / 180,
    context.canvas.offsetWidth / context.canvas.offsetWidth,
    0.1,
    100.0
);
context.uniformMatrix4fv(u_projection, false, projection);
```

La projection doit être multipliée à la matrice existante.

```glsl
uniform mat4 u_maxtrix;
uniform mat4 u_projection;
attribute vec4 a_position;
void main() {
    gl_Position = u_projection * u_maxtrix * a_position;
}
```

Afin de ne pas être au centre de la forme, pensez à la déplacer pour pouvoir l'observer.

```js
mat4.translate(matrix, matrix, [0.0, 0.25, -5.0]);
```
___

## 📑 Draw

Nous utiliserons une méthode différente pour dessiner notre géométrie en 3D. Ils nous faut dans un premier temps obtenir des points et de couleurs.

### 🏷️ **Vertex**

Prenons cette ensemble de x, y et z pour chaque vertex.

```js
[
    -0.5, -0.5, 1.0,
    0.5, -0.5, 1.0,
    0.0, 0.5, 1.0,

    0.5, -0.5, 1.0,
    0.0, 0.5, 1.0,
    0.0, 0.0, -0.5,

    -0.5, -0.5, 1.0,
    0.0, 0.5, 1.0,
    0.0, 0.0, -0.5,

    -0.5, -0.5, 1.0,
    0.5, -0.5, 1.0,
    0.0, 0.0, -0.5,
]
```

### 🏷️ **Couleurs**

Concernant l'association de couleurs, nous allons définir une couleur par face et non par vertex pour ne pas être exhaustif.

```js
[
    [1.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
]
```

Nous devons répéter les couleurs pour chaque sommet et obtenir un tableau de flottant.

```js
let colors = [];
for (let i = 0; i < vertexColor.length; i++) {
    const c = vertexColor[i];
    colors = colors.concat(c, c, c);
}
```

### 🏷️ **DrawElements**

Pour pouvoir dessiner notre élément et obtenir une géométrie, nous devons relier les sommet entre eux et créer un tampon pour cela. Nous allons les relier dans l'ordre dans lequel ils se présentent.

```js
context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, context.createBuffer());
context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices.keys()), context.STATIC_DRAW);
```

[drawElements](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements)

La méthode `WebGLRenderingContext`.drawElements () de l'API WebGL restitue les primitives à partir des données du tableau.

```js
context.drawElements(
    context.TRIANGLES,
    vertices.length / 3,
    context.UNSIGNED_SHORT,
    0
);
```

___

👨🏻‍💻 Manipulation

Spécifier une vitesse de rotation pour x, y et z en utilisant `dat.gui`.
Spécifiez un déplacement pour x, y et z en utilisant `dat.gui`.

___

## 📑 ThreeJS

Vous possédez les bases concernant les vertices et fragments, les matrices et les varying ainsi que le passage de valeur entre JavaScript et GLSE. Augmentons notre productivité avec une librairie WEB-GL rendue accessible grâce à cette base commune.