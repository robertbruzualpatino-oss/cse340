const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://robertbruzual_cse340_db:cxaQY2L07xSq3GxswtgCpmEHlEsAylyd@dpg-dbkcl63l550s73e999gg-a.virginia-postgres.render.com/robertbruzual_cse340_db',
    ssl: {
        rejectUnauthorized: false
    }
});

async function runSetup() {
    try {
        console.log('Searching for setup.sql...');
        const sqlPath = path.join(__dirname, 'src', 'views', 'setup.sql');

        console.log(`Loading SQL from: ${sqlPath}`);
        const sqlQuery = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing setup.sql on your Render database...');
        await pool.query(sqlQuery);
        
        console.log('SUCCESS: Database setup completed and populated successfully!');
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error executing setup.sql:', error);
        await pool.end();
        process.exit(1);
    }
}

runSetup();