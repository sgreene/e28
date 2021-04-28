<template>
<div>
   <div><button id="addNewTask" v-if="!addTask" v-on:click="toggleAddTask()" class="centerButton">Add Task</button></div>

    <div id="addForm" v-if="addTask">
        <div id="errorMsg" v-if="hasError">
         Error: {{ errors.title[0] }}
        </div>
        <div>
          <label for="taskTitle">Title</label>
          <input id="taskTitle" v-model="task.title" v-on:keyup="hasError = false"/>
        </div>
        <div>
          <label for="taskDescription">Description</label>
          <textarea id="taskDescription" v-model="task.description"></textarea>
        </div>
        <div>
          <label for="taskPriority">Priority</label>
          <select name="taskPriority" id="taskPriority" v-model.number="task.priority">
              <option value="0">High</option>
              <option value="1">Medium</option>
              <option value="2">Low</option>
          </select>
        </div>
        <div>
          <button id="doneBtn" class="button" v-on:click="submitTask()">Done</button>
          <button id="cancelBtn" v-on:click="toggleAddTask()" class="button">Cancel</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import { axios } from '@/common/app.js'
export default {
  data() {
    return {
      addTask: false,
      task: {
        title:"",
        description:"",
        priority:0,
        completed:false
      },
      errors: null,
      hasError: false,
    }
  },
  methods: {
    toggleAddTask() {
      this.addTask = !this.addTask;
      //reset fields
      this.task.title = "";
      this.task.description = "";
      this.task.priority = 0;
      this.errors = null;
      this.hasError = false;
    },
    submitTask() {
      axios.post('/task',this.task).then((response) => {
        if(response.data.errors) {
          this.errors = response.data.errors;
          this.hasError = true;
        }else {
          this.$emit('update-tasks');
          this.toggleAddTask();
        }
        
      })
    }
  }
}
</script>

<style scoped>
#errorMsg {
  border-style: solid;
  border-width: 1px;
  border-color: red;
  margin-bottom: 5px;
  background-color: red;
  font-weight: bolder;
  color: antiquewhite;
}
#addForm {
  width: 50%;
  height: 180px;
  border-radius: 15px;
  border-style: solid;
  border-width: 2px;
  margin: auto;
  padding: 10px;
  
}

  label {
    display: inline-block;
    width: 110px;
    color: #777777;
    text-align: right;
    margin-right: 5px;
  }
  input,textarea,select {
    padding: 5px 10px;
    width: 150px;
  }

  .centerButton {
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
  }

  #addNewTask {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
  #addNewTask:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

  .button {
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    
    font-size: 12px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    float: right;
  }
  #doneBtn {
    background-color: white; 
    color: black; 
    border: 2px solid #008CBA;
  }
  #doneBtn:hover {
    background-color: #008CBA;
    color: white;
  }
  #cancelBtn {
     background-color: white;
     color: black;
     border: 2px solid #e7e7e7;
  }

</style>