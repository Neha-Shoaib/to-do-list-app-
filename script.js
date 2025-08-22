window.onload = renderTasks;

let taskContainer = JSON.parse(localStorage.getItem("tasks")) || [];
let save = document.querySelector(".saveButton");
let savedTasks = document.querySelector(".taskList");
let taskToSave = document.querySelector(".task");

// Function to add task
function addTask(inputValue) {
    taskContainer.push({ text: inputValue, checked: false }); // store as object
    localStorage.setItem("tasks", JSON.stringify(taskContainer));
    renderTasks();
}

// Function to render tasks on screen
function renderTasks() {
    savedTasks.innerHTML = ""; // clear old list first

    taskContainer.forEach((task, index) => {
        let li = document.createElement("li");

        // checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;

        // update checked state
        checkbox.addEventListener("change", () => {
            taskContainer[index].checked = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(taskContainer));
        });

        // text
        let text = document.createTextNode(task.text);

        li.appendChild(checkbox);
        li.appendChild(text);

        // delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "🗑";
        delBtn.style.marginLeft = "10px";
        delBtn.style.cursor = "pointer";
        li.appendChild(delBtn);

        delBtn.addEventListener("click", () => {
            taskContainer.splice(index, 1); // remove from array
            localStorage.setItem("tasks", JSON.stringify(taskContainer));
            renderTasks(); // re-render
        });

        savedTasks.appendChild(li);
    });
}

// click button
save.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = taskToSave.value.trim();
    if (inputValue !== "") {
        addTask(inputValue);
        taskToSave.value = "";
    } else {
        alert("Please enter a task!");
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
            alert("Please enter a task!");
        }
    }
});
