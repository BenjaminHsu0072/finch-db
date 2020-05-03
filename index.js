"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('main.db');
exports.db = db;
var dbDataType;
(function (dbDataType) {
    dbDataType[dbDataType["INTEGER"] = 0] = "INTEGER";
    dbDataType[dbDataType["REAL"] = 1] = "REAL";
    dbDataType[dbDataType["TEXT"] = 2] = "TEXT";
    dbDataType[dbDataType["TEXT_UNIQUE"] = 3] = "TEXT_UNIQUE";
})(dbDataType || (dbDataType = {}));
exports.dbDataType = dbDataType;
function createTable(tableName, object, callback) {
    let sql = "";
    for (let a in object) {
        if (a === "id") {
            sql += "id INTEGER PRIMARY KEY AUTOINCREMENT,";
        }
        else {
            sql += `${a} ${dbDataType[object[a]].replace(/_/g, " ")},`;
        }
    }
    sql = sql.slice(0, -1);
    db.run(`CREATE TABLE ${tableName} (${sql})`, (e) => {
        if (e)
            console.error(`${e.message} [AT] CREATE TABLE ${tableName}`);
        if (callback)
            callback(e);
    });
}
exports.createTable = createTable;
function inData(tableName, dataObject, callback) {
    if (dataObject.hasOwnProperty('id')) {
        delete dataObject.id;
    }
    let keys = "";
    let values = "";
    for (let a in dataObject) {
        keys += a + ",";
        let d = dataObject[a];
        if (typeof d === "number") {
            values += `${d},`;
        }
        else {
            values += `'${d}',`;
        }
    }
    keys = keys.slice(0, -1);
    values = values.slice(0, -1);
    db.run(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`, (err) => {
        if (err) {
            if (callback)
                callback(err, 0);
            return;
        }
        db.get(`SELECT last_insert_rowid() from ${tableName}`, (er, data) => {
            if (er) {
                if (callback)
                    callback(er, 0);
                return;
            }
            let id = data["last_insert_rowid()"];
            if (callback)
                callback(er, id);
        });
    });
}
exports.inData = inData;
function alData(tableName, callback) {
    db.all(`SELECT * FROM ${tableName}`, (err, data) => {
        if (callback)
            callback(err, data);
    });
}
exports.alData = alData;
function upData(tableName, id, dataObject, callback) {
    if (dataObject.hasOwnProperty('id')) {
        delete dataObject.id;
    }
    let str = "";
    for (let k in dataObject) {
        let v = dataObject[k];
        if (typeof v === "number") {
            str += `${k}=${v},`;
        }
        else {
            str += `${k}='${v}',`;
        }
    }
    str = str.slice(0, -1);
    db.run(`UPDATE ${tableName} SET ${str} WHERE id=${id}`, (err) => {
        if (callback)
            callback(err);
    });
}
exports.upData = upData;
function deData(tableName, id, callback) {
    db.run(`DELETE from ${tableName} WHERE id = ${id}`, (err) => {
        if (callback)
            callback(err);
    });
}
exports.deData = deData;
