import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DB_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

export default {
    query: (text, params) => pool.query(text, params),
};