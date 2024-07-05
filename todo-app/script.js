document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");
  const clearCompletedButton = document.getElementById("clear-completed");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);
      li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete">Complete</button>
                    <button class="delete">Delete</button>
                </div>
            `;
      li.querySelector(".complete").addEventListener("click", () =>
        toggleComplete(index)
      );
      li.querySelector(".delete").addEventListener("click", () =>
        deleteTask(index)
      );
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      updateLocalStorage();
      renderTasks();
    }
  }

  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
  }

  function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    updateLocalStorage();
    renderTasks();
  }

  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTaskButton.addEventListener("click", addTask);
  clearCompletedButton.addEventListener("click", clearCompletedTasks);
  renderTasks();
});
