document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const moveCountDisplay = document.getElementById("move-count");
    const timerDisplay = document.getElementById("timer");
    const restartBtn = document.getElementById("restart-btn");
    const winMessage = document.getElementById("win-message");
    const difficultyButtons = document.querySelectorAll(".difficulty button");

    let emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥑"];
    let gridSize = 4, moves = 0, timer = 0, interval, flippedCards = [], matchedPairs = 0, totalPairs;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createBoard(size) {
        gameBoard.innerHTML = "";
        gridSize = size;
        totalPairs = (gridSize * gridSize) / 2;
        matchedPairs = 0;
        flippedCards = [];
        moves = 0;
        moveCountDisplay.textContent = moves;
        clearInterval(interval);
        startTimer();

        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;

        let selectedEmojis = shuffle([...emojis, ...emojis]).slice(0, totalPairs);
        let gameCards = shuffle([...selectedEmojis, ...selectedEmojis]);

        gameCards.forEach((emoji, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            card.dataset.emoji = emoji;

            const front = document.createElement("div");
            front.classList.add("front");

            const back = document.createElement("div");
            back.classList.add("back");
            back.textContent = emoji;

            card.appendChild(front);
            card.appendChild(back);
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });

        winMessage.classList.add("hidden");
    }

    function flipCard() {
        let card = this;
        if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
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
            matchedPairs++;
            if (matchedPairs === totalPairs) {
                clearInterval(interval);
                winMessage.classList.remove("hidden");
            }
        } else {
            setTimeout(() => {
                first.classList.remove("flipped");
                second.classList.remove("flipped");
                flippedCards = [];
            }, 800);
        }
    }

    function startTimer() {
        timer = 0;
        timerDisplay.textContent = timer;
        interval = setInterval(() => {
            timer++;
            timerDisplay.textContent = timer;
        }, 1000);
    }

    restartBtn.addEventListener("click", () => createBoard(gridSize));

    difficultyButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            let difficulty = e.target.id;
            let size = difficulty === "easy" ? 4 : difficulty === "medium" ? 4 : 6;
            let newEmojis = difficulty === "hard" ? 
                ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥑", "🍋", "🥕", "🍑", "🥭", "🥝", "🌽", "🍆", "🍔", "🍕", "🍩"] : emojis;
            
            emojis = newEmojis;
            createBoard(size);
        });
    });

    createBoard(gridSize);
});
