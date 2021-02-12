# Créer l'environnement

*  🔖 **Canvas**
*  🔖 **WebGL**
*  🔖 **Normalisation**

___

## 📑 Canvas

Ajouté en HTML5, l'élément `canvas` est un nouvel élément qui peut être utilisé pour dessiner des graphismes via des scripts JavaScript.

[Canvas](https://developer.mozilla.org/fr/docs/Web/HTML/Canvas)

```js
const canvas = window.document.createElement('canvas');
```

[HTMLCanvasElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement)

L'interface HTMLCanvasElement fournit un ensemble de propriétés et de méthodes pour manipuler la disposition et la représentation des éléments canvas.

[WebGLRenderingContext](https://developer.mozilla.org/fr/docs/Web/APIWebGLRenderingContext)

L'interface WebGLRenderingContext fournit le contexte de rendu OpenGL ES 2.0 pour le dessin d'une surface dans un élément HTML `canvas`.

```js
const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
```

___

## 📑 WebGL

### 🏷️ **Size**

Afin de définir une taille d'affichage du contexte avec le viewport il faut spécifier des attributs HTML pour la largeur et la hauteur.

```js
canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;
```

### 🏷️ **Viewport**

[Viewport](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/viewport)

La méthode `WebGLRenderingContext`.viewport() de l'API WebGL définit le viewport, qui indique la transformation affine de x et de y, de coordonnées d'appareil normalisées en coordonnées de fenêtre

[drawingBufferWidth](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferWidth)

La propriété `WebGLRenderingContext`.drawingBufferWidth en lecture seule représente la largeur réelle du tampon de dessin courant.

```js
context.viewport(
    0,
    0,
    context.drawingBufferWidth,
    context.drawingBufferHeight
);
```

### 🏷️ **Scissor**

[scissor](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor)

La méthode `WebGLRenderingContext`.scissor () de l'API WebGL définit une boîte à ciseaux, qui limite le dessin à un rectangle spécifié.

Par défaut la méthode scisor n'est pas activée.

[enable](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/activer)

La méthode `WebGLRenderingContext`.enable() de l'API WebGL active des fonctionnalités WebGL particulières pour ce contexte.

```js
context.enable(context.SCISSOR_TEST);

context.scissor(
    0,
    0,
    context.drawingBufferWidth,
    context.drawingBufferHeight
);
```

### 🏷️ **Clear**

[clear](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/clear)

La méthode `WebGLRenderingContext`.clear() de l'API WebGL efface les tampons avec des valeurs prédéfinies. Pour définir les différentes valeurs à effacer il faut utiliser les méthodes rattachées aux constantes attendues par `WebGLRenderingContext`.clear().

[clearColor](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/clearColor)

[clearStencil](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/clearStencil)

[clearDepth](https://developer.mozilla.org/fr/docs/Web/API/WebGLRenderingContext/clearDepth)

Le nettoyage du tampon de profondeur doit s'activer avec `WebGLRenderingContext`.enable().

```js
context.clearColor(0.0, 0.0, 0.0, 1.0);
context.clearDepth(1.0);
context.clearStencil(1);
```

```js
context.clear(
    context.COLOR_BUFFER_BIT
  | context.DEPTH_BUFFER_BIT
  | context.STENCIL_BUFFER_BIT
);
```

___

## 📑 Normalisation

Afin d'organiser notre développement, observons l'organisation de la librairie Three.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/02/three.jpg)

___

👨🏻‍💻 Manipulation

Organisez votre contexte webgl en utilisant comme classe une `NativeRenderer` et une `IIDScene` qui étend une `NativeScene`.

> Le NativeRenderer.`renderer` possède la responsabilité de rendre une scène reçue en argument en invoquant sa méthode `draw`, la `scene` au moment de dessiner invoque sa méthode NativeScene.`clear` pour nettoyer la zone d'affichage.