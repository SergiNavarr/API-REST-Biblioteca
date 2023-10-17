import mysqlconecction from "mysql2/promise";

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest-api-libros'
};

export const pool = mysqlconecction.createPool(properties);
