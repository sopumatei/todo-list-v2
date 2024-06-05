import { loadHeader } from './modules/Header'
import { loadMain } from './modules/Main'
import { loadFooter } from './modules/Footer'
import { loadTaskFrame } from './modules/Add_Task_Frame'
import { activateHeader } from './modules/Header_Manipulator'
import { taskConfig } from './modules/Task_Configuration'
import { isDateInThisWeek } from './modules/Task_Configuration'
import { loadProjectFrame } from './modules/Add_Project_Frame'
import { projectConfig } from './modules/Project_Configuration'

import './style.css'

export function Task(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
}

export class Project {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

export let InboxProject = new Project("Inbox", []);
export let TodayProject = new Project("Today", []);
export let WeekProject = new Project("Week", []);
export let Projects = [];

let currentProject = null;

export const getCurrentProject = () => currentProject;
export const setCurrentProject = (project) => {
    currentProject = project;
};

const loadWebsite = () => {
    document.body.appendChild(loadHeader());
    document.body.appendChild(loadMain());
    document.body.appendChild(loadFooter());
    document.body.appendChild(loadTaskFrame());
    document.body.appendChild(loadProjectFrame());
}

loadWebsite();
activateHeader();

taskConfig();
projectConfig();

export const loadTasks = (project) => {
    const projectName = document.getElementById('project-name');
    projectName.textContent = project.name;
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';

    project.tasks.forEach((task) => {

        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
                
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const taskTitle = document.createElement('h2');
        taskTitle.textContent = task.title;
        taskHeader.appendChild(taskTitle);

        const removeBtn = document.createElement('button');
        taskHeader.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            project.tasks = project.tasks.filter((task) => task.title !== taskTitle.textContent);
            if(project != InboxProject) {
                InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            }

            const todayDate = new Date();
            const compareDate = new Date(task.date);

            if(todayDate.setHours(0,0,0,0) == compareDate.setHours(0,0,0,0)) {
                TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            }

            if(isDateInThisWeek(compareDate)) {
                WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            }

            loadTasks(project);
        })

        taskElement.appendChild(taskHeader);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskElement.appendChild(taskDescription);

        const taskDate = document.createElement('h4');
        taskDate.textContent = task.date;
        taskElement.appendChild(taskDate);

        tasksList.appendChild(taskElement);
    });
} 