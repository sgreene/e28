// Define the options of our application
const Game = {
    data() {
        return {
            playerName: '',
            guesses: ["One"]
        }
    }
}

// Create a new Vue instance using our options
const app = Vue.createApp(Game).mount('#app');