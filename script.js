window.onload = renderTasks;
let currentCategory = "all";
let currentPriority = "all"; 
let taskContainer = JSON.parse(localStorage.getItem("tasks")) || [];

let taskdeadline = document.getElementById("deadlineInput");
let save = document.querySelector(".saveButton");
let savedTasks = document.querySelector(".taskList");
let taskToSave = document.querySelector(".taskInput");
let priority = document.getElementById("priorityInput");
let toggleButton = document.getElementById('toggleBtn');
let body = document.body;

toggleButton.addEventListener("click", () => {
    body.classList.toggle('dark-mode');
});

//  Priority filter dropdown
let priorityFilter = document.getElementById("priorityFilter");
priorityFilter.addEventListener("change", () => {
    currentPriority = priorityFilter.value.toLowerCase();
    renderTasks();
});

// Add Task
function addTask(inputValue, deadlineValue, priorityValue) {
    taskContainer.push({
        text: inputValue,
        checked: false,
        deadline: deadlineValue,
        priority: priorityValue || "none",
        category: currentCategory === "all" ? "Uncategorized" : currentCategory
    });
    localStorage.setItem("tasks", JSON.stringify(taskContainer));
    renderTasks();
}

// Render Tasks
function renderTasks() {
    savedTasks.innerHTML = "";

    //  Filter by both category and priority
    let filteredTasks = taskContainer.filter(task =>
        (currentCategory === "all" || task.category.toLowerCase() === currentCategory) &&
        (currentPriority === "all" || task.priority.toLowerCase() === currentPriority)
    );

    filteredTasks.forEach((task) => {
        let li = document.createElement("li");
        let taskContent = document.createElement("div");
        taskContent.classList.add("taskContent");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;

        let showdeadline = document.createElement("span");
        showdeadline.className = "taskdeadline";
        showdeadline.textContent = task.deadline ? "Deadline: " + task.deadline : "No deadline";

        let textSpan = document.createElement("span");
        textSpan.classList.add("taskText");
        textSpan.textContent = task.text;

        let taskTextBox = document.createElement("div");
        taskTextBox.className = "taskTextBox";
        taskTextBox.appendChild(textSpan);
        taskTextBox.appendChild(showdeadline);
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                textSpan.style.textDecoration = "line-through";
                li.style.backgroundColor = "lightgray";
                showdeadline.style.backgroundColor = "lightgray";
            } else {
                textSpan.style.textDecoration = "none";
                li.style.backgroundColor = "white";
                showdeadline.style.backgroundColor = "#ffe0e0";
            }
            let realIndex = taskContainer.findIndex(t =>
                t.text === task.text && t.category === task.category
            );
            if (realIndex > -1) {
                taskContainer[realIndex].checked = checkbox.checked;
                localStorage.setItem("tasks", JSON.stringify(taskContainer));
            }


        });

        let btnDiv = document.createElement("div");
        btnDiv.classList.add("taskButtons");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            let newtask = prompt("Enter new task", task.text);
            if (newtask && newtask.trim() !== "") {
                let realIndex = taskContainer.findIndex(t =>
                    t.text === task.text && t.category === task.category
                );
                if (realIndex > -1) {
                    taskContainer[realIndex].text = newtask.trim();
                    localStorage.setItem("tasks", JSON.stringify(taskContainer));
                    renderTasks();
                }
            }
        };

        let delBtn = document.createElement("button");
        delBtn.classList.add("delete");
        delBtn.textContent = "🗑";
        delBtn.addEventListener("click", () => {
            let realIndex = taskContainer.findIndex(t =>
                t.text === task.text && t.category === task.category
            );
            if (realIndex > -1) {
                taskContainer.splice(realIndex, 1);
                localStorage.setItem("tasks", JSON.stringify(taskContainer));
                renderTasks();
            }
        });

        let prioritySpan = document.createElement("span");
        prioritySpan.classList.add("prioritySpan");
        prioritySpan.textContent = task.priority;
        if (task.priority === "high") prioritySpan.classList.add("priority-high");
        else if (task.priority === "medium") prioritySpan.classList.add("priority-medium");
        else if (task.priority === "low") prioritySpan.classList.add("priority-low");

        btnDiv.appendChild(prioritySpan);
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(delBtn);

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskTextBox);
        li.appendChild(taskContent);
        li.appendChild(btnDiv);
        savedTasks.appendChild(li);
    });
}

// Save button
save.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = taskToSave.value.trim();
    let deadlineValue = taskdeadline.value.trim();
    let priorityValue = priority.value.trim();
    if (inputValue !== "") {
        addTask(inputValue, deadlineValue, priorityValue);
        taskToSave.value = "";
        taskdeadline.value = "";
    } else alert("Please enter a task!");
});

// Enter key
taskToSave.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        let inputValue = taskToSave.value.trim();
        let deadlineValue = taskdeadline.value.trim();
        let priorityValue = priority.value.trim();
        if (inputValue !== "") {
            addTask(inputValue, deadlineValue, priorityValue);
            taskToSave.value = "";
            deadlineValue.value = "";
        } else alert("Please enter a task!");
    }
});

// Sidebar
let sidebar = document.getElementById("mySidebar");
let hamburger = document.querySelector(".hamburger");

function openSidebar() {
    document.addEventListener("click", outsideClickListener);
    sidebar.style.width = "250px";
}
function closeSidebar() {
    sidebar.style.width = "0px";
    document.removeEventListener("click", outsideClickListener);
}
function outsideClickListener(event) {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        closeSidebar();
    }
}

// Category Select
function selectCategory(cat) {
    currentCategory = cat.toLowerCase();
    document.getElementById("currentCat").textContent =
        cat === "all" ? "All" : cat;
    renderTasks();
}
