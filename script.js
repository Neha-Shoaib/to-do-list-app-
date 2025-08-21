let taskContainer = JSON.parse(localStorage.getItem("tasks")) || [];
let save = document.querySelector(".saveButton");
let savedTasks = document.querySelector(".taskList");
let taskToSave = document.querySelector(".task");

// Function to render tasks on screen
function renderTasks() {
    savedTasks.innerHTML = ""; // clear old list first
    taskContainer.forEach((task) => {
        let li = document.createElement("li");
        li.textContent = task;

        // delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.style.marginLeft = "10px";
        delBtn.style.cursor = "pointer";
        li.appendChild(delBtn);

        delBtn.addEventListener("click", () => {
            li.remove(); //remove from UI
            taskContainer = taskContainer.filter(t => t !== task); //remove from array
            localStorage.setItem("tasks", JSON.stringify(taskContainer)); //storing in local Storage
        });

        savedTasks.appendChild(li);
    });
}

// first render from localStorage when page loads
renderTasks();

// function to add task
function addTask(inputValue) {
    taskContainer.push(inputValue);
    localStorage.setItem("tasks", JSON.stringify(taskContainer)); // save in local storage
    renderTasks();
}

// click button
save.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = taskToSave.value.trim();
    if (inputValue !== "") {
        addTask(inputValue);
        taskToSave.value = "";
    } else {
        alert("please enter a task!");
    }
});

// press enter key
taskToSave.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        let inputValue = taskToSave.value.trim();
        if (inputValue !== "") {
            addTask(inputValue);
            taskToSave.value = "";
        } else {
            alert("please enter a task!");
        }
    }
});
