const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on load
tasks.forEach((task, index) => renderTask(task.text, task.done, index));

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  updateLocalStorage();
  renderTask(taskText, false, tasks.length - 1);
  taskInput.value = "";
});

function renderTask(text, done, index) {
  const li = document.createElement("li");
  li.innerText = text;
  if (done) li.classList.add("completed");

  li.addEventListener("click", () => {
    tasks[index].done = !tasks[index].done;
    updateLocalStorage();
    li.classList.toggle("completed");
  });

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks.splice(index, 1);
    updateLocalStorage();
    location.reload(); // quick way to re-render list
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
