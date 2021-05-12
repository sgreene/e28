<template>
  <!-- <home-page v-bind:allTasks="allTasks.sort((a,b) => (a.priority > b.priority) ? 1:-1)"></home-page> -->
  <div>
    <h1>Task Master</h1>
    <nav>
      <ul>
          <li>
              <router-link
                  v-for="link in links"
                  v-bind:key="link"
                  v-bind:to="paths[link]"
                  >{{ linkDisplay[link] }}</router-link
              >
          </li>
      </ul>
    </nav>
    <!-- <button @click="$router.push('/task/new')">Add Task</button> -->
    <router-view v-bind:allTasks='allTasks' v-on:update-tasks="refreshTasks($event)"></router-view>
  </div>
</template>

<script>
import { axios } from '@/common/app.js';

export default {
  
  name: 'App',
  
  data() {
    return {
      links: ['home', 'tasks','add','account'],
      paths: {
        home: '/',
        tasks: '/task',
        add: '/task/new',
        account: '/account'
      },
      linkDisplay: {
        home: 'Home',
        tasks: 'Todo Tasks',
        account: 'Account',
        add: 'Add Task',
      },
      allTasks: null
    }
  },
  mounted() {
    this.refreshTasks();
    this.$store.dispatch('authUser');
  },
  methods: {
    refreshTasks() {
        axios.get('task').then( response => {
        this.allTasks = response.data.task;
        this.allTasks.sort((a,b) => (a.priority > b.priority) ? 1:-1);
        this.allTasks = this.allTasks.filter( (t) => t.completed == "0");
      })
    }
  }
}
</script>

<style src='@/assets/taskmaster.css'>

</style>
<style>

</style>
