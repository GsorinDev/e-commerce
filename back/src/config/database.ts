import {Sequelize} from 'sequelize';

export const database = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'guest',
    password: 'guest',
});