// Import necessary modules for header, main, footer, task frame, header manipulator, task configuration, date utilities, and project frame
import { loadHeader } from './modules/Header';
import { loadMain } from './modules/Main';
import { loadFooter } from './modules/Footer';
import { loadTaskFrame } from './modules/Add_Task_Frame';
import { activateHeader } from './modules/Header_Manipulator';
import { taskConfig } from './modules/Task_Configuration';
import { isDateInThisWeek } from './modules/Task_Configuration';
import { loadProjectFrame } from './modules/Add_Project_Frame';
import { projectConfig } from './modules/Project_Configuration';

import './style.css'; // Import global styles

// Task constructor function to create a task object with title, description, and date properties
export function Task(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
}

// Project class to create project objects that contain a name and an array of tasks
export class Project {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    // Method to add a task to the current project's task list
    addTask(task) {
        this.tasks.push(task);
    }
}

// Initialize key projects for inbox, today, and this week, and an array to store custom projects
export let InboxProject = new Project("Inbox", []);
export let TodayProject = new Project("Today", []);
export let WeekProject = new Project("Week", []);
export let Projects = []; // Custom projects are stored here

let currentProject = null; // Variable to track the currently active project

// Get the current active project
export const getCurrentProject = () => currentProject;

// Set the active project to the provided project and update currentProject
export const setCurrentProject = (project) => {
    currentProject = project;
};

// Load stored project data from local storage if it exists
const loadStorage = () => {
    if (localStorage.getItem('Inbox')) {
        InboxProject.tasks = JSON.parse(localStorage.getItem('Inbox'));
    }

    if (localStorage.getItem('Today')) {
        TodayProject.tasks = JSON.parse(localStorage.getItem('Today'));
    }

    if (localStorage.getItem('Week')) {
        WeekProject.tasks = JSON.parse(localStorage.getItem('Week'));
    }

    if (localStorage.getItem('Projects')) {
        Projects = JSON.parse(localStorage.getItem('Projects'));
        console.log(Projects);
    }
};

loadStorage(); // Load projects from local storage on page load

// Update local storage with the latest tasks and project data
export const updateStorage = () => {
    localStorage.setItem('Inbox', JSON.stringify(InboxProject.tasks));
    localStorage.setItem('Today', JSON.stringify(TodayProject.tasks));
    localStorage.setItem('Week', JSON.stringify(WeekProject.tasks));
    localStorage.setItem('Projects', JSON.stringify(Projects));
};

// Load the website structure by appending header, main, footer, and task/project frames to the body
const loadWebsite = () => {
    document.body.appendChild(loadHeader());
    document.body.appendChild(loadMain());
    document.body.appendChild(loadFooter());
    document.body.appendChild(loadTaskFrame());
    document.body.appendChild(loadProjectFrame());
};

loadWebsite(); // Call the function to load the website's structure
activateHeader(); // Activate header interactions

taskConfig(); // Initialize task configuration
projectConfig(); // Initialize project configuration

// Load tasks for a specified project and display them in the UI
export const loadTasks = (project) => {
    const projectName = document.getElementById('project-name');
    projectName.textContent = project.name;

    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = ''; // Clear existing tasks

    project.tasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const taskTitle = document.createElement('h2');
        taskTitle.textContent = task.title;
        taskHeader.appendChild(taskTitle);

        // Remove button for deleting tasks
        const removeBtn = document.createElement('button');
        taskHeader.appendChild(removeBtn);

        // Add an event listener to remove the task from all projects
        removeBtn.addEventListener('click', () => {
            InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            WeekProject.tasks = InboxProject.tasks.filter((task) => task.title !== taskTitle.textContent);

            // Remove task from each custom project in Projects
            for (let i = 0; i < Projects.length; ++i) {
                Projects[i].tasks = Projects[i].tasks.filter((task) => task.title !== taskTitle.textContent);
            }

            updateStorage(); // Save updated tasks to local storage
            loadTasks(project); // Reload tasks to reflect changes in the UI
        });

        taskElement.appendChild(taskHeader);

        // Task description and date display
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskElement.appendChild(taskDescription);

        const taskDate = document.createElement('h4');
        taskDate.textContent = task.date;
        taskElement.appendChild(taskDate);

        tasksList.appendChild(taskElement); // Append the task element to the list
    });
};
