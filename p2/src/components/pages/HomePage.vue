<template>
  <div>
      <h1>Task Master</h1>
      <add-task v-on:update-tasks="update($event)"></add-task>
      <todo-tasks v-bind:allTasks="allTasks"></todo-tasks>
  </div>
</template>

<script>
import TasksPage from '@/components/pages/TasksPage.vue'
import AddTask from '@/components/AddTask.vue'
export default {
    components: {
        'todo-tasks': TasksPage,
        'add-task': AddTask
    },
    props: {
        allTasks: {
            type: Array
        }
    },
    methods: {
        update() {
            console.log("Update called");
            this.$emit('update-tasks');
        }
    }
}
</script>

<style>

</style>