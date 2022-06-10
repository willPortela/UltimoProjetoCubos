const { Pool } = require('pg');

const pool = new Pool({
    user: 'yshwimzblsgmjn',
    host: 'ec2-3-234-131-8.compute-1.amazonaws.com',
    database: 'd6bdnkop7ogiu1',
    password: '832fce61c2c208feb5a99342b30b0a841339bcee937b9dc32d3b770fb20f7eac',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

const query = (text, param) => {
    return pool.query(text, param);
};

module.exports  = {
    query
};