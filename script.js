const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".content-value");

let taskCount = 0;
let editMode = false;
let editElement = null;

const displayCount = (taskCount) => {
    countValue.value = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    if (editMode) {
        editElement.querySelector(".taskname").innerText = taskName;
        editMode = false;
        editElement = null;
        newTaskInput.value = "";
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check"></input>
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete">
        <i class="fa-solid fa-eraser"></i>
        </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            const taskElement = button.parentNode;
            const taskCheckbox = taskElement.querySelector(".task-check");
            if (!taskCheckbox.checked) {
                taskCount -= 1;
            }
            taskElement.remove();
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editbtn) => {
        editbtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className === "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling.innerText;
            editElement = targetElement.parentNode;
            editMode = true;
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};
