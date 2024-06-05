import {Task, Project, Projects, InboxProject, TodayProject, WeekProject, getCurrentProject, setCurrentProject, loadTasks} from '../index'
import closeImg from '../img/close.png'

const createTask = (project) => {
    const inputTitle = document.getElementById('input-title');
    const inputDescription = document.getElementById('input-description');
    const inputDate = document.getElementById('input-date');
    const tasksList = document.getElementById('tasks-list');
    
    const task = new Task(inputTitle.value, inputDescription.value, inputDate.value);

    // Creating the task element
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    
    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = inputTitle.value;
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
    taskDescription.textContent = inputDescription.value;
    taskElement.appendChild(taskDescription);

    const taskDate = document.createElement('h4');
    taskDate.textContent = inputDate.value;
    taskElement.appendChild(taskDate);

    tasksList.appendChild(taskElement);

    project.addTask(task);
    if(project != InboxProject) {
        InboxProject.addTask(task);
    }

    const todayDate = new Date();
    const compareDate = new Date(inputDate.value);

    if(todayDate.setHours(0,0,0,0) == compareDate.setHours(0,0,0,0)) {
        TodayProject.addTask(task);
    }

    if(isDateInThisWeek(compareDate)) {
        WeekProject.addTask(task);
    }
}

export const isDateInThisWeek = (date) => {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
  
    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  
    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  
    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

export const taskConfig = () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const addTaskContainer = document.getElementById('add-task-container');
    const addTaskFrame = document.getElementById('add-task-frame');
    const inputTitle = document.getElementById('input-title');
    const inputDescription = document.getElementById('input-description');
    const inputDate = document.getElementById('input-date');

    addTaskBtn.addEventListener('click', () => {
        addTaskContainer.style.transform = 'scale(1)';
        addTaskFrame.style.transform = 'scale(1)';
        addTaskContainer.style.opacity = '1';
    })

    cancelBtn.addEventListener('click', () => {
        inputTitle.value = ''; 
        inputDescription.value = '';
        inputDate.value = '';

        addTaskFrame.style.transform = 'scale(0)';
        addTaskContainer.style.opacity = '0';
        setTimeout(() => {
            addTaskContainer.style.transform = 'scale(0)';
        }, 300);
    }) 
    
    let canClick = true;
    submitBtn.addEventListener('click', () => {
        if(canClick) {
            // Checking the form
            let check1 = false;
            let check2 = false;
            let check3 = false;

            if(inputTitle.value !== '') {
                check1 = true;
            } else {
                inputTitle.value = 'MISSING TITLE';
                canClick = false;
                setTimeout(() => {
                    canClick = true;
                    inputTitle.value = '';
                }, 500);
            }

            if(inputDescription.value !== '') {
                check2 = true;
            } else {
                inputDescription.value = 'MISSING DESCRIPTION';
                canClick = false;
                setTimeout(() => {
                    canClick = true;
                    inputDescription.value = '';
                }, 500);
            }

            if(inputDate.value !== '') {
                check3 = true;
            } else {
                inputDate.style.color = 'tomato';
                canClick = false;
                setTimeout(() => {
                    canClick = true;
                    inputDate.style.color = 'black';
                }, 500);
            }

            if(check1 && check2 && check3) {
                console.log(getCurrentProject());
                createTask(getCurrentProject());
                /* if(getCurrentProject() != InboxProject) {
                    createTask(InboxProject);
                } */

                inputTitle.value = ''; 
                inputDescription.value = '';
                inputDate.value = '';

                addTaskFrame.style.transform = 'scale(0)';
                addTaskContainer.style.opacity = '0';
                setTimeout(() => {
                    addTaskContainer.style.transform = 'scale(0)';
                }, 300);
            }
        }
    })
} 