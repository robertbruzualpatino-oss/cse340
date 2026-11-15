import { getAllProjects, getProjectsDetails } from "../models/projects.js";

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetails = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectsDetails(projectId);

    if (!project) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    res.render('project', { title: project.title, project });
};

export { showProjectsPage, showProjectDetails };