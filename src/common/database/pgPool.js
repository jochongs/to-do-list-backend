const env = require('../config/env');
const { Pool } = require('pg');
const pgPoolConfig = require('../config/pg-pool.config');

module.exports = new Pool(pgPoolConfig);
