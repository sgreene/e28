<template>
  <div id="taskbox" :style="cssVars">
      <p>{{ taskItem.title }}</p>
      <button id="deleteBtn" v-on:click="deleteTask()"><img src='@/assets/delete.png' height="28" width="28"/></button>
      <p>{{ taskItem.description }}</p>
      <div v-if="$store.state.user" id="completedBox">
        <input type="checkbox" v-model="completed" id="taskCompleted" name="taskCompleted" @change="completeTask()">
        <label for="taskCompleted">Completed</label>
      </div>
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
            completed: false,
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
            
        },
        completeTask() {
            let task = this.taskItem;
            task.completed = (this.completed) ? "1":"0";
            axios.put(`task/${this.taskItem.id}`,task).then( (res) => {
                if(!res.data.errors) {
                    this.$emit('update-tasks');
                    //complete the task.
                    let completedData = {};
                    completedData.user_id = this.$store.state.user.id;
                    completedData.task_id = this.taskItem.id;
                    axios.post('completed',completedData).then ( (res) => {
                        if(res.success) {
                            console.log("Dispatching...");
                            this.$store.dispatch('completed');
                        }
                        
                    })
                }
            })
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
#completedBox {
    font-weight: bolder;
    color: azure;
}
</style>