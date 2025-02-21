const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    document.getElementById("taskList").innerHTML = tasks.map(task =>
        `<li>${task.text} <button onclick="deleteTask('${task._id}')">X</button></li>`
    ).join('');
}

async function addTask() {
    const task = document.getElementById("taskInput").value;
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();
