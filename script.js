document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const moveCountDisplay = document.getElementById("move-count");
    const timerDisplay = document.getElementById("timer");
    const restartBtn = document.getElementById("restart-btn");

    const emojis = ["🍎", "🍌", "🍇", "🍉", "🍎", "🍌", "🍇", "🍉"];
    let shuffledCards, flippedCards = [], moves = 0, timer = 0, interval;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        gameBoard.innerHTML = "";
        shuffledCards = shuffle([...emojis]);
        shuffledCards.forEach((emoji, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            card.dataset.emoji = emoji;
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        let card = this;
        if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        card.textContent = card.dataset.emoji;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            moveCountDisplay.textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [first, second] = flippedCards;
        if (first.dataset.emoji === second.dataset.emoji) {
            flippedCards = [];
        } else {
            setTimeout(() => {
                first.classList.remove("flipped");
                first.textContent = "";
                second.classList.remove("flipped");
                second.textContent = "";
                flippedCards = [];
            }, 800);
        }
    }

    function startTimer() {
        clearInterval(interval);
        timer = 0;
        timerDisplay.textContent = timer;
        interval = setInterval(() => {
            timer++;
            timerDisplay.textContent = timer;
        }, 1000);
    }

    restartBtn.addEventListener("click", () => {
        moves = 0;
        moveCountDisplay.textContent = moves;
        startTimer();
        createBoard();
    });

    createBoard();
    startTimer();
});
