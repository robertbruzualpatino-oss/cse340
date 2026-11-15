import db from './db.js';

const getCategoryDetails = async (id) => {
    const query = `
        SELECT id AS category_id, name, description
        FROM categories
        WHERE id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.id AS category_id, c.name, c.description
        FROM categories c
        JOIN project_categories pc ON c.id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.id AS project_id,
            p.title,
            p.description,
            p.event_date AS date,
            p.location,
            p.organization_id
        FROM projects p
        JOIN project_categories pc ON p.id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.event_date ASC;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};
 
export { getCategoryDetails, getCategoriesByProjectId, getProjectsByCategoryId };