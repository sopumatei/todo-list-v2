import { Projects, Project, updateStorage } from "..";
import { loadProjects } from "./Main";

export const projectConfig = () => {
    const addProjectBtn = document.getElementById('create-project-btn');
    const submitBtn = document.getElementById('project-submit-btn');
    const cancelBtn = document.getElementById('project-cancel-btn');
    const addProjectContainer = document.getElementById('add-project-container');
    const addProjectFrame = document.getElementById('add-project-frame');
    const projectTitle = document.getElementById('project-title');

    addProjectBtn.addEventListener('click', () => {
        addProjectContainer.style.transform = 'scale(1)';
        addProjectFrame.style.transform = 'scale(1)';
        addProjectContainer.style.opacity = '1';
    })

    cancelBtn.addEventListener('click', () => {
        projectTitle.value = ''; 

        addProjectFrame.style.transform = 'scale(0)';
        addProjectContainer.style.opacity = '0';
        setTimeout(() => {
            addProjectContainer.style.transform = 'scale(0)';
        }, 300);
    }) 
    
    let canClick = true;
    submitBtn.addEventListener('click', () => {
        if(canClick) {
            // Checking the form
            let check1 = false;

            if(projectTitle.value !== '') {
                check1 = true;
            } else {
                projectTitle.value = 'MISSING TITLE';
                canClick = false;
                setTimeout(() => {
                    canClick = true;
                    projectTitle.value = '';
                }, 500);
            }

            if(check1) {
                let newProject = new Project(projectTitle.value, []);
                Projects.push(newProject);
                updateStorage();
                projectTitle.value = ''; 

                loadProjects();

                addProjectFrame.style.transform = 'scale(0)';
                addProjectContainer.style.opacity = '0';
                setTimeout(() => {
                    addProjectContainer.style.transform = 'scale(0)';
                }, 300);
            }
        }
    })
} 