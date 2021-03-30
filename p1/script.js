// Define the options of our application
const Game = {
    data() {
        return {
            playerName: '',
            gameStarted: false,
            usedLetters: [],
            currentAnswer: [],
            randomAnswer: {},
            guessNum: 0,
            roundOver: false,
            rounds: [],
            answers: [
                {
                    answer: "birthday",
                    hint: "Annual celebration"
                },
                {
                    answer: "kremlin",
                    hint: "Russia's Whitehouse."
                },
                {
                    answer: "andromeda",
                    hint: "A galaxy not so far away."
                },
                {
                    answer: "elated",
                    hint: "Happy."
                },
                {
                    answer: "hydrogen",
                    hint: "Sun fuel."
                },
                {
                    answer: "lakshmi",
                    hint: "Mother goddess."
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
            ]
        }
    },
    computed: {
        
        roundWon() {
            let fullCurrentAnswer = this.currentAnswer.join("");
            return (fullCurrentAnswer == this.randomAnswer.answer);
        },
        allWins() {
            let wonRounds = this.rounds.filter( w => w.won);
            return wonRounds.length;
        },
        allLosses() {
            let lostRounds = this.rounds.filter( l => !l.won);
            return lostRounds.length;
        }
    },
    methods: {
        /**
         * Initializes the properties of a guess.
         * A random answer is selected from the array of possible answers. The current answer which is 
         * essentially the users guess is initialized to an array of dashes (-)
         */
        initGuess() {
            let rnd = Math.floor(Math.random() * Math.floor(this.answers.length));
            let rndAnswer = {};
            let answer = this.answers[rnd];
            rndAnswer.index = rnd;
            rndAnswer.answer = answer.answer;
            rndAnswer.hint = answer.hint;
            this.randomAnswer = rndAnswer;
            this.currentAnswer = '-'.repeat(answer.answer.length).split(''); 
        },
        /**
         * Starts the game. The player name must not be empty. The first guess is initialized.
         */
        startGame() {
            if(this.playerName.trim().length > 0) {
                this.gameStarted = true
            }
            this.initGuess();
        },
        /**
         * Invoked at the end of each round via an event.
         * @param event 
         */
        closeRound(event) {
            let round = {};
            let fullCurrentAnswer = this.currentAnswer.join("");
            round.won = (fullCurrentAnswer == this.randomAnswer.answer);
            this.rounds.push(round);
            this.roundOver = false;
            this.guessNum = 0;
            this.initGuess();
        },
        /**
         * Processes a guess from the user. The event is propagated with information
         * about the current user guess which is a single letter and the index of the answer that it needs to be checked against.
         * @param event The event
         */
        processGuess(event) {
            let guessedLetter = event.guess;
            let correctAnswer = this.answers[event.index].answer;
        
            //ensure the letter is actually numeric
            if((/[a-zA-Z]/).test(guessedLetter)) {
                let guessedRight = false;
                let foundLetters = 0;
                //loop through all letters to see if the match the guessed letter
                for(let i = 0; i < correctAnswer.length; i++) {
                    if(correctAnswer[i] === guessedLetter) {
                        this.currentAnswer[i] = guessedLetter;
                        foundLetters++;
                    }
                }
                guessedRight = (foundLetters > 0);
                if(guessedRight) {
                    let fullCurrentAnswer = this.currentAnswer.join("");
                    if(fullCurrentAnswer === this.randomAnswer.answer) {
                        
                        this.roundOver = true;
                    }
                }else {
                    this.guessNum++;
                    if(this.guessNum == 6) {
                        this.roundOver = true;
                    }
                }
            }
        }
        
    },
    

};

/**
 * A component that represents a user's guess. 
 */
const PlayerGuess = {
    name: 'PlayerGuess',
    data() {
        return {
           playerGuess: '',
           currentLetter: '',
           usedLetters: ''
        }
    },
    props: {
        answer: Object,
        ans: Array,
        guessingOver: Boolean
    },

    computed: {
        correctAnswer() {
            return this.answer.answer;
        },
        hint() {
            return this.answer.hint;
        },
        dashes() {
            let word = '-'.repeat(this.answer.answer.length); 
            return word;
        }
    },
    methods: {
        /**
         * Updates letters already used.
         * @param  l 
         * @returns 
         */
        updateUsedLetters(l) {
            let found = false;
            let letter = l.toLowerCase();
            for( let i =0; i < this.usedLetters.length;i++) {
                if(this.usedLetters[i].toLowerCase() === letter) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                this.usedLetters += letter;
                return true;
            }
            return false;
        },
        submitGuess() {
            if(this.currentLetter.length > 0 && this.updateUsedLetters(this.currentLetter)) {
                this.playerGuess += this.currentLetter;
                let lastGuess = {};
                lastGuess.index = this.answer.index;
                lastGuess.guess = this.currentLetter
                this.currentLetter = '';
                this.$emit('guessed-letter',lastGuess);
                
            }
        },
        nextRound() {
            this.usedLetters = '';
            this.$emit('round-over');
        }
    },
    template: '#player-guess'
}

/*
* A Hangman State component. Holds state of current game with images
*/
const HangmanState = {
    name: 'HangmanState',
    data() {
        return {
            maxState: 6,
            images: [
                'images/hangman0.png',
                'images/hangman1.png',
                'images/hangman2.png',
                'images/hangman3.png',
                'images/hangman4.png',
                'images/hangman5.png',
                'images/hangman6.png'
            ],
            hangman: false,
            currentImage: 'images/hangman0.png',
        }
    },
    props: ['state'],
    template: '#hangman-state'
};

const app = Vue.createApp(Game);

app.component('hangman-state',HangmanState);
app.component('player-guess',PlayerGuess);

// Create a new Vue instance using our options
app.mount('#app');