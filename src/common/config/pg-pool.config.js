module.exports = {
    user: env.PSQL_USER,
    host: env.PSQL_HOST,
    database: env.PSQL_DB,
    password: env.PSQL_PW,
    port: env.PSQL_PORT,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};
