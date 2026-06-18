const cont = document.querySelector("#input-task");
const addTask = document.querySelector("#add-task");
const pendingList = document.querySelector("#pending ul");
const completedList = document.querySelector("#finished ul");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


cont.addEventListener("keydown",(event) => {
    if(event.key === "Enter"){
        addTask.click();
    }       
});

addTask.addEventListener("click",()=>{
    if(cont.value.trim() != "" ){

    createTask(cont.value.trim());

    
    tasks.push(cont.value.trim());
    
    localStorage.setItem("tasks",JSON.stringify
    (tasks));
    
    cont.value="";
    }
});

const createTask = (taskValue) =>{
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");   
    
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    
    const action = document.createElement("div");
    action.classList.add("action");
    
    const del = document.createElement("button");
    del.classList.add("del-btn");
    
    const completed = document.createElement("button");
    completed.classList.add("comp-btn");
    
    const edit = document.createElement("button");
    edit.classList.add("edit-btn");

    taskText.append(taskValue);
    
    taskCard.append(taskText);
    taskCard.append(action);
    
    action.append(del);
    action.append(completed);
    action.append(edit);

    del.innerHTML = '<i class="fa-solid fa-trash"></i>';
    completed.innerHTML = '<i class="fa-solid fa-check"></i>';
    edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
    
    pendingList.append(taskCard);
    console.log(pendingList);

    del.addEventListener("click",() =>{
        const delTask = tasks.indexOf(taskValue);
        
        if(delTask !== -1){
            tasks.splice(delTask,1);
        }
        localStorage.setItem("tasks",JSON.stringify(tasks));
        
        taskCard.remove();
    });
    
    completed.addEventListener("click",() =>{
        completedList.append(taskCard);
    });
    
    edit.addEventListener("click",() =>{
        const newText = prompt();
        if(newText != null && newText.trim() != "")
        {
            const idx = tasks.indexOf(taskValue); 
            taskText.innerText = newText.trim();
            tasks.splice(idx,1,newText);
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
    });

     let visible = false;
    taskCard.addEventListener("click",() =>{
        if(!visible)
            {
                console.log("visible");
                action.style.display = "flex";
                visible = true;
            }
            else
                {
                    console.log("hidden");
                    action.style.display = "none";
                    visible = false;
                }
            });

}

// localStorage.setItem("test","hello");
tasks.forEach((task) =>{
    createTask(task);
})