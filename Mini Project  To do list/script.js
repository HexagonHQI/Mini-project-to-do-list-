const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');

// Function to create a task object
function createTask(name, description, startDateTime, endDateTime) {
  return {
    name,
    description,
    startDateTime,
    endDateTime,
    isCompleted: false,
  };
}

// Function to load tasks from local storage
function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Function to save tasks to local storage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks
function displayTasks(tasks) {
  tasksList.innerHTML = ''; 
  tasks.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)); 

  for (const task of tasks) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    // Display task details
    listItem.innerHTML = `
      <h3>${task.name}</h3>
      <p>Start: ${task.startDateTime}</p>
      <p>Days left: ${calculateDaysLeft(task.endDateTime)}</p>
    `;

    // Add checkbox and color based on completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener('change', () => {
      task.isCompleted = !task.isCompleted;
      saveTasks(tasks);
      displayTasks(tasks);
    });
    listItem.appendChild(checkbox);

    // Display color based on completion and deadline
    listItem.style.color = getColorForTask(task);

    // Add click event listener for description 
    listItem.addEventListener('click', () => {
      // Toggle description visibility
    });

    tasksList.appendChild(listItem);
  }
}

// Function to calculate days left for a task
function calculateDaysLeft(endDateTime) {
  const now = new Date();
  const endDate = new Date(endDateTime);
  const diffInMs = endDate - now;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

// Function to get color based on task completion and deadline
function getColorForTask(task) {
  if (task.isCompleted) {
    return 'green'; // Completed
  } else {
    const now = new Date();
    const endDate = new Date(task.endDateTime);
    return now > endDate ? 'red' : 'black'; // Overdue or ongoing
  }
}

// Event listener for form submission
taskForm.addEventListener('submit','')
