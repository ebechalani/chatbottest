"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const messagesEl = document.getElementById("chatMessages");
    const controlsEl = document.getElementById("chatControls");

    /* ===== Base de connaissances simplifiée NSI ===== */
    const knowledge = [
        {
            id: "intro",
            keywords: ["c’est quoi", "definition", "définition", "nsi", "spécialité"],
            answer: `La spécialité <strong>NSI (Numérique et Sciences Informatiques)</strong> te permet de découvrir l’informatique “de l’intérieur”.<br><br>
On y apprend à :
<ul>
<li>programmer (souvent en <strong>Python</strong>),</li>
<li>manipuler des <strong>données</strong>,</li>
<li>comprendre le fonctionnement d’un <strong>ordinateur</strong>, d’un <strong>réseau</strong>, d’un <strong>site web</strong>,</li>
<li>raisonner en termes d’<strong>algorithmes</strong>.</li>
</ul>
C’est une spécialité pour les élèves <strong>curieux</strong>, qui aiment comprendre, tester et résoudre des problèmes.`
        },
        {
            id: "programme-1re",
            keywords: ["première", "1ere", "1re", "programme 1", "1 re"],
            answer: `En <strong>1<sup>re</sup> NSI</strong>, on pose les bases :
<ul>
<li><strong>Programmation</strong> : variables, conditions, boucles, fonctions, listes, dictionnaires…</li>
<li><strong>Données</strong> : types de données, tableaux/listes, fichiers simples.</li>
<li><strong>Algorithmique</strong> : recherche, tri simples, raisonnement étape par étape.</li>
<li><strong>Architecture</strong> : binaire, composants d’un ordinateur, système d’exploitation.</li>
<li><strong>Réseaux</strong> : Internet, adresse IP, client/serveur.</li>
</ul>
Le travail se fait surtout en <strong>TP sur ordinateur</strong>, avec des petits projets.`
        },
        {
            id: "programme-term",
            keywords: ["terminale", "terminal", "tale", "programm", "bac"],
            answer: `En <strong>terminale NSI</strong>, on approfondit :
<ul>
<li><strong>Structures de données</strong> : piles, files, arbres, graphes simples.</li>
<li><strong>Algorithmes</strong> : parcours de graphes, recherche et tri plus avancés.</li>
<li><strong>Bases de données</strong> : modèle relationnel, requêtes (souvent SQL).</li>
<li><strong>Réseaux</strong> : protocoles, sécurité de base.</li>
<li><strong>Projet</strong> : réalisation d’un projet plus conséquent (app, jeu, outil…).</li>
</ul>
Cela prépare à l’<strong>épreuve de spécialité</strong> au bac.`
        },
        {
            id: "difficulte",
            keywords: ["difficile", "dur", "compliqué", "niveau"],
            answer: `NSI peut paraître difficile au début car on se trompe souvent… mais c’est <strong>normal</strong> en informatique 😄<br><br>
Ce qu’il faut surtout :
<ul>
<li>accepter de <strong>tester et corriger</strong>,</li>
<li>être un minimum à l’aise avec la <strong>logique</strong>,</li>
<li>travailler <strong>régulièrement</strong>, pas seulement avant les contrôles.</li>
</ul>
Tu n’as pas besoin d’être un “crack” en maths, mais être complètement en difficulté en logique peut rendre la spécialité plus compliquée.`
        },
        {
            id: "maths",
            keywords: ["maths", "mathématiques", "bon en maths"],
            answer: `Les <strong>maths aident</strong> pour la logique, mais NSI et maths sont deux spécialités différentes.<br><br>
En NSI, tu utilises surtout :
<ul>
<li>la <strong>logique</strong>,</li>
<li>la capacité à <strong>décomposer un problème</strong>,</li>
<li>la patience pour chercher des erreurs.</li>
</ul>
Si tu es moyen en maths mais <strong>motivé et sérieux</strong>, tu peux très bien t’en sortir en NSI.`
        },
        {
            id: "debouches",
            keywords: ["métier", "metier", "débouchés", "etudes", "après le bac", "apres le bac"],
            answer: `Avec NSI, tu prépares des études dans tout le domaine du <strong>numérique</strong> :
<ul>
<li>Licences d’<strong>informatique</strong></li>
<li><strong>Écoles d’ingénieurs</strong> (informatique, télécoms, IA, robotique…)</li>
<li>BUT / BTS liés à l’informatique, aux réseaux, à la cybersécurité, au multimédia…</li>
</ul>
Et les métiers possibles (après des études supérieures) :
<ul>
<li>développeur / développeuse,</li>
<li>ingénieur informatique,</li>
<li>data analyst / data scientist,</li>
<li>administrateur systèmes et réseaux,</li>
<li>expert en cybersécurité,</li>
<li>développeur de jeux vidéo, etc.</li>
</ul>
Même si tu ne fais pas carrière dans l’informatique, comprendre le numérique est un <strong>énorme avantage</strong>.`
        },
        {
            id: "evaluation",
            keywords: ["évaluation", "controle", "note", "notation"],
            answer: `En NSI, on est évalué de plusieurs façons :
<ul>
<li><strong>Évaluations écrites</strong> : questions de cours, compréhension d’algorithmes.</li>
<li><strong>Évaluations pratiques</strong> sur ordinateur : écriture ou modification de programmes.</li>
<li>Parfois un <strong>projet</strong> sur plusieurs semaines.</li>
</ul>
En terminale, la spécialité compte pour le <strong>bac</strong> avec une épreuve officielle (modalités exactes selon les textes en vigueur).`
        },
        {
            id: "parents",
            keywords: ["mon enfant", "ma fille", "mon fils", "je suis parent", "parent"],
            answer: `Pour un élève, choisir NSI est pertinent s’il/elle :
<ul>
<li>est curieux/curieuse de comprendre les <strong>technologies</strong>,</li>
<li>aime <strong>manipuler</strong> et tester sur ordinateur,</li>
<li>accepte de <strong>chercher</strong> et de corriger des erreurs.</li>
</ul>
La spécialité donne une vraie <strong>culture numérique</strong> et ouvre des perspectives dans l’informatique, l’ingénierie, la data, la cybersécurité, etc.<br>
En cas d’hésitation, il est conseillé d’en parler avec le <strong>professeur de NSI</strong> et le <strong>professeur principal</strong>.`
        }
    ];

    /* ===== FONCTIONS D’AFFICHAGE ===== */

    function addMessage(text, from = "bot") {
        const msg = document.createElement("div");
        msg.className = `message ${from}`;
        msg.innerHTML = text;
        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setQuickButtons() {
        const quickContainer = document.createElement("div");
        quickContainer.className = "quick-buttons";

        const buttons = [
            { label: "C’est quoi NSI ?", topicId: "intro" },
            { label: "Programme en 1re", topicId: "programme-1re" },
            { label: "Programme en terminale", topicId: "programme-term" },
            { label: "NSI est-elle difficile ?", topicId: "difficulte" },
            { label: "Après le bac ?", topicId: "debouches" }
        ];

        buttons.forEach(({ label, topicId }) => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.addEventListener("click", () => {
                handleQuickTopic(topicId, label);
            });
            quickContainer.appendChild(btn);
        });

        controlsEl.appendChild(quickContainer);
    }

    function setInputRow() {
        const row = document.createElement("div");
        row.className = "chat-input-row";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Pose ta question sur la spécialité NSI…";

        const button = document.createElement("button");
        button.textContent = "Envoyer";

        button.addEventListener("click", () => {
            const text = input.value.trim();
            if (text) {
                handleUserInput(text);
                input.value = "";
                input.focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                button.click();
            }
        });

        row.appendChild(input);
        row.appendChild(button);
        controlsEl.appendChild(row);
    }
    /* ===== LOGIQUE DU BOT ===== */
    function findAnswer(userText) {
        const lower = userText.toLowerCase();

        for (const item of knowledge) {
            if (item.keywords.some(k => lower.includes(k))) {
                return item.answer;
            }
        }

        // Pas de match → réponse générique
        return `Je ne suis pas sûr de bien comprendre ta question 😅<br>
Essaie de la reformuler, ou choisis un thème ci-dessous :
<ul>
<li>programme en 1<sup>re</sup> ou en terminale</li>
<li>difficulté / niveau requis</li>
<li>débouchés et études après le bac</li>
<li>lien entre NSI et les maths</li>
</ul>`;
    }

    function handleUserInput(text) {
        addMessage(text, "user");
        const answer = findAnswer(text);
        addMessage(answer, "bot");
    }

    function handleQuickTopic(topicId, labelShown) {
        addMessage(labelShown, "user");
        const item = knowledge.find(k => k.id === topicId);
        if (item) {
            addMessage(item.answer, "bot");
        } else {
            addMessage("Je n’ai pas encore d’informations sur ce sujet, désolé.", "bot");
        }
    }

    function init() {
        // message d’accueil
        addMessage(
            `Bonjour 👋<br>
Je suis ton <strong>guide virtuel NSI</strong>.<br>
Je peux t’aider à comprendre :
<ul>
<li>en quoi consiste la spécialité <strong>NSI</strong>,</li>
<li>le <strong>programme</strong> en 1<sup>re</sup> et en terminale,</li>
<li>la <strong>difficulté</strong>, le lien avec les <strong>maths</strong>,</li>
<li>les <strong>débouchés</strong> après le bac.</li>
</ul>
Tu peux utiliser les boutons ci-dessous ou poser ta propre question.`
        );

        // Ajout de l’input + boutons rapides
        setInputRow();
        setQuickButtons();
    }

    init();
});
