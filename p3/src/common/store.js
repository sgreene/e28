import { createStore, createLogger } from 'vuex'
import { axios } from '@/common/app.js';

// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
    plugins,
    state() {
        return {
            user: null,
            completed: 0
        }
    },
    mutations: {
        // [...existing mutations...]
        setUser(state, payload) {
            state.user = payload;
        },
        setCompleted(state,payload) {
            state.completed = payload;
        }
    },
    actions: {
        // [...existing actions...]
        authUser(context) {
            return new Promise((resolve) => {
                axios.post('auth').then((response) => {
                    if (response.data.authenticated) {
                        context.commit('setUser', response.data.user);
                    } else {
                        context.commit('setUser', false);
                    }
    
                    resolve();
                });
            });
        },
        completed(context,state) {
            return new Promise((resolve) => {
                axios.get('completed/query?user_id=' + state.user.id).then((response) => {
                     if(response.data.success) {
                        context.commit('setCompleted',response.data.completed.length);
                     }else {
                         context.commit('setCompleted',0);
                     }
    
                    resolve();
                });
            });
        }
    }
})