import db from './db.js';

export async function getAllProjects() {
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
}