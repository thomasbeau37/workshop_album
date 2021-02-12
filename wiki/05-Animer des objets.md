# Animer des objets

*  🔖 **Overview**
*  🔖 **RequestAnimationFrame**

___

## 📑 Overview

La mise à jour de la scène se fait généralement dans une boucle de rendu afin de pouvoir maîtrise le nombre d'image par seconde.

![image](https://raw.githubusercontent.com/seeren-training/WebGL/master/wiki/resources/05/01-Overview.jpg)

___

## 📑 RequestAnimationFrame

[requestAnimationFrame](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)

La méthode `window`.requestAnimationFrame() notifie le navigateur que vous souhaitez exécuter une animation et demande que celui-ci exécute une fonction spécifique de mise à jour de l'animation, avant le prochain rafraîchissement du navigateur

```js 
const fps = 30;
const callables = [];
const ms = 1000 / fps;
let id = null;
let interval;
let now;
let from = window.Date.now();
const animate = () => {
    id = window.requestAnimationFrame(animate);
    now = window.Date.now();
    interval = now - from;
    if (interval > ms) {
        callables.forEach(callable => callable());
        from = now - (interval % ms);
    }
};

id = window.requestAnimationFrame(animate);
```

Cette utilisation avancée propose de maîtriser les `frames per seconds` et invoque les fonctions utilisateur si la dernière invocation de requestAnimationFrame est postérieure à la dernière invocation des fonctions utilisateurs additionnée des fps.

___

👨🏻‍💻 Manipulation

Créer une boucle de rendu dans une classe séparée qui dessine la scène en permanence. Mettez à jour votre scène pour arrêter toute invocation manuelle de la méthode exécutant le dessin.

___

👨🏻‍💻 Manipulation

Utilisez `dat.gui` pour pouvoir paramétrer le nombre de frame par seconde, une vitesse de rotation en x, y et z et créer une nouvelle forme indépendante d'une première dessinée

___


> Après avoir observé la boucle de rendu nous allons observer comment faire varier les couleurs pour chaque vertex.