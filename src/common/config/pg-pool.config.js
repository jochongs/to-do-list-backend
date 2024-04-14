module.exports = {
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PW,
    port: process.env.PSQL_PORT,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};
