# Les bases de WebGL

*  🔖 **OpenGL**
*  🔖 **Implémentation**
*  🔖 **Bibliothèques**
*  🔖 **Ouvrages**

___

## 📑 OpenGL

🔗 [OpenGL](https://fr.wikipedia.org/wiki/OpenGL)

OpenGL est un ensemble normalisé de fonctions de calcul d'images 2D ou 3D lancé par Silicon Graphics en 1992. Cette interface de programmation est disponible sur de nombreuses plateformes où elle est utilisée pour des applications qui vont du jeu vidéo jusqu'à la CAO en passant par la modélisation. 

> Les `vertex` permettent de créer une `geometry` qui se colore avec un `fragment`.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/01/01-OpenGL.jpg)

### 🏷️ **OpenGL-ES**

🔗 [OpenGL-ES](https://fr.wikipedia.org/wiki/OpenGL_ES)

OpenGL ES (Open Graphics Library for Embedded System, parfois abrégé en OGLES ou GLES) est une spécification du Khronos Group qui définit une API multiplate-forme pour la conception d'applications générant des images 3D dérivée de la spécification OpenGL, sous une forme adaptée aux plateformes mobiles ou embarquées telles que les téléphones mobiles, les assistants personnels (PDA), les consoles de jeux vidéo portables, les lecteurs multimédia de poche ou de salon... 

> La version 2.0 de `OpenGL-ES` est utilisée par la technologie `WEB-GL`.

### 🏷️ **OpenGL-SL**

🔗 [OpenGL-SL](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.4.60.pdf)

L’OpenGL Shading Language (GLSL) est un langage de programmation de shaders. Ces derniers permettent un contrôle avancé du pipeline de la carte graphique. Le GLSL a été développé par l’OpenGL Architecture Review Board afin de faciliter la programmation de shaders avec l'API OpenGL. 

> `WEB-GL` utilise le `OpenGL Shading Language` basé sur` OpenGL-ES 2.0` pour nous proposer une syntaxe sans géométrie.

___

## 📑 Implémentation

### 🏷️ **Canvas**

La balise canvas possède des contextes graphiques, 2D et 3D. Le contexte 3D utilise WebGL.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/01/02-Canvas.jpg)

### 🏷️ **GLSL**

En s'appuyant sur le dérivé d'OpenGL, le WebGL peut utiliser l’accélération matérielle.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/01/03-Acceleration.jpg)

### 🏷️ **CPU vs GPU**

Le CPU est le processeur central de l'ordinateur et le GPU désigne le processeur qui équipe la carte graphique.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/01/04-CPUGPU.jpg)

### 🏷️ **Compatibilité**

Seul la version mini d'Opera ne prend pas en charge Web-GL.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/01/05-Compatibility.jpg)

___

## 📑 Bibliothèques

De nombreuse librairies ou frameworks existent pour accélérer le développement avec Web-GL.

🔗 [WEB-GL Frameworks](https://fr.wikipedia.org/wiki/Liste_de_frameworks_WebGL)

Chacun possède son orientation d'application.

* 🔗 [Phaser](https://phaser.io/): orienté jeux complets.
* 🔗 [BabylonJS](https://www.babylonjs.com/): cadre complet orienté jeux.
* 🔗 [Three](https://threejs.org/): orienté librairies, helper.

___

## 📑 Ouvrages

### 🏷️ **WebGL Up and Running**

* 🔗 [PDF](https://github.com/suyuanhxx/GraduationProject/blob/master/WebGL-%20Up%20and%20Running.pdf)

Cet ouvrage prend le partie de ne pas d'utiliser dès le premier code une librairies externe.

### 🏷️ **WebGL Programming Guide**

* 🔗 [PDF](https://www.pdfdrive.com/webgl-programming-guide-e34507611.html)

Cet ouvrage prend le partie de ne pas utiliser de librairies.

> Notre contenu s'articulera sur le contrast entre ces deux ouvrages. Nous prendrons le partis de nous exprimmer sans librairies jusqu'à obtenir une forme 3D animée. Devant le constat de productivité nous passerond à l'utilisation de la librairies Three.js pour accélérer le développement et atteindre des objectifs métiers avec les bases suffisantes obtenues en première partie.