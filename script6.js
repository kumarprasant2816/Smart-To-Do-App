// ===============================
// Smart To Do App
// ===============================

// Get HTML Elements

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const priority = document.getElementById("priority");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

// Task Array

let tasks = [];

// ===============================
// Add Button
// ===============================

addBtn.addEventListener("click", addTask);

// ===============================
// Add Task
// ===============================

function addTask(){

    let name = taskInput.value.trim();
    let date = taskDate.value;
    let time = taskTime.value;
    let level = priority.value;

    if(name==""){

        alert("Enter Task");

        return;

    }

    let task = {

        id:Date.now(),

        name:name,

        date:date,

        time:time,

        priority:level,

        completed:false

    };

    tasks.push(task);

    displayTasks();

    clearInput();

}

// ===============================
// Display Task
// ===============================

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach(function(task){

        let li=document.createElement("li");

        li.className="task";

        if(task.priority=="High"){

            li.classList.add("high");

        }

        else if(task.priority=="Medium"){

            li.classList.add("medium");

        }

        else{

            li.classList.add("low");

        }

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

        <h3>${task.name}</h3>

        <p><b>Date :</b> ${task.date}</p>

        <p><b>Time :</b> ${task.time}</p>

        <p><b>Priority :</b> ${task.priority}</p>

        <div class="task-buttons">

        <button class="complete">

        ${task.completed ? "Pending" : "Complete"}

        </button>

        <button class="edit">

        Edit

        </button>

        <button class="delete">

        Delete

        </button>

        </div>

        `;

        // Complete Button

        li.querySelector(".complete")

        .addEventListener("click",function(){

            completeTask(task.id);

        });

        // Edit Button

        li.querySelector(".edit")

        .addEventListener("click",function(){

            editTask(task.id);

        });

        // Delete Button

        li.querySelector(".delete")

        .addEventListener("click",function(){

            deleteTask(task.id);

        });

        taskList.appendChild(li);

    });

    updateCounter();

}

// ===============================
// Clear Input
// ===============================

function clearInput(){

    taskInput.value="";

    taskDate.value="";

    taskTime.value="";

    priority.value="High";

}
// ===============================
// Complete Task
// ===============================

function completeTask(id){

    tasks.forEach(function(task){

        if(task.id==id){

            task.completed=!task.completed;

        }

    });

    displayTasks();

}

// ===============================
// Delete Task
// ===============================

function deleteTask(id){

    let answer=confirm("Delete this task ?");

    if(answer){

        tasks=tasks.filter(function(task){

            return task.id!=id;

        });

        displayTasks();

    }

}

// ===============================
// Edit Task
// ===============================

function editTask(id){

    let task=tasks.find(function(item){

        return item.id==id;

    });

    if(task){

        let newTask=prompt("Edit Task",task.name);

        if(newTask!=null && newTask.trim()!=""){

            task.name=newTask;

        }

        let newDate=prompt("Edit Date",task.date);

        if(newDate!=null){

            task.date=newDate;

        }

        let newTime=prompt("Edit Time",task.time);

        if(newTime!=null){

            task.time=newTime;

        }

        let newPriority=prompt(

            "Priority (High/Medium/Low)",

            task.priority

        );

        if(newPriority!=null){

            task.priority=newPriority;

        }

        displayTasks();

    }

}

// ===============================
// Update Counter
// ===============================

function updateCounter(){

    let totalTask=tasks.length;

    let completedTask=0;

    tasks.forEach(function(task){

        if(task.completed){

            completedTask++;

        }

    });

    total.innerHTML=totalTask;

    completed.innerHTML=completedTask;

    pending.innerHTML=totalTask-completedTask;

}
// ===============================
// Search Task
// ===============================

const search = document.getElementById("search");

search.addEventListener("keyup", function () {

    let value = search.value.toLowerCase();

    let items = document.querySelectorAll(".task");

    items.forEach(function (item) {

        let taskName = item.querySelector("h3").innerText.toLowerCase();

        if (taskName.includes(value)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

});

// ===============================
// Filter Buttons
// ===============================

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");

allBtn.addEventListener("click", function () {

    displayTasks();

});

pendingBtn.addEventListener("click", function () {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        if (!task.completed) {

            createTaskCard(task);

        }

    });

});

completedBtn.addEventListener("click", function () {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        if (task.completed) {

            createTaskCard(task);

        }

    });

});

// ===============================
// Create Task Card
// ===============================

function createTaskCard(task) {

    let li = document.createElement("li");

    li.className = "task";

    if (task.priority == "High") {
        li.classList.add("high");
    }
    else if (task.priority == "Medium") {
        li.classList.add("medium");
    }
    else {
        li.classList.add("low");
    }

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <h3>${task.name}</h3>

        <p><b>Date :</b> ${task.date}</p>

        <p><b>Time :</b> ${task.time}</p>

        <p><b>Priority :</b> ${task.priority}</p>

        <div class="task-buttons">

            <button class="complete">
                ${task.completed ? "Pending" : "Complete"}
            </button>

            <button class="edit">
                Edit
            </button>

            <button class="delete">
                Delete
            </button>

        </div>
    `;

    li.querySelector(".complete").addEventListener("click", function () {
        completeTask(task.id);
    });

    li.querySelector(".edit").addEventListener("click", function () {
        editTask(task.id);
    });

    li.querySelector(".delete").addEventListener("click", function () {
        deleteTask(task.id);
    });

    taskList.appendChild(li);

}

// ===============================
// Reset All
// ===============================

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {

    if (confirm("Delete all tasks?")) {

        tasks = [];

        displayTasks();

    }

});

// ===============================
// Local Storage
// ===============================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

    let data = localStorage.getItem("tasks");

    if (data) {

        tasks = JSON.parse(data);

        displayTasks();

    }

}

// ===============================
// Auto Save
// ===============================

const oldDisplay = displayTasks;

displayTasks = function () {

    oldDisplay();

    saveTasks();

};

// ===============================
// Start App
// ===============================

loadTasks();