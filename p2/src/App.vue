<template>
  <!-- <home-page v-bind:allTasks="allTasks.sort((a,b) => (a.priority > b.priority) ? 1:-1)"></home-page> -->
  <div>
    <nav>
      <ul>
          <li>
              <router-link
                  v-for="link in links"
                  v-bind:key="link"
                  v-bind:to="paths[link]"
                  >{{ link }}</router-link
              >
          </li>
      </ul>
    </nav>
    <router-view v-bind:allTasks='allTasks' v-on:update-tasks="refreshTasks($event)"></router-view>
  </div>
</template>

<script>
import { axios } from '@/common/app.js';

export default {
  
  name: 'App',
  
  data() {
    return {
      links: ['home', 'task'],
      paths: {
        home: '/',
        task: '/task'
      },
      allTasks: null
    }
  },
  mounted() {
    axios.get('task').then( response => {
      this.allTasks = response.data.task;
      this.allTasks.sort((a,b) => (a.priority > b.priority) ? 1:-1)
    })
  },
  methods: {
    refreshTasks() {
      console.log("Refreshing");
      axios.get('task').then( response => {
        console.log("Updating data")
      this.allTasks = response.data.task;
      this.allTasks.sort((a,b) => (a.priority > b.priority) ? 1:-1)
    })
    }
  }
}
</script>

<style src='@/assets/taskmaster.css'>

</style>
<style>

</style>
