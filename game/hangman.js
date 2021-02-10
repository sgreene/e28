
let currentAnswer = {};
let usedLetters = "";
let correctAnswer = [];
let guessNum = 0;
let remainingRight = 0;
//An array of hangman images.
const hangmanImages = [
    'https://i.postimg.cc/9fKQSyYn/hangman0.png',
    'https://i.postimg.cc/RV4VjSw4/hangman1.png',
    'https://i.postimg.cc/wT2TzCkJ/hangman2.png',
    'https://i.postimg.cc/htG4t2CY/hangman3.png',
    'https://i.postimg.cc/pdh2DpMY/hangman4.png',
    'https://i.postimg.cc/bv7qLpzX/hangman5.png',
    'https://i.postimg.cc/sX5sNqXM/hangman6.png'
];

//an enum for determining the state of the game.
const GameState = {
    INIT: 0,
    RUNNING: 1,
    END: 2
};

Object.freeze(GameState);

let currentState = GameState.INIT;


//Answers for the game along with hints
const answers = [
    {
        answer: "birthday",
        hint: "Annual celebration"
    },
    {
        answer: "kremlin",
        hint: "Russia's Whitehous"
    },
    {
        answer: "andromeda",
        hint: "A galaxy not so far away"
    },
    {
        answer: "elated",
        hint: "Happy"
    },
    {
        answer: "hydrogen",
        hint: "Sun fuel"
    },
    {
        answer: "lakshmi",
        hint: "Mother goddess,"
    },
    {
        answer: "sodium",
        hint: "Salt of the earth."
    },
    {
        answer: "mordor",
        hint: "One does not simply walk."
    },
    {
        answer: "maradona",
        hint: "Hand of God (sports)."
    },
    {
        answer: "satoshi",
        hint: "Elusive cryptocurrency genius."
    }
];

let hmid = 0;
/**
 * Changes the url of the hangman image.
 */
toggleHangman = (imgid) => {
    document.getElementById("hangmanimg").src=hangmanImages[imgid];
}

/**
 * Pick a random answer
 */
pickAnswer = () => {
    let rnd = Math.floor(Math.random() * Math.floor(answers.length));
    let answer = answers[rnd];
    return answer;
}

initializeGuess = (word) => {
    let wordInit = '-'.repeat(word.length); 
    document.getElementById('wordGuess').innerText = wordInit;
    correctAnswer = wordInit.split('');
}
updateUsedLetters = (l) => {
    let found = false;
    for( let i =0; i < usedLetters.length;i++) {
        if(usedLetters[i] === l) {
            found = true;
            break;
        }
    }
    if(!found) {
        usedLetters += l;
        return true;
    }
    return false;
}
guessLetter = () => {
    //get the value of the text box for guesses.
    const guess = document.getElementById('quessLetter').value.toLowerCase();
    //ensure the letter is actually numeric
    if((/[a-zA-Z]/).test(guess)) {
        const ans = currentAnswer.answer;
        //console.log(ans);
        let guessedRight = false;
        for(let i = 0; i < ans.length; i++) {
            if(ans[i] === guess) {
                correctAnswer[i] = guess;
                guessedRight = true;
            }
        }
        if(guessedRight) {
            document.getElementById('wordGuess').innerText = correctAnswer.join("");
            remainingRight--;
            console.log("Remaining right guesses = " + remainingRight);
        } else {
            if(updateUsedLetters(guess)) {
                guessNum++;
                toggleHangman(guessNum);
                console.log("Remaining wrong guesses = " + guessNum);
            }
            document.getElementById('usedLetters').innerText = usedLetters;
        }
    }
    document.getElementById('quessLetter').value = "";
    if(remainingRight === 0) {
        currentState = GameState.END;
    }
    updateGameState();
}

updateGameState = () => {
    if(guessNum >= 6) {
        currentState = GameState.END;
    }
    console.log(currentState);
    if(currentState === GameState.INIT) {
        //clear all variables and html
        document.getElementById('win').style.display = 'none';
        document.getElementById('lost').style.display = 'none';
        usedLetters = "";
        document.getElementById('usedLetters').innerText = "";
        document.getElementById('wordGuess').innerText = "";
        document.getElementById("restart").style.display = 'none';
        document.getElementById("guessButton").disabled = false;
        guessNum = 0;
        remainingRight = 0;
    } else if (currentState === GameState.END) {
        //console.log("End state");
        if(remainingRight === 0) {
            document.getElementById('win').style.display = 'block';
        }else {
            document.getElementById('lost').style.display = 'block';
        }
        document.getElementById("restart").style.display = 'block';
        document.getElementById("guessButton").disabled = true;
    }

}

restartGame = () => {
    currentState = GameState.INIT;
    initializeGame();
}

/**
 * Initialize the game. Called when the page is loaded and also when a game is restarted.
 */
initializeGame = () => {
    updateGameState();
    toggleHangman(guessNum);
    let questionDiv = document.getElementById("hint");
    let answer = pickAnswer();
    questionDiv.innerHTML = "<p><b>Hint: </b>" + answer.hint + "<p/>"
    initializeGuess(answer.answer);
    currentAnswer = answer;
    remainingRight = answer.answer.length;
    currentState = GameState.RUNNING;
}
window.onload =initializeGame;