# Ajouter du contenu

*  🔖 **Shaders**
*  🔖 **Vertex**
*  🔖 **Fragment**
*  🔖 **Chargement**

___

## 📑 Shaders

Un Shader est un programme défini par l'utilisateur conçu pour s'exécuter sur une certaine étape d'un processeur graphique. Les shaders fournissent le code de certaines étapes programmables du pipeline de rendu. Ils peuvent également être utilisés sous une forme légèrement plus limitée pour le calcul général sur GPU.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/03/01-Overview.jpg)

### 🏷️ **Process**

Nous allons définir les vertex et fragment shaders dans notre contexte webgl.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/03/02-Process.jpg)

### 🏷️ **Implementation**

Pour définir les Shaders nous devrons charger leur sources écrite en GLES.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/03/03-Implementation.jpg)

### 🏷️ **Syntaxe**

* 🔗 [OpenGL-ES-Reference-card](https://www.khronos.org/opengles/sdk/docs/reference_cards/OpenGL-ES-2_0-Reference-card.pdf)

* 🔗 [GLSL-ES-Specification](https://www.khronos.org/registry/OpenGL/specs/es/2.0/GLSL_ES_Specification_1.00.pdf)

Nous pouvons nous appuyer sur un résumé syntaxique de l'API OpenGL ES 2.0. Les types disponibles sont les suivants:

|Nom|Description|
|-|-|
float|Represents a floating point number
vec2 / vec3 / vec4|Represents a whole numberent float vectors
int|Represents integer
ivec2 / ivec3 / ivec4|Represents vectors of int
bool|Represents boolean
bvec2 / bvec3 / bvec4|Represents vectors of boolean
mat2 / mat3 / mat4|Represents matriof float
void|Represents void
sampler1D / sampler2D / sampler3D|Represents a texture
samplerCube|Represents a cube texture
sampler1DShadow / sampler2DShadow|Represents deep texture for shadow

___

## 📑 Vertex

Un vertex shader définit un point.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/03/04-Vertexshader-01-Overview.jpg)

### 🏷️ **Syntaxe**

```glsl
void main() {
    gl_Position = vec4(0.0, 0.0, 1.0, 1.0);
    gl_PointSize = 50.0;
}
```

#### Output

|Nom|Description|
|-|-|
vec4 gl_Position|Vertex shader writes to this variable to pass on the new value for the current vertex
float gl_PointSize|Vertex shader writes to this variable to pass on the new value for the current point sizein pixels
vec4 gl_ClipVertex|Must be filled by the position of the vertex, in order to perform the cutting operations

#### Attribute

|Nom|Description|
|-|-|
vec4 gl_Vertex|Position of the vertex
vec4 gl_Normal|Normal vertex
vec4 gl_Color|Color vertex
vec4 gl_SecondaryColour|Secondary color vertex
vec4 gl_MultiTexCoord0|Texture coordinates 0
float gl_FogCoord|Fog coordinates

#### Varying

|Nom|Description|
|-|-|
vec4 gl_FrontColor|Front face color
vec4 gl_BackColor|Back face color
vec4 gl_FrontSecondaryColor|Secondary front face color
vec4 gl_BackSecondaryColor|Secondary back face color
vec4 gl_TexCoord|Texture coordinates
float gl_FogFragCoord|Fog coordinates

___

## 📑 Fragment

Un fragment shader définit une couleur pour un point.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/03/05-Fragmentshader-01-Overview.jpg)

### 🏷️ **Syntaxe**

```glsl
void main() {
    gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
}
```

#### Input

|Name|Description|
|-|-|
vec4 gl_FragCoord|Read-only current fragment window relative coordinate. z is 0-1 and assigned to gl_FragDepth if no other value is assigned
bool gl_FrontFacing|true if the fragment belongs to a front facing geometric primitive
int gl_PointCoord|Fragment position within a point (point rasterization only)in the range 0.0 to 1.0

#### Output

|Name|Description|
|-|-|
vec4 gl_FragColor|The colour of the fragmentand assigned to gl_FragDepth if no other value is assigned
vec4 gl_FragData|Data associated with the fragment

#### Constant

|Name|Description|
|-|-|
int gl_MaxVertexAttribs|Maxiumum number of vertex attributes
int gl_MaxVertexUniformVectors|Maxiumum number of vertex shader uniform vectors
int gl_MaxVaryingVectors|Maxiumum number of varying vectors
int gl_MaxVertexTextureImageUnits|Maxiumum number of vertex shader texture image units
int gl_MaxCombinedTextureImageUnits|Maxiumum number of combined texture image units
int gl_MaxFragmentUniformVectors|Maxiumum number of fragment shader uniform vectors
int gl_MaxDrawBuffers|Maxiumun number of draw buffers

___

## 📑 Chargement

Pour utiliser les sharders nous devons:

* Les charger
* Les créer
* Spécifier la source
* Les compiler
* Créer un programme
* Lui attacher les shaders
* Lier le programme au contexte

### 🏷️ **Les charger**

Pour les charger plusieurs stratégie, vous pouvez stocker vos shaders dans votre document, dans un fichier, dans une fonction, n'importe. Actuellement vous êtes dans un projet possédant WebPack et un raw-loader. Nous pouvons alors simplement utiliser l'`import`.

*scenes/shaders/vertex.shader.glsl*

```glsl
void main() {
    gl_Position = vec4(0.0, 0.0, 1.0, 1.0);
    gl_PointSize = 50.0;
}
```

*scenes/shaders/fragment.shader.glsl*

```glsl
void main() {
    gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
}
```

*scenes/iid.scene.js*

```js
import vertex from './shaders/vertex.shader.glsl';
import fragment from './shaders/fragment.shader.glsl';
```

### 🏷️ **Les créer**

* 🔗 [createShader](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/createShader)

La méthode `WebGLRenderingContext`.createShader() de l'API WebGL crée un WebGLShader.

```js
const vertexShader = context.createShader(context.VERTEX_SHADER);
const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
```

### 🏷️ **Spécifier la source**

* 🔗 [shaderSource](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/shaderSource)

La méthode `WebGLRenderingContext`.shaderSource() de l'API WebGL définit le code source d'un WebGLShader.

```js
context.shaderSource(vertexShader, vertex);
context.shaderSource(fragmentShader, fragment);
```

### 🏷️ **Les compiler**

* 🔗 [compileShader](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/compileShader)

La méthode `WebGLRenderingContext`.compileShader() de l'API WebGL compile un shader GLSL en données binaires, de sorte qu'il puisse être utilisé par un WebGLProgram.

```js
context.compileShader(vertexShader);
context.compileShader(fragmentShader);
```

* 🔗 [getShaderParameter](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/getShaderParameter)

La méthode `WebGLRenderingContext`.getShaderParameter() de l'API WebGL retourne des informations sur le shader donné.

```js
if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    context.deleteShader(shader);
    throw new Error(`Erreur de compilation`);
}
```

### 🏷️ **Créer un programme**

* 🔗 [WebGLProgram](https://developer.mozilla.org/fr/docs/Web/API/WebGLProgram)

Le WebGLProgram fait partie de l'API WebGL et il est une combinaison de deux WebGLShader compilés constitués d'un shader de sommet et d'un shader de fragment (tous deux écrits en GLSL). Ces dernier sont ensuite liés dans un programme utilisable.

```js
const program = context.createProgram();
```

### 🏷️ **Lui attacher les shaders**

* 🔗 [attachShader](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/attachShader)

La méthode `WebGLRenderingContext`.attachShader() de l'API WebGL attache un WebGLShader de fragment ou de sommet à un WebGLProgram.

```js
context.attachShader(program, vertexShader);
context.attachShader(program, fragmentShader);
```

### 🏷️ **Lier le programme au contexte**

* 🔗 [linkProgram](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/linkProgram)

La méthode `WebGLRenderingContext`.linkProgram() relie un WebGLProgram donné, terminant le processus de préparation du code GPU pour le fragment du programme et les vertex shaders.

```js
context.linkProgram(program);
```

* 🔗 [useProgram](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/useProgram)

La méthode WebGLRenderingContext.useProgram() de l'API WebGL définit le WebGLProgram spécifié comme faisant partie de l'état de rendu en cours.

```js
context.useProgram(program);
```

___

👨🏻‍💻 Manipulation

Cette manipulation correspond à votre point d'entrée sur la thématique WEB-GL. Organisez votre création de shaders et programme en utilisant une super class par exemple et en lui ajoutant des méthode appropriées ou utilisez des services.

> Cela nous permettra de passer au dessin dans notre scène.