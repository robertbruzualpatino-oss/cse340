import db from './db.js';

export async function getAllCategories() {
    try {
        const query = `
            SELECT
                category_id,
                name,
                description
            FROM categories
            ORDER BY name ASC
        `;
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting categories from database:', error);
        throw error;
    }
}