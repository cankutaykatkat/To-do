const taskInput = document.getElementById("task-to-add");
const addButton = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const warningModal = new bootstrap.Modal(
  document.getElementById("warningModal"),
  {}
);

let taskCounter = 0;

let savedTasks = {};

window.addEventListener("load", () => {
  if (localStorage.getItem("tasks")) {
    savedTasks = JSON.parse(localStorage.getItem("tasks"));
    taskCounter = Object.keys(savedTasks).length;
    for (const key in savedTasks) {
      taskContainer.innerHTML += createTaskHTML(
        savedTasks[key].taskContent,
        key,
        savedTasks[key].taskStatus
      );
    }
  }
});

addButton.addEventListener("click", () => {
  if (taskInput.value) {
    savedTasks[++taskCounter] = {
      taskContent: taskInput.value,
      taskStatus: false,
    };

    taskContainer.innerHTML += createTaskHTML(taskInput.value, taskCounter);

    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    taskInput.value = "";
    taskInput.focus();
  } else {
    warningModal.show();
  }
});
