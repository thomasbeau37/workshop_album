# Créer des objets

*  🔖 **Dessiner**
*  🔖 **Passer des valeurs**
*  🔖 **Créer un objet 2D**
*  🔖 **Les matrices**
*  🔖 **Librairie**

___

## 📑 Dessiner

Après avoir créer un contexte, initialiser les shaders et obtenu une scène, nous pouvons y ajouter du contenu.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/01-Overview.jpg)

### 🏷️ **Draw**

[drawArrays](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/drawArrays)

```js
context.drawArrays(context.POINTS, 0, 1);
```

#### Mode

Un GLenum indiquant la primitive de type à dessiner. Les valeurs possibles sont :

* POINTS : dessine un seul point ;
* LINE_STRIP : dessine une ligne droite jusqu'au sommet suivant ;
* LINE_LOOP : dessine une ligne droite jusqu'au sommet suivant, et relie le dernier sommet au premier ;
* LINES : dessine une ligne entre une paire de sommets ;
* TRIANGLE_STRIP
* TRIANGLE_FAN
* TRIANGLES : dessine un triangle pour un groupe de trois sommets.

#### Premier

Un GLint indiquant l'indice de départ dans le tableau des points des vecteurs.

#### Compte

Un GLint indiquant le nombre d'indices à dessiner.

___

## 📑 Passer des valeurs

Il est possible de passer des valeurs et de dynamiser vos shaders en obtenant la position de la variable dans le programme.

### 🏷️ **Attribute**

Variables globales susceptibles de changer par sommet, transmises de l'application OpenGL aux vertex shaders.

[getAttribLocation](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/getAttribLocation)

La méthode `WebGLRenderingContext`.getAttribLocation() de l'API WebGL retourne l'emplacement d'une variable d'attribut dans le WebGLProgram indiqué.

[vertexAttrib[1234]f[v]](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttrib)

Les méthodes `WebGLRenderingContext`.vertexAttrib`[1234]`f`[v]`() de l'API WebGL spécifient des valeurs constantes pour les attributs de sommet génériques.

```glsl
attribute vec4 a_position;
attribute float a_pointSize;
void main() {
    gl_Position = a_position;
    gl_PointSize = a_pointSize;
}
```

```js
const a_position = context.getAttribLocation(program, 'a_position');
const a_pointSize = context.getAttribLocation(program,'a_pointSize');
context.vertexAttrib4f(a_position, 0.0, 0.0, 0.0, 1.0);
context.vertexAttrib1f(a_pointSize, 10.0);
```

___

## 📑 Créer un objet 2D

La création d'un objet 2D correspond à créer une géométrie avec plusieurs points.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/02-Geometry.jpg)

Pour pouvoir répéter notre vertex programmatiquement et faire varier leur valeur il nous faut les mettre en tampon.

### 🏷️ **Mise en tampon**

[Float32Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Float32Array)

Le tableau typé Float32Array représente un tableau de nombres flottants représentés sur 32 bits. Il sera utilisé pour spécifier les points de la géométrie.

```js
const vertices = new Float32Array([
    0.0,  0.5,
    -0.5, -0.5,
     0.5, -0.5
]);
```

[createBuffer](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/createBuffer)

La méthode `WebGLRenderingContext`.createBuffer() de l'API WebGL crée et initialise un WebGLBuffer stockant des données telles que des sommets ou des couleurs.

```js
const buffer = context.createBuffer();
```

[bindBuffer](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/bindBuffer)

La méthode `WebGLRenderingContext`.bindBuffer() de l'API WebGL lie un WebGLBuffer donné à une cible.

```js
context.bindBuffer(context.ARRAY_BUFFER, buffer);
```

[bufferData](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/bufferData)

La méthode `WebGLRenderingContext`.bufferData() de l'API WebGL initialise et crée le magasin de données de l'objet tampon.

```js
context.bufferData(
    context.ARRAY_BUFFER,
    vertices,
    context.STATIC_DRAW
);
```

### 🏷️ **Disposition**

Une fois le tampon rattaché à des données, nous devons disposer ces données sur nos attributs de vertex.

[enableVertexAttribArray](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/enableVertexAttribArray)

La méthode `WebGLRenderingContext`.enableVertexAttribArray() active le tableau générique des attributs de sommet à l'indice spécifié dans la liste des tableaux d'attributs.

```js
context.enableVertexAttribArray(a_position);
```

[vertexAttribPointer](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/vertexAttribPointer)

La méthode `WebGLRenderingContext`.vertexAttribPointer() de l'API WebGL spécifie la disposition en mémoire de l'objet de tampon vertex. Elle doit être appelée une fois pour chaque attribut de sommet.

```js
context.vertexAttribPointer(a_position, 2, context.FLOAT, false, 0, 0);
```
___

👨🏻‍💻 Manipulation

Créez une forme 2D en spécifiant au click ses vertices. Utilisez le helper `dat.gui` pour effacer votre forme et choisir le mode de dessin

🔗 [dat.gui.js](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage)

___

## 📑 Les matrices

Pour effectuer des déplacements, mise à l’échelle et rotations il faut passer par des transformations de matrices.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/03-Transformation.jpg)

### 🏷️ **Rotation**

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/04-Rotation.jpg)

### 🏷️ **Scale**

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/05-Scale.jpg)

### 🏷️ **Translate 2D**

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/06-2D.jpg)

### 🏷️ **Translate 3D**

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/07-3D.jpg)

### 🏷️ **Multiplication**

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/04/08-Multiplication.jpg)

La position du point doit être multiplié par une matrices contenant ses modifications spaciales.

```glsl
uniform mat4 u_matrix;
attribute vec4 a_position;
void main() {
    gl_Position = u_matrix * a_position;
}
```

[uniformMatrix](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/uniformMatrix)

Les méthodes `WebGLRenderingContext`.uniformMatrix[234]fv() de l'API WebGL définissent des valeurs matricielles pour les variables uniform.

```js
const u_matrix = gl.getUniformLocation(program, "u_maxtrix");
gl.uniformMatrix4fv(u_maxtrix, false, matrix);
```

Pour obtenir des multiplications de matrices, entre  celle représentant l'identité de la forme et celle correspondant au déplacement, la rotation ou la mise à l’échelle nous allons utiliser une libraire de calculs de matrice.

___

## 📑 Librairie

[GlMatrix](http://glmatrix.net/)

La librairie est déjà présente dans notre package.json.

Pour créer une matrice vierge et effectuer des calculs, cette librairie possède des méthodes suffisantes.

```js
const matrix = mat4.create();
```

### 🏷️ **Translate**

```js
mat4.translate(
    matrix,
    matrix,
    [x, y, z]
);
```

___

👨🏻‍💻 Manipulation

Utiliser `dat.gui` pour déplacer la forme dessinée sur les 3 axes.

___


### 🏷️ **Rotate**

```js
mat4.rotateX(
    matrix,
    matrix,
    Math.PI * x / 180.0
);
```
___

👨🏻‍💻 Manipulation

Utiliser dat.GUI pour effectuer des rotations sur la forme dessinée sur les 3 axes.

___

> Après avoir observé la transmission de valeur entre JavaScript et GLES, la création et utilisation d'un tampon pour dessiner et avoir effectuer des opérations matricielles, nous passons à l'animation des objets pour ne pas avoir à faire de rendu manuel.