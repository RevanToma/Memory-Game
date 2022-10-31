

// const game = '👺 👹 🤡 👻 👽 🤠 ☠️ 🤖';
const result = document.querySelector('.result');
let cards = document.querySelectorAll('.memory-card');
const memoryGame = document.querySelectorAll('.memory-game');
let maxGuess = document.querySelector('.maxGuess');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let board = false;
let score = 0;
let guesses = 0;
let maxGuesses = 10;


function play() {

    if (board) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkMatch();
}


function checkMatch() {
    if (firstCard.dataset.attribute === secondCard.dataset.attribute) {
        score++;
        result.textContent = `Score: ${score}`;

        gameOver();
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', play);
    secondCard.removeEventListener('click', play)

    resetBoard();
}
function unflipCards() {
    board = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        guesses++;
        maxGuesses--;
        maxGuess.textContent = 'Max-Guesses: ' + maxGuesses;
        if (guesses === 10) {
            result.textContent = 'Sorry! you failed to find all cards';
            maxGuess.style.visibility = 'hidden';
            playAgain();
            return cards = false;

        }
        resetBoard();
    }, 700);
}
function resetBoard() {
    [hasFlippedCard, board] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();


function gameOver() {
    if (score === 8) {
        result.textContent = 'Congrats! you found all cards!';
        playAgain();

    }
}
function playAgain() {
    const button = document.createElement('button');
    button.textContent = 'Play Again';
    result.appendChild(button);
    button.addEventListener('click', () => {
        location.reload();
    });
}

cards.forEach(card => card.addEventListener('click', play));


