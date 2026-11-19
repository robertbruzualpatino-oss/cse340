import { getAllOrganizations, getOrganizationDetails, createOrganization } from "../models/organizations.js";
import { getProjectsByOrganizationId } from "../models/projects.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};

const processNewOrganizationForm = async (req, res) => {
    const name = req.body.name?.trim() || '';
    const description = req.body.description?.trim() || '';
    const contactEmail = req.body.contactEmail?.trim() || '';
    const formData = { name, description, contactEmail };

    let validationError = null;

    if (!name || name.length < 2 || name.length > 150) {
        validationError = 'Organization name must be between 2 and 150 characters.';
    } else if (!description || description.length < 5 || description.length > 1000) {
        validationError = 'Description must be between 5 and 1000 characters.';
    } else if (!contactEmail || !emailRegex.test(contactEmail) || contactEmail.length > 255) {
        validationError = 'Please provide a valid contact email address.';
    }

    if (validationError) {
        return res.status(400).render('new-organization', {
            title: 'Add New Organization',
            error: validationError,
            formData
        });
    }

    const logoFilename = 'placeholder-logo.png';

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    res.redirect(`/organization/${organizationId}`);
};

export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };