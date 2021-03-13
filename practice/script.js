const Practice = {
    data() {
        return {
            playerName: "Simeon",
            settings: {
                id: '100',
                name: 'joe',
                options: ["blue","red","yello"]
            }
        }
    }
}

const app = Vue.createApp(Practice).mount('#app');