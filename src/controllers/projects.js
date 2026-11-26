import { body, validationResult } from "express-validator";
import { getUpcomingProjects, getProjectsDetails, createProject, updateProject } from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
    body("title")
        .trim()
        .notEmpty().withMessage("Project title is required.")
        .isLength({ min: 3, max: 200 }).withMessage("Project title must be between 3 and 200 characters."),
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required.")
        .isLength({ max: 1000 }).withMessage("Description must be 1000 characters or fewer."),
    body("location")
        .trim()
        .notEmpty().withMessage("Location is required.")
        .isLength({ max: 200 }).withMessage("Location must be 200 characters or fewer."),
    body("date")
        .notEmpty().withMessage("Event date is required.")
        .isISO8601().withMessage("Please provide a valid date."),
    body("organizationId")
        .notEmpty().withMessage("Organization is required.")
        .isInt({ min: 1 }).withMessage("Please select a valid organization.")
];

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectsDetails(projectId);

    if (!project) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const categories = await getCategoriesByProjectId(projectId);

    res.render('project', { title: project.title, project, categories });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-project');
    }

    const { organizationId, title, description, location, date } = req.body;

    try {
        await createProject(title, description, location, date, organizationId);
        req.flash('success', 'New service project created successfully!');
        res.redirect('/projects');
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectsDetails(projectId);

    if (!project) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const organizations = await getAllOrganizations();
    const title = `Edit Project: ${project.title}`;

    res.render('edit-project', { title, project, organizations });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-project/${projectId}`);
    }

    const { organizationId, title, description, location, date } = req.body;

    try {
        await updateProject(projectId, title, description, location, date, organizationId);
        req.flash('success', 'Service project updated successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating project:', error);
        req.flash('error', 'There was an error updating the service project.');
        res.redirect(`/edit-project/${projectId}`);
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
};