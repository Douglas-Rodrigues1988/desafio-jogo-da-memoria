const emojis = [
    "🐍", "🐍", "🐬", "🐬", "🐟", "🐟", "🦃", "🦃",
    "🦜", "🦜", "🦋", "🦋", "🕷", "🕷", "🐥", "🐥"
];

let openCards = [];
const gameContainer = document.querySelector(".game");

// Função para embaralhar os emojis
const shuffleEmojis = (arr) => arr.sort(() => Math.random() - 0.5);

// Função para criar e renderizar os blocos do jogo
function createGameBoard() {
    const shuffledEmojis = shuffleEmojis([...emojis]); // Cria uma cópia embaralhada dos emojis
    shuffledEmojis.forEach((emoji) => {
        const box = document.createElement("div");
        box.className = "item";
        box.innerHTML = emoji;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    });
}

// Função que lida com o clique nos blocos
function handleClick() {
    if (openCards.length >= 2 || this.classList.contains("boxOpen")) return; // Impede clique em cartas abertas

    this.classList.add("boxOpen");
    openCards.push(this);

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Função para verificar se as cartas formam um par
function checkMatch() {
    const [firstCard, secondCard] = openCards;

    if (firstCard.innerHTML === secondCard.innerHTML) {
        markAsMatched(firstCard, secondCard);
    } else {
        closeCards(firstCard, secondCard);
    }

    openCards = [];

    if (isGameComplete()) {
        setTimeout(() => alert("Você venceu!"), 300);
    }
}

// Função auxiliar para marcar cartas como combinadas
function markAsMatched(card1, card2) {
    card1.classList.add("boxMatch");
    card2.classList.add("boxMatch");
}

// Função auxiliar para fechar as cartas que não combinaram
function closeCards(card1, card2) {
    card1.classList.remove("boxOpen");
    card2.classList.remove("boxOpen");
}

// Função para verificar se o jogo foi completado
function isGameComplete() {
    return document.querySelectorAll(".boxMatch").length === emojis.length;
}

// Inicializando o jogo
createGameBoard();
