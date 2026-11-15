import db from './db.js';

const getAllProjects = async () => {
    try {
        const query = `
            SELECT
                p.id,
                p.title,
                p.description,
                p.location,
                p.event_date,
                o.name AS organization_name
            FROM projects p
            JOIN organizations o ON p.organization_id = o.organization_id
            ORDER BY p.event_date ASC
        `;
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting projects from database:', error);
        throw error;
    }
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
    SELECT
        id AS project_id,
        organization_id,
        title,
        description,
        location,
        event_date AS date
    FROM projects
    WHERE organization_id = $1
    ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
    SELECT
        p.id AS project_id,
        p.title,
        p.description,
        p.event_date AS date,
        p.location,
        p.organization_id,
        o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.event_date >= CURRENT_DATE
    ORDER BY p.event_date ASC
    LIMIT $1;
    `;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

const getProjectsDetails = async (id) => {
    const query = `
    SELECT
        p.id AS project_id,
        p.organization_id,
        p.title,
        p.description,
        p.location,
        p.event_date AS date,
        o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectsDetails };