const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('cy99wgxpao73q6vr', 'ddezo4nrffxh4334','hders91h1e2zf25z', {
    host:process.env.JAWSDB_URL, 
    dialect:'mysql',
    port: 3306,
    logging: false });

module.exports = sequelize;