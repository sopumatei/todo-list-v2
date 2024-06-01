import { loadHeader } from './modules/Header'
import { loadMain } from './modules/Main'
import { loadFooter } from './modules/Footer'
import { loadTaskFrame } from './modules/Add_Task_Frame'
import { activateHeader } from './modules/Header_Manipulator'
import { taskConfig } from './modules/Task_Configuration'

import './style.css'

export let currentProject = 'Inbox';

const loadWebsite = () => {
    document.body.appendChild(loadHeader());
    document.body.appendChild(loadMain());
    document.body.appendChild(loadFooter());
    document.body.appendChild(loadTaskFrame());
}

loadWebsite();
activateHeader();

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

taskConfig();

export const loadTasks = (project) => {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    // console.log(project);

    project.tasks.forEach((task) => {
        // console.log('ADDED TASK: ' + task);

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
            if(currentProject === "Inbox") {
                InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== task.title);
                // console.log(InboxProject);
                loadTasks(InboxProject);
            } else if(currentProject === "Today") {
                InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== taskTitle.textContent);
                TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== taskTitle.textContent);
                loadTasks(TodayProject);
            } else if(currentProject === "Week") {
                InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== taskTitle.textContent);
                WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== taskTitle.textContent);
                loadTasks(WeekProject);
            } else {
                    InboxProject.addTask(task);
            }
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