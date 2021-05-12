<template>
    <div id="account-page">
        <div v-if="user">
            <h2>Hi, {{ user.name }}!</h2>

            <button v-on:click="logout">Logout</button>
        </div>
        <template v-else>
            <div id="loginForm">
                <h2>Login</h2>
                <div>
                    <label>
                        Email: &nbsp; &nbsp;&nbsp; &nbsp;<input type="text" v-model="data.email" />
                    </label>
                </div>
                <div>
                    <label>
                        Password: <input type="password" v-model="data.password" />
                    </label>
                </div>

                <button class="button" v-on:click="login">Login</button>

                <ul v-if="errors">
                    <li class="error" v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div><p>-Or-</p></div>
            <div id="newAccount">
                <h2>Create New Account</h2>
                <div>
                    <label>
                        Name: &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<input type="text" v-model="newUser.name" />
                    </label>
                </div>
                <div>
                    <label>
                        Email: &nbsp; &nbsp;&nbsp; &nbsp;<input type="text" v-model="newUser.email" />
                    </label>
                </div>
                <div>
                    <label>
                        Password: <input type="password" v-model="newUser.password" />
                    </label>
                </div>

                <button class="button" v-on:click="newAccount">Create Account</button>

                <ul v-if="createErrors">
                    <li class="error" v-for="(error, index) in createErrors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
    data() {
        return {
            // Form is prefilled for demonstration purposes; remove in final application
            // jill@harvard.edu/asdfasdf is one of our seed users from e28api/seeds/user.json
            data: {
                email: "",
                password: "",
            },
            errors: null,
            createErrors: null,
            favorites: [],
            newUser: {}
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        // products() {
        //     return this.$store.state.products;
        // },
    },
    methods: {
        loadFavorites() {
            if (this.user) {
                axios
                    .get("favorite/query?user_id=" + this.user.id)
                    .then((response) => {
                        this.favorites = response.data.favorite.map(
                            (favorite) => {
                                return this.$store.getters.getProductById(
                                    favorite.product_id
                                );
                            }
                        );
                    });
            }
        },
        login() {
            axios.post("login", this.data).then((response) => {
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
        logout() {
            axios.post("logout").then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", null);
                }
            });
        },
        newAccount() {
            axios.post("register",this.newUser).then((response) => {
                if(!response.data.success) {
                    this.createErrors = response.data.errors;
                }
            })
        }
    },
    watch: {
        user() {
            //this.loadFavorites();
        },
    },
    mounted() {
        //this.loadFavorites();
    },
};
</script>
<style scoped>
#loginForm {
  width: 50%;
  height: 250px;
  border-radius: 15px;
  border-style: solid;
  border-width: 2px;
  margin: auto;
  padding: 10px;
  
}

  label {
    
    width: 110px;
    color: #777777;
    text-align: right;
    margin-right: 5px;
  }
  input,textarea,select {
    padding: 5px 10px;
    width: 150px;
    margin-bottom: 5px;
  }

  .button {
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
  }
  </style>