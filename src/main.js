/* Main Script for To-Do-App */
// form
const formular = document.getElementById("todo-form");
// Eingabe Feld
const input = document.getElementById("todo-input");
// Aufgabe hinzufügen button
const submitButton = document.getElementById("todo-button");
// Ul Liste
const list = document.getElementById("todo-list");

// Array for Tasks
let tasks = []; // [Objects]
// Object for Task Status
const taskStatus = false;

/*
    Main Code Block
                    */

// Formular Funktion
formular.addEventListener("submit", function submitForm(e) {
  e.preventDefault();
  let newTask = input.value;
  newTask = newTask.trim();

  // Early Return
  if (!newTask) {
    alert("Task cannot be empty");
    return false;
  }

  // Object of a single Task
  let date = Date.now();
  const task = {
    status: false,
    text: newTask,
    id: date,
  };

  tasks.push(task);
  // Task added to ul
  renderToDos();
  // Local Storage Save
  saveTodos();
  // Clear Variable newTask
  newTask = "";
  // Clear Form Input Fields
  let allInputs = formular.querySelectorAll("input");
  allInputs.forEach((singleInput) => (singleInput.value = ""));
});

// Function to add new Task to ul List
function renderToDos() {
  list.innerHTML = "";

  // Add new Lines to List
  tasks.forEach((task) => {
    const checkBox = document.createElement("input");
    checkBox.classList.add("check-box");
    checkBox.setAttribute("aria-label", "Aufgabe erledigen");
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", () => toggleTaskCompletion(task.id));

    const span = document.createElement("span");
    span.classList.add("task-name");
    span.innerText = task.id + " " + task.text;
    // eslint-disable-next-line no-console
    console.log(span);

    const button = document.createElement("button");
    button.classList.add("delete-button");
    button.innerText = "Löschen";
    button.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderToDos();
      saveTodos();
    });

    const li = document.createElement("li");
    li.classList.add("list-item");
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(button);

    list.appendChild(li);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  task.completed = !task.completed;
  renderToDos();
  saveTodos();
}

function saveTodos() {
  // Early Return
  if (!tasks) {
    return false;
  }
  // Setzt die Daten in den Local Storage und speichert sie in Form eines Strings
  localStorage.setItem("todos", JSON.stringify(tasks));
}

function loadTodos() {
  // Holt die Daten aus dem Local Storage
  let json = localStorage.getItem("todos");
  // Speichert die geholten Daten in einem Json Format
  let todos = JSON.parse(json);
  if (todos === null) {
    tasks = [];
  } else {
    tasks = todos;
  }
  renderToDos();
  // eslint-disable-next-line no-console
  console.log("Local Storage Daten:" + tasks);
}

// Wird Ausgeführt beim Laden der Seite:
loadTodos();
renderToDos();
