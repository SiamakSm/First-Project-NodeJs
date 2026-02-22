// db.js
// 

const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "firstp_db",
    //user: "postgres",
    // password: "ton_mdp"
});


module.exports = pool;
