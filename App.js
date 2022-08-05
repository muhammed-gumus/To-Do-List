const newTask = document.querySelector('.input-task')
const newTaskBtn = document.querySelector('.btn-task-push')
const taskList = document.querySelector('.task-list')
// const radioBtn1 = document.querySelector('radio1-btn')
// const radioBtn2 = document.querySelector('radio2-btn')
// const radioBtn3 = document.querySelector('radio3-btn')
const radioBtn = document.querySelector('.radio')

newTaskBtn.addEventListener('click', taskPush)
taskList.addEventListener('click', btnEvent)
document.addEventListener('DOMContentLoaded', localStorageRead);
radioBtn.addEventListener('click', radioEvent);
 


function taskItem(task){
  const taskDiv = document.createElement('div')
  taskDiv.classList.add('task-item')

  const taskLi = document.createElement('div')
  taskLi.classList.add('desc')
  taskLi.innerText = task;
  taskDiv.appendChild(taskLi)
  taskDiv.contentEditable = false;

  const completedBtn = document.createElement('button')
  completedBtn.classList.add('task-btn')
  completedBtn.classList.add('task-btn-completed')
  completedBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>'
  taskDiv.appendChild(completedBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('task-btn')
  deleteBtn.classList.add('task-btn-delete')
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  taskDiv.appendChild(deleteBtn)

  const editBtn = document.createElement('button')
  editBtn.classList.add('task-btn')
  editBtn.classList.add('task-btn-edit')
  editBtn.innerHTML = '<i class="fa fa-edit"></i>'
  taskDiv.appendChild(editBtn)
 
  
  taskList.appendChild(taskDiv)
}

function radioEvent(e){
  const list = taskList.childNodes;
  // list[0].remove(); 
  console.log(list.length);

  list.forEach(function(todo){

    const x = todo
    console.log(x);
    switch(e.target.value){
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = 'flex';
        }
        else{
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        }  
        else{
          todo.style.display = "none";
        }
        break;
      case "all":
        todo.style.display = "flex"  
    }
  })
  
}

function taskPush (e) {
  e.preventDefault()
  taskItem(newTask.value);
  localStorageSave(newTask.value);
  newTask.value = ''; 
}

function btnEvent (e) {
  const clicked = e.target
  

  if (clicked.classList.contains('task-btn-completed')) {
    clicked.parentElement.classList.toggle('task-completed')
    clicked.parentElement.classList.add('completed');
  }

  if (clicked.classList.contains('task-btn-delete')) {
    clicked.parentElement.remove()
    const deletedTask = clicked.parentElement.children[0].innerText;
    console.log(deletedTask);
    localStorageDelete(deletedTask);
  }

  if(clicked.classList.contains("task-btn-edit")){
    clicked.parentElement.contentEditable = true;
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('task-btn')
    doneBtn.classList.add('task-btn-done')
    doneBtn.innerHTML = 'OK'
    clicked.parentElement.appendChild(doneBtn);
    clicked.remove();
  }

  if(clicked.classList.contains("task-btn-done")){
    clicked.parentElement.contentEditable = false;
    const editBtn = document.createElement('button')
    editBtn.classList.add('task-btn')
    editBtn.classList.add('task-btn-edit')
    editBtn.innerHTML = '<i class="fa fa-edit"></i>'
    clicked.parentElement.appendChild(editBtn);
    clicked.remove();
  }
  
  

  
  
}

function localStorageSave(newTask){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
 
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStorageRead(){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    taskItem(task);
  });

}
 
function localStorageDelete(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  const deleteIndex = tasks.indexOf(task);
  console.log(deleteIndex);
  tasks.splice(deleteIndex, 1);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// editBtn.addEventListener("keypress", function(event){
//   if (event.key === "Enter"){
//     event.preventDefault();
//     document.getElementById("edit").click();
//   }
// })

/*if (event.key === "Enter"){
    event.preventDefault();
    KeyboardEvent.contentEditable = false;
    document.getElementById("desc").click();
    //console.log(contentEditable);
  }*/