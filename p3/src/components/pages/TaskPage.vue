<template>
  <div id="taskbox" :style="cssVars">
      <p>{{ taskItem.title }}</p>
      <button id="deleteBtn" v-on:click="deleteTask()"><img src='@/assets/delete.png' height="28" width="28"/></button>
      <p>{{ taskItem.description }}</p>
      
  </div>
</template>

<script>
import { axios } from '@/common/app.js'
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
    },
    methods: {
        deleteTask() {
            axios.delete(`task/${this.taskItem.id}`).then( (res) => {
                if(!res.data.errors) {
                    this.$emit('update-tasks');
                }
            });
            
        }
    }
}
</script>

<style scoped>
  button {
    background-color: var(--color);
    border: none;
    color: white;
    border-radius: 25px;
    float: right;
    height: 30px;
  }
  #deleteBtn {
      display: block;
      height: 28px;
      widows: 28px;
  }
#taskbox {
    background-color: var(--color);
    border: 02px;
    border-style: solid;
    border-radius: 25px;
    margin-top: 5px;
}
</style>