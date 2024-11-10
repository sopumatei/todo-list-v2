// Importing classes, modules, and functions for task and project management
import {
  Task,
  Project,
  Projects,
  InboxProject,
  TodayProject,
  WeekProject,
  getCurrentProject,
  setCurrentProject,
  loadTasks,
  updateStorage,
} from "../index";

// Importing image for the close button
import closeImg from "../img/close.png";

// Function to create a task and add it to a specific project
const createTask = (project) => {
  // Getting input elements and task list container from the DOM
  const inputTitle = document.getElementById("input-title");
  const inputDescription = document.getElementById("input-description");
  const inputDate = document.getElementById("input-date");
  const tasksList = document.getElementById("tasks-list");

  // Create a new Task instance with user-provided values
  const task = new Task(
    inputTitle.value,
    inputDescription.value,
    inputDate.value
  );

  // Creating the task element in the UI
  const taskElement = document.createElement("li");
  taskElement.classList.add("task");

  // Creating the task header with title and remove button
  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task-header");

  const taskTitle = document.createElement("h2");
  taskTitle.textContent = inputTitle.value;
  taskHeader.appendChild(taskTitle);

  // Remove button setup for deleting a task
  const removeBtn = document.createElement("button");
  taskHeader.appendChild(removeBtn);

  removeBtn.addEventListener("click", () => {
    // Remove the task from all relevant projects (Inbox, Today, Week)
    InboxProject.tasks = InboxProject.tasks.filter(
      (task) => task.title !== taskTitle.textContent
    );
    TodayProject.tasks = TodayProject.tasks.filter(
      (task) => task.title !== taskTitle.textContent
    );
    WeekProject.tasks = InboxProject.tasks.filter(
      (task) => task.title !== taskTitle.textContent
    );

    // Remove the task from all projects in the Projects array
    Projects.forEach((proj) => {
      proj.tasks = proj.tasks.filter(
        (task) => task.title !== taskTitle.textContent
      );
    });

    // Update local storage and reload tasks in the UI
    updateStorage();
    loadTasks(project);
  });

  taskElement.appendChild(taskHeader);

  // Adding description and date elements to the task
  const taskDescription = document.createElement("p");
  taskDescription.textContent = inputDescription.value;
  taskElement.appendChild(taskDescription);

  const taskDate = document.createElement("h4");
  taskDate.textContent = inputDate.value;
  taskElement.appendChild(taskDate);

  tasksList.appendChild(taskElement); // Append task to the task list

  // Add the task to the current project and potentially to other projects
  project.tasks.push(task);
  if (project != InboxProject) {
    InboxProject.addTask(task);
  }

  // Check if task date matches Today or This Week, and add it accordingly
  const todayDate = new Date();
  const compareDate = new Date(inputDate.value);

  if (todayDate.setHours(0, 0, 0, 0) === compareDate.setHours(0, 0, 0, 0)) {
    TodayProject.addTask(task);
  }

  if (isDateInThisWeek(compareDate)) {
    WeekProject.addTask(task);
  }
  updateStorage(); // Update local storage after task creation
};

// Helper function to check if a date is in the current week
export const isDateInThisWeek = (date) => {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  // Get the first day of the current week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // Get the last day of the current week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  // Return true if the date falls within the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

// Configures the add-task functionality and handles task form interactions
export const taskConfig = () => {
  const addTaskBtn = document.getElementById("add-task-btn");
  const submitBtn = document.getElementById("submit-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const addTaskContainer = document.getElementById("add-task-container");
  const addTaskFrame = document.getElementById("add-task-frame");
  const inputTitle = document.getElementById("input-title");
  const inputDescription = document.getElementById("input-description");
  const inputDate = document.getElementById("input-date");

  // Show the task creation frame when the add task button is clicked
  addTaskBtn.addEventListener("click", () => {
    addTaskContainer.style.transform = "scale(1)";
    addTaskFrame.style.transform = "scale(1)";
    addTaskContainer.style.opacity = "1";
  });

  // Hide and reset the task creation form when the cancel button is clicked
  cancelBtn.addEventListener("click", () => {
    inputTitle.value = "";
    inputDescription.value = "";
    inputDate.value = "";

    addTaskFrame.style.transform = "scale(0)";
    addTaskContainer.style.opacity = "0";
    setTimeout(() => {
      addTaskContainer.style.transform = "scale(0)";
    }, 300);
  });

  // Function to check if a task with the same title already exists in the Inbox
  let canAddTask = (tskName) => {
    return !InboxProject.tasks.some(
      (task) => task.title.toLowerCase() === tskName.toLowerCase()
    );
  };

  let canClick = true; // Prevents multiple submissions
  submitBtn.addEventListener("click", () => {
    if (canClick) {
      // Validating form fields
      let check1 = false;
      let check2 = false;
      let check3 = false;
      let check4 = false;

      // Title field validation
      if (inputTitle.value !== "") {
        if (canAddTask(inputTitle.value)) {
          check1 = true;
        } else {
          inputTitle.value = "ALREADY EXISTS";
          canClick = false;
          setTimeout(() => {
            canClick = true;
            inputTitle.value = "";
          }, 500);
        }
      } else {
        inputTitle.value = "MISSING TITLE";
        canClick = false;
        setTimeout(() => {
          canClick = true;
          inputTitle.value = "";
        }, 500);
      }

      // Description field validation
      if (inputDescription.value !== "") {
        check2 = true;
      } else {
        inputDescription.value = "MISSING DESCRIPTION";
        canClick = false;
        setTimeout(() => {
          canClick = true;
          inputDescription.value = "";
        }, 500);
      }

      // Date field validation
      if (inputDate.value !== "") {
        check3 = true;
      } else {
        inputDate.style.color = "tomato";
        canClick = false;
        setTimeout(() => {
          canClick = true;
          inputDate.style.color = "black";
        }, 500);
      }

      // Checking if the date is valid and in the future
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const selectedDate = new Date(inputDate.value);

      if (selectedDate >= currentDate) {
        check4 = true;
      } else {
        inputDate.style.color = "tomato";
        canClick = false;
        setTimeout(() => {
          canClick = true;
          inputDate.style.color = "black";
        }, 500);
      }

      // Create task if all checks pass
      if (check1 && check2 && check3 && check4) {
        createTask(getCurrentProject());

        inputTitle.value = "";
        inputDescription.value = "";
        inputDate.value = "";

        addTaskFrame.style.transform = "scale(0)";
        addTaskContainer.style.opacity = "0";
        setTimeout(() => {
          addTaskContainer.style.transform = "scale(0)";
        }, 300);
      }
    }
  });
};
