<template>
  <div id="taskbox" :style="cssVars">
      <p>{{ taskItem.title }}</p>
      <p>{{ taskItem.description }}</p>
  </div>
</template>

<script>
export default {
    props: {
        taskItem: {
            type: Object
        }
    },
    data() {
        return {
            colors: ["red","green","blue"]
        }
    },
    computed: {
        cssVars () {
            return {
                '--color': this.colors[this.taskItem.priority]
            }
        }
    }
}
</script>

<style scoped>
#taskbox {
    background-color: var(--color);
    border: 02px;
    border-style: solid;
    border-radius: 25px;
    margin-top: 10px;
}
</style>