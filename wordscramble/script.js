// Define the options of our application
const Game = {
    data() {
        return {
            playerName: '',
            started: false,
            words: [
                ['apple', 'Sometimes red, sometimes delicious'],
                ['washington', 'Rushmore’s left edge'],
                ['pumpkin', 'Halloween’s favorite fruit'],
                ['football', 'Play with your hands or feet, depending on your location']
                ],
            scrambledWord: "",
            wordIndex: 0,
            guess: "",
            gameOver: false
        }
    },
    computed: {
        won() {
            return this.guess === this.words[this.wordIndex][0];
        },
        lost() {
            return this.guess != this.words[this.wordIndex][0];
        }
    },
    methods: {
        startGame() {
            if(this.playerName.length === 0) return;
            this.started = true;
            this.wordIndex = Math.floor(Math.random() * Math.floor(this.words.length));
            console.log("Word index " + this.wordIndex);
            let shuffledArray = this.shuffle(this.words[this.wordIndex][0].split(""));
            this.scrambledWord = shuffledArray.join('');
        },

        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },
        submitGuess() {
            this.gameOver = true;
        }
    }

}

// Create a new Vue instance using our options
const app = Vue.createApp(Game).mount('#app');