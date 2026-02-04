let tasks = [];

const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');

function addTask() {
    if (!taskInput.value) return alert("Please enter a task!");

    const task = {
        id: Date.now(),
        text: taskInput.value,
        date: dateInput.value || 'No date',
        time: timeInput.value || 'No time',
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    renderTasks();
}

function editTask(id) {
    const newTaskText = prompt("Edit your task:");
    if (newTaskText) {
        tasks = tasks.map(t => t.id === id ? {...t, text: newTaskText} : t);
        renderTasks();
    }
}

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-info">
                <span class="task-text">${task.text}</span>
                <span class="task-time">📅 ${task.date} | ⏰ ${task.time}</span>
            </div>
            <div class="actions">
                <button onclick="toggleComplete(${task.id})">✔️</button>
                <button class="edit-btn" onclick="editTask(${task.id})">✏️</button>
                <button class="del-btn" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

addBtn.addEventListener('click', addTask);