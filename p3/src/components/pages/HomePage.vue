<template>
  <div>
      <!-- <add-task v-on:update-tasks="update($event)"></add-task> -->
      <todo-tasks v-on:update-tasks="update($event)" v-bind:allTasks="allTasks"></todo-tasks>
  </div>
</template>

<script>
import TasksPage from '@/components/pages/TasksPage.vue'
// import AddTask from '@/components/pages/AddTask.vue'
export default {
    components: {
        'todo-tasks': TasksPage,
    },
    props: {
        allTasks: {
            type: Array
        }
    },
    methods: {
        update() {
            this.$emit('update-tasks');
        }
    }
}
</script>

<style>

</style>