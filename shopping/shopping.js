const ShoppingList = {
    data() {
        return {
            items: [],
            qty: 0,
            item: "Oranges"
        }
    },
    methods: {
        addItem() {
            let newItem = [this.qty,this.item];
            this.items.push(newItem);
        },
        deleteItem(idx) {
            this.items.splice(idx,1);
        }
    }
};

// Create a new Vue instance using our options
const app = Vue.createApp(ShoppingList).mount('#shopping');

