# Ajouter des couleurs

*  🔖 **Overview**
*  🔖 **Varying**

___

## 📑 Overview

Les Varying fournissent une interface entre Vertex et Fragment Shader.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/06/01-Overview.jpg)

___

## 📑 Uniform

Variables globales qui peuvent changer par primitive qui sont transmises de l'application OpenGL aux shaders. Ce qualificatif peut être utilisé dans les shaders de vertex et de fragment.

* 🔗 [getUniformLocation](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/getUniformLocation)

Faisant partie de l'API WebGL, la méthode `WebGLRenderingContext`.getUniformLocation() retourne l'emplacement d'une variable uniform particulière appartenant au WebGLProgram indiqué.

* 🔗 [uniform[1234][fi][v]](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/uniform)

Les méthodes `WebGLRenderingContext`.uniform[1234][fi][v]() de l'API WebGL indiquent les valeurs des variables uniform.

En modifiant un uniform de fragment nous devons indiquer la précision du traitement.
* highp for vertex positions,
* mediump for texture coordinates,
* lowp for colors.

```glsl
uniform vec4 u_FragColor;
void main() {
    gl_FragColor = u_FragColor;
}
```

```js
const u_FragColor = context.getUniformLocation(
    this.program,
    'u_FragColor'
);
context.uniform4f(u_FragColor, 1.0, 0.0, 1.0, 1.0);
```

___

👨🏻‍💻 Manipulation

* Utilisez `dat.gui` pour pouvoir choisir la couleur d'un objet 2D.

___

## 📑 Varying

 Les vertex shaders calculent les valeurs par sommet et les fragment shaders calculent les valeurs par fragment. Si vous définissez une variable varying dans un vertex shader, sa valeur sera interpolée sur la primitive en cours de rendu et vous pourrez accéder à la valeur interpolée dans le fragment shader.

### 🏷️ **Syntaxe**

Une vertex peut affecter à une varying une valeur en utilisant un attribut.

```glsl
attribute vec4 a_position;
attribute vec4 a_color;
varying lowp vec4 v_color;
void main() {
    gl_Position = a_position;
    v_color = a_color;
}
```

Le fragment partage la varying pour colorer une vertice particulière.

```glsl
varying lowp vec4 v_color;
void main() {
    gl_FragColor = v_color;
}
```

___

👨🏻‍💻 Manipulation

* Associez une couleur en utilisant `dat.gui` afin d'affecter la couleur en cours de sélection via un tableau des couleurs à une vertice.
* Utilisez un tampon pour écrire les valeurs de chaque couleur sur l'attribut concerné.
* Effectuer un refactoring sur ce qui représente votre objet.