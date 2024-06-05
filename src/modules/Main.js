import inboxUrl from '../img/inbox.png'
import todayUrl from '../img/today.png'
import thisWeekUrl from '../img/this_week.png'
import projectUrl from '../img/to-do-list.png'
import closeUrl from '../img/close.png' 

import { getCurrentProject, setCurrentProject, Project, Projects, InboxProject, TodayProject, WeekProject, loadTasks } from '..'

export const loadProjects = () => {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    Projects.forEach((project) => {
        const projectExample = document.createElement('li');
        projectExample.classList.add('project');

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('iconContainer');
        const projectExampleImg = document.createElement('img');
        projectExampleImg.src = projectUrl;
        iconContainer.appendChild(projectExampleImg);

        const projectExampleName = document.createElement('p');
        projectExampleName.textContent = project.name;
        iconContainer.appendChild(projectExampleName);

        projectExample.appendChild(iconContainer);

        const deleteProjectBtn = document.createElement('img');
        deleteProjectBtn.classList.add('deleteBtn');
        deleteProjectBtn.src = closeUrl;
        
        deleteProjectBtn.addEventListener('click', () => {
            const index = Projects.indexOf(project); // Get the project position
            if (index > -1) {
                for(let i  = 0; i < project.tasks.length; ++i) {
                    const currentTask = project.tasks[i];
                    InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== currentTask.title);
                    TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== currentTask.title);
                    WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== currentTask.title);
                }

                if(projectExample.classList.contains('active')) {
                    const homeEl = document.getElementById('inbox');

                    setCurrentProject(InboxProject);
                    loadTasks(InboxProject);
                    activateProject(InboxProject, homeEl);
                }
                Projects.splice(index, 1); // Remove the project
            }
            loadProjects(); 
        })

        projectExample.appendChild(deleteProjectBtn);

        projectExample.addEventListener('click', () => {
            document.getElementById('add-task-btn').style.display = 'Block';
            activateProject(project, projectExample);
            loadTasks(project);
        });

        projectsContainer.appendChild(projectExample);
    })
}

const activateProject = (project, el) => {
    setCurrentProject(project);

    const projectElements = document.getElementsByClassName('project');

    for(let i = 0; i < projectElements.length; ++i) {
       if(projectElements[i].classList.contains('active')) {
            projectElements[i].classList.remove('active');
        }
    }

    el.classList.add('active');
}

export const loadMain = () => {
    // Creating the main element
    const main = document.createElement('main');
    main.id = 'main';

    // Navigation Bar
    // Creating the navigation bar
    const navBar = document.createElement('nav')
    navBar.id = 'main-nav';
    main.appendChild(navBar);

    // Creating the main categories
    const mainCategories = document.createElement('ul');
    mainCategories.id = 'main-categories'

    const inbox = document.createElement('li');
    setCurrentProject(InboxProject);
    inbox.classList.add('active');
    inbox.classList.add('project');
    inbox.id = 'inbox';

    inbox.addEventListener('click', () => {
        if(!inbox.classList.contains('active')) {
            setCurrentProject(InboxProject);
            document.getElementById('add-task-btn').style.display = 'Block';

            activateProject(InboxProject, inbox);

            // Loading the tasks
            loadTasks(InboxProject);
        } 
    })

    const inboxImg = document.createElement('img');
    inboxImg.src = inboxUrl;
    inbox.appendChild(inboxImg);
    const inboxTxt = document.createElement('p');
    inboxTxt.textContent = 'Inbox';
    inbox.appendChild(inboxTxt);
    mainCategories.appendChild(inbox);

    const today = document.createElement('li');
    today.id = 'today';
    today.classList.add('project');

    today.addEventListener('click', () => {
        if(!today.classList.contains('active')) {
            setCurrentProject(TodayProject);
            document.getElementById('add-task-btn').style.display = 'none';
            
            activateProject(TodayProject, today);

            // Loading the tasks
            loadTasks(TodayProject);
        } 
    })

    const todayImg = document.createElement('img');
    todayImg.src = todayUrl;
    today.appendChild(todayImg);
    const todayTxt = document.createElement('p');
    todayTxt.textContent = 'Today';
    today.appendChild(todayTxt);
    mainCategories.appendChild(today);

    const thisWeek = document.createElement('li');
    thisWeek.id = 'this-week';
    thisWeek.classList.add('project');

    thisWeek.addEventListener('click', () => {
        if(!thisWeek.classList.contains('active')) {
            setCurrentProject(WeekProject);
            document.getElementById('add-task-btn').style.display = 'none';
            
            activateProject(WeekProject, thisWeek);

            // Loading the tasks
            loadTasks(WeekProject);
        } 
    })

    const thisWeekImg = document.createElement('img');
    thisWeekImg.src = thisWeekUrl;
    thisWeek.appendChild(thisWeekImg);
    const thisWeekTxt = document.createElement('p');
    thisWeekTxt.textContent = 'This Week';
    thisWeek.appendChild(thisWeekTxt);
    mainCategories.appendChild(thisWeek);

    navBar.appendChild(mainCategories);

    // Creating the projects elements
    const projects = document.createElement('div');
    projects.id = 'projects';

    const projectsTitle = document.createElement('h2');
    projectsTitle.id = 'projects-title';
    projectsTitle.textContent = 'Projects';
    projects.appendChild(projectsTitle);

    const projectsContainer = document.createElement('ul');
    projectsContainer.id = 'projects-container'
    projects.appendChild(projectsContainer);

    // Loading projects
    let Gym = new Project("Gym", []);
    let Home = new Project("Home", []);
    Projects.push(Gym);
    Projects.push(Home);
    console.log(Projects);

    Projects.forEach((project) => {
        const projectExample = document.createElement('li');
        projectExample.classList.add('project');

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('iconContainer');
        const projectExampleImg = document.createElement('img');
        projectExampleImg.src = projectUrl;
        iconContainer.appendChild(projectExampleImg);

        const projectExampleName = document.createElement('p');
        projectExampleName.textContent = project.name;
        iconContainer.appendChild(projectExampleName);

        projectExample.appendChild(iconContainer);

        const deleteProjectBtn = document.createElement('img');
        deleteProjectBtn.classList.add('deleteBtn');
        deleteProjectBtn.src = closeUrl;

        deleteProjectBtn.addEventListener('click', () => {
            const index = Projects.indexOf(project); // Get the project position
            if (index > -1) {
                for(let i  = 0; i < project.tasks.length; ++i) {
                    const currentTask = project.tasks[i];
                    InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== currentTask.title);
                    TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== currentTask.title);
                    WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== currentTask.title);
                }

                if(projectExample.classList.contains('active')) {
                    console.log('deleted an active project');
                    
                    const homeEl = document.getElementById('inbox');

                    setCurrentProject(InboxProject);
                    loadTasks(InboxProject);
                    activateProject(InboxProject, homeEl);
                }
                Projects.splice(index, 1); // Remove the project
            }
            loadProjects(); 
        });

        projectExample.appendChild(deleteProjectBtn);

        projectExample.addEventListener('click', () => {
            document.getElementById('add-task-btn').style.display = 'Block';
            setCurrentProject(project);
            activateProject(project, projectExample);
            loadTasks(project);
        });

        projectsContainer.appendChild(projectExample);
    })

    const createProjectBtn = document.createElement('button');
    createProjectBtn.id = 'create-project-btn';
    createProjectBtn.textContent = '+ Add Project';
    projects.appendChild(createProjectBtn);

    navBar.appendChild(projects);

    // Project Preview
    // Creating the project preview
    const projectPreview = document.createElement('div');
    projectPreview.id = 'project-preview';
    main.appendChild(projectPreview);

    // Creating the project name
    const projectName = document.createElement('h1');
    projectName.id = 'project-name';
    projectName.textContent = 'Inbox';
    projectPreview.appendChild(projectName);

    // Creating the task list
    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';
    projectPreview.appendChild(tasksList);

    // Creating the add task button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.id = 'add-task-btn';
    addTaskBtn.textContent = '+ Add Task'
    projectPreview.appendChild(addTaskBtn);

    main.appendChild(projectPreview);

    // activateProject();

    return main;
}