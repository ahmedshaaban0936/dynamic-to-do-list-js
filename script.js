document.addEventListener('DOMContentLoaded', function() {
    // Selecting DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();

        // If taskText is not empty, create a new task
        if (taskText !== '') {
            // Create new list item
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // Add click event to remove button
            removeButton.addEventListener('click', function() {
                listItem.remove();
            });

            // Append remove button to list item
            listItem.appendChild(removeButton);

            // Append list item to task list
            taskList.appendChild(listItem);

            // Clear the task input field
            taskInput.value = '';
        } else {
            // Alert user if task input is empty
            alert('Please enter a task.');
        }
    }
    // Function to update tasks array in local storage
    function updateTasksArray() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(taskElement) {
            tasks.push(taskElement.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
// Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }
    // Event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});