﻿# Projet de M2 - IDM - Enora Danilo - ISTIC

<h2>Modèle défini à l'aide d'Ecore</h2>

<img src="./asset/project_IDM.jpg">

<h2>Description des concepts du langage</h2>

Le modèle concret à beaucoup évolué au fil du temps, il englobe l'ensemble des concepts essentiels à la définition du langage.

- RoboML: Il s'agit de la racine du programme

- Variable: Il s'agit des variables globales et locales du programme. Chaque valeur de variable peut être assignée à une autre variable ou elles peuvent prendre une valeur.

- Fonction: Ce sont les déclarations de fonctions dans le programme. Elles prennent au moins un statement. Une fonction a un type et peut prendre un ou plusieurs arguments. Elles possèdent également un nom.

- Statement: Il s'agit d'une classe abstraite représentative d'une instruction, toutes les instructions concrètes du programme en héritent. 
    
    - Assignment: Permet d'assigner une valeur à une variable. Elle possède un nom et une valeur.

    - Loop: Permet de faire une boucle for. Elle possède une expression (représent la condition de sortie de la boucle) et une liste d'instructions à exécuter.

    - Condition: Permet de faire un if. Elle possède une condition ainsi qu'une liste instructions à exécuter si la condition est vraie.

    - Movement: Permet de choisir la direction du robot. On peut choisir la distance sur laquelle le robot va avancer dans cette direction. Elle prend un nombre et une unité.

    - Rotation: Permet de faire une rotation suivant l'angle défini. 

    - FunctionCall: Permet d'appeler une fonction. 

    - ReturnInstruction: Permet de mettre un retour aux fonctions (return).

- Speed: Permet de déterminer la vitesse du robot. On peut choisir une unité (mm, cm, dm, m). 

- Expression: Permet d'effectuer ou non l'opération OR entre deux expressions de type Exp1. 

- Exp1: Permet d'effectuer ou non l'opération AND entre deux expressions de type Exp2. 

- Exp2: Permet de faire ou non un NOT sur une expression de type Exp3.

- Exp3: Permet de faire ou non soit une opération EQUALS, NOT EQUALS, SUP, SUP EQUALS, INF, INF EQUALS entre deux expressions de type Exp4. 

- Exp4: Permet de faire ou non soit une ADDITION ou une SOUSTRACTION entre deux expressions de type Exp5.

- Exp5: Permet d'effectuer ou non l'opération MULTIPLICATION ou DIVISION entre deux expressions de type Primaire. 

- Primaire: Il s'agit de soit une VALUE, soit un nom de variable, soit une expression entre parenthèse (les priorités opératoires sont prises en comptes). 

- Value: Il s'agit de soit un booléen, un nom de variable (VARIABLE REF) ou un nombre. 

- Param: Il s'agit des paramètres que prennent les déclarations de fonctions.  

- Direction: Il s'agit d'un énumération qui permet de choisir entre gauche, droite, devant ou derrière.

- Unit: Enumération permettant de choisir une unité de mesure entre le mètre, centimètre, décimètre ou millimètre. 

<h2>Visiteur & Interpréteur</h2>

La logique derrière l'intérpréteur s'appuie sur le visiteur que j'ai implémenté. 

Les différents concepts du langage ont chacun  un visiteur qui leur est propre permettant 
d'implémenter leur logique et leurs fonctionnalités tout au long de l'exécution du programme. 

Les visiteurs sont implémentés dans `interpretorVisitors.ts`

Exemple de visiteur pour le concept `RoboML`

```ts
    visitRoboML(node: RoboML) {
        console.log("visitRoboML()");

        for (const v of node.variable) {
            v.accept = function (visitor: Visitor) { return visitor.visitVariable(v); };
            try {
                v.accept(this);
            } catch(error) {
                console.log(error);
            }
        }

        for ( const f of node.function ) {
            f.accept = function (visitor: Visitor) { return visitor.visitFonction(f); };
            try {
                f.accept(this);
            } catch(error) {
                console.log(error);
            }
        }
    }
```

<h2>Etat d'avancement</h2>

J'ai pu définir un modèle complet et fonctionnel permettant de générer une grammaire et une sémantique tout aussi complète. Concernant l'interpréteur, j'ai une idée très claire de la manière dont il doit être implémenté mais j'ai eu quelques soucis et des contraintes de temps ce qui a fait que l'interpréteur n'a pas pu être complété. 
