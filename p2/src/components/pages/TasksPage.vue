<template>
  <div>
          <todo-task v-for="task in allTasks" v-bind:key="task.id" v-bind:taskItem="task" />
  </div>
</template>

<script>
import TaskPage from '@/components/pages/TaskPage.vue'
export default {
    components: {
        'todo-task': TaskPage
    },
    props: {
        allTasks: {
            type: Array
        }
    }
}
</script>

<style>

</style>