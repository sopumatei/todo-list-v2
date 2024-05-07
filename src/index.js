import { loadHeader } from './modules/Header'
import { loadMain } from './modules/Main'
import { loadFooter } from './modules/Footer'
import { loadTaskFrame } from './modules/Add_Task_Frame'
import { activateHeader } from './modules/Header_Manipulator'

import './style.css'

const loadWebsite = () => {
    document.body.appendChild(loadHeader());
    document.body.appendChild(loadMain());
    document.body.appendChild(loadFooter());
    document.body.appendChild(loadTaskFrame());
}

loadWebsite();
activateHeader();

function Task(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
}

class Project {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

let IndexProject = new Project("Index", []);
let TodayProject = new Project("Today", []);
let WeekProject = new Project("Week", []);