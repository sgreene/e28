import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/common/store.js'

import { router } from '@/common/router.js'

// import HomePage from '@/components/pages/HomePage.vue'
// import TasksPage from '@/components/pages/TasksPage.vue'

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/', component: HomePage},
//         { path: '/task', component: TasksPage}
//     ]
// })

createApp(App).use(router).use(store).mount('#app')
