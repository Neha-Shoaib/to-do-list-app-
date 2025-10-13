window.onload = renderTasks;
let currentCategory = "all"; // ✅ lowercase for consistency
let taskContainer = JSON.parse(localStorage.getItem("tasks")) || [];
let taskdeadline = document.getElementById("deadlineInput");
let save = document.querySelector(".saveButton");
let savedTasks = document.querySelector(".taskList");
let taskToSave = document.querySelector(".taskInput");
let priority = document.getElementById("priorityInput");
let priorityDisplay = document.getElementsByClassName("showPriority");
let toggleButton = document.getElementById('toggleBtn');
let body = document.body;
toggleButton.addEventListener("click", () => {
    body.classList.toggle('dark-mode');
});
// Function to add task
function addTask(inputValue, deadlineValue, priorityValue) {
    taskContainer.push({
        text: inputValue,
        checked: false,
        deadline: deadlineValue,
        priority: priorityValue,
        // ✅ never save "all" as a category
        category: currentCategory === "all" ? "Uncategorized" : currentCategory

    });
    localStorage.setItem("tasks", JSON.stringify(taskContainer));
    renderTasks();
}

// Function to render tasks on screen
function renderTasks() {
    savedTasks.innerHTML = ""; // clear old list


    let filteredTasks = taskContainer.filter(task =>
        currentCategory === "all" || task.category.toLowerCase() === currentCategory
    );

    filteredTasks.forEach((task) => {
        let li = document.createElement("li");
        let taskContent = document.createElement("div");
        taskContent.classList.add("taskContent");
        // checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;
        checkbox.style.paddingRight = "30px";

        let showdeadline = document.createElement("span");
        showdeadline.className = "taskdeadline";
        showdeadline.textContent = task.deadline ? "Deadline:" + task.deadline : "No deadline";



        checkbox.addEventListener("change", () => {
            let realIndex = taskContainer.findIndex(t =>
                t.text === task.text && t.category === task.category
            );
            if (realIndex > -1) {
                taskContainer[realIndex].checked = checkbox.checked;
                localStorage.setItem("tasks", JSON.stringify(taskContainer));
            }
            if (checkbox.checked) {
                textSpan.style.textDecoration = "line-through";
                li.style.backgroundColor = "lightgray";
                showdeadline.style.backgroundColor = "lightgray";
            }
            else {
                textSpan.style.textDecoration = "none";
                li.style.backgroundColor = "white";
                showdeadline.style.backgroundColor = "#ffe0e0";
            }

        });

        // text
        let taskTextBox = document.createElement("div");
        taskTextBox.className = "taskTextBox";
        let textSpan = document.createElement("span");
        textSpan.classList.add("taskText");
        textSpan.textContent = task.text;
        taskContent.appendChild(checkbox);
        taskTextBox.appendChild(textSpan);
        if (task.checked) {
            textSpan.style.textDecoration = "line-through";
            li.style.backgroundColor = "lightgray";

        }
        else {
            textSpan.style.textDecoration = "none";
            li.style.backgroundColor = "white";

        }

        // button Wrapper
        let btnDiv = document.createElement("div");
        btnDiv.classList.add("taskButtons");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "✏️";
        editBtn.style.marginLeft = "5px";
        editBtn.style.cursor = "pointer";

        editBtn.onclick = () => {
            let newtask = prompt("Enter task here", task.text);
            if (newtask !== "" && newtask.trim() !== "") {
                let realIndex = taskContainer.findIndex(t => t.text === task.text && t.category === task.category);

                if (realIndex > -1) {
                    taskContainer[realIndex].text = newtask.trim();
                    localStorage.setItem("tasks", JSON.stringify(taskContainer));
                    renderTasks();
                }
            }
        };
        // delete button
        let delBtn = document.createElement("button");
        delBtn.classList.add("delete");
        delBtn.textContent = "🗑";
        delBtn.style.cursor = "pointer";


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
        if (task.priority === "high") {
            prioritySpan.classList.add("priority-high");

        }
        else if (task.priority === "medium") {
            prioritySpan.classList.add("priority-medium");
            // prioritySpan.textContent= task;

        }
        else if (task.priority === "low") {
            prioritySpan.classList.add("priority-low");
            // prioritySpan.textContent= "Low";

        }
        btnDiv.appendChild(prioritySpan);
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(delBtn);
        taskTextBox.appendChild(showdeadline);
        taskContent.appendChild(taskTextBox)
        // taskContent.appendChild(prioritySpan);
        li.appendChild(taskContent);
        // li.appendChild(showdeadline);

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
    } else {
        alert("Please enter a task!");
    }
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
        } else {
            alert("Please enter a task!");
        }
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

// ✅ Function to change category
function selectCategory(cat) {
    currentCategory = cat.toLowerCase(); // store lowercase
    document.getElementById("currentCat").textContent =
        cat === "all" ? "All" : cat; // show nicely
    renderTasks();
}
