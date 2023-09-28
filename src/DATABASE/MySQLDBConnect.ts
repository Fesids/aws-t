import mysql2, {Pool} from "mysql2";

const dbConfig = {
    host: "mysql.docker",
    database: "js_registration",
    user: "root", 
    password: "67890000"
}

const DB = mysql2.createConnection(
    dbConfig
);

const DBPool = mysql2.createPool(
    dbConfig
).promise();

export const MysqlDB = DB;
export const MysqlPool = DBPool;