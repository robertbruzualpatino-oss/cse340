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
        project_date AS date
    FROM projects
    WHERE organization_id = $1
    ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId };