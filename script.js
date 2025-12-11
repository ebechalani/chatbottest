document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURATION DU SCENARIO ---
    const scriptData = {
        DEPART: {
            message: "Bonjour ! 👋 Je suis le guide virtuel MATh.en.JEANS. Je suis là pour vous expliquer comment vivre les maths autrement. Que voulez-vous savoir ?",
            choices: [
                { label: "Quesako ?", next: "QUESAKO" },
                { label: "Le Concept", next: "CONCEPT" },
                { label: "Pour les Profs", next: "PROFS" },
                { label: "Pour les Élèves", next: "ELEVES" },
                { label: "Le Fonctionnement", next: "FONCTIONNEMENT" }
            ]
        },
        QUESAKO: {
            message: "C'est un acronyme ! Il signifie : <strong>M</strong>éthode d'<strong>A</strong>pprentissage des <strong>Th</strong>éories mathématiques en <strong>J</strong>umelant des <strong>É</strong>tablissements pour une <strong>A</strong>pproche <strong>N</strong>ouvelle du <strong>S</strong>avoir.",
            choices: [
                { label: "Le Concept", next: "CONCEPT" },
                { label: "Retour au début", next: "DEPART" }
            ]
        },
        CONCEPT: {
            message: "MATh.en.JEANS, c'est ne pas subir les maths, mais les FAIRE ! 🧠 L'idée est de mettre les élèves en situation de recherche, sans notes, comme de vrais chercheurs.",
            choices: [
                { label: "Comment ça marche ?", next: "FONCTIONNEMENT" },
                { label: "Retour au début", next: "DEPART" }
            ]
        },
        PROFS: {
            message: "Pour les enseignants, c'est l'occasion de pratiquer une pédagogie de projet. 👨‍🏫 Vous devez trouver un binôme dans un autre établissement et l'association vous aide à trouver un chercheur universitaire.",
            choices: [
                { label: "Et le chercheur ?", next: "FONCTIONNEMENT" },
                { label: "Retour au début", next: "DEPART" }
            ]
        },
        ELEVES: {
            message: "Pas besoin d'être un génie ! 🚀 Il faut juste être curieux. Tu vas apprendre à travailler en équipe, à l'oral, et à chercher des solutions inédites.",
            choices: [
                { label: "Les Congrès ?", next: "CONGRES" },
                { label: "Retour au début", next: "DEPART" }
            ]
        },
        FONCTIONNEMENT: {
            message: "Le dispositif repose sur 3 piliers : 1️⃣ Le Jumelage (2 établissements), 2️⃣ Le Sujet (proposé par un chercheur), 3️⃣ Les Congrès (présentation des résultats).",
            choices: [
                { label: "C'est quoi les Congrès ?", next: "CONGRES" },
                { label: "Retour au début", next: "DEPART" }
            ]
        },
        CONGRES: {
            message: "C'est la fête des mathématiques et de la recherche ! 🎉 En fin d'année, tous les ateliers se réunissent à l'université pour présenter leurs travaux en amphi. C'est l'aboutissement du projet.",
            choices: [
                { label: "Retour au début", next: "DEPART" }
            ]
        }
    };

    // --- ÉLÉMENTS DOM ---
    const chatMessages = document.getElementById('chatMessages');
    const chatControls = document.getElementById('chatControls');

    // --- FONCTIONS D'INTERFACE ---

    // Scroll automatique vers le bas
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Afficher un message (User ou Bot)
    const appendMessage = (text, sender) => {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerHTML = text;
        chatMessages.appendChild(div);
        scrollToBottom();
    };

    // Afficher l'indicateur de frappe (Typing...)
    const showTypingIndicator = () => {
        const div = document.createElement('div');
        div.classList.add('typing-indicator');
        div.id = 'typingIndicator';
        div.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        chatMessages.appendChild(div);
        scrollToBottom();
    };

    // Supprimer l'indicateur de frappe
    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    };

    // Afficher les choix (Boutons)
    const showChoices = (choices) => {
        chatControls.innerHTML = ''; // Nettoyer
        
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.classList.add('choice-chip');
            btn.textContent = choice.label;
            
            btn.addEventListener('click', () => {
                handleUserChoice(choice.label, choice.next);
            });
            
            chatControls.appendChild(btn);
        });
    };

    // --- CŒUR DE LOGIQUE ---

    // Gestion du clic utilisateur
    const handleUserChoice = (label, nextStepKey) => {
        // 1. Désactiver les boutons (pour éviter double clic)
        chatControls.innerHTML = '';
        
        // 2. Afficher le choix de l'utilisateur comme un message
        appendMessage(label, 'user');

        // 3. Déclencher la réponse du bot
        gotoStep(nextStepKey);
    };

    // Transition vers une étape du scénario
    const gotoStep = (stepKey) => {
        const stepData = scriptData[stepKey];
        if (!stepData) return;

        // Afficher "Typing..."
        showTypingIndicator();

        // Délai aléatoire pour simuler la réflexion
        const delay = Math.random() * 500 + 500;

        setTimeout(() => {
            removeTypingIndicator();
            appendMessage(stepData.message, 'bot');
            
            // Si le message est long, on attend un peu avant d'afficher les boutons
            setTimeout(() => {
                showChoices(stepData.choices);
                scrollToBottom();
            }, 300);
            
        }, delay);
    };

    // --- DEMARRAGE AUTOMATIQUE ---
    setTimeout(() => {
        gotoStep('DEPART');
    }, 500);
});