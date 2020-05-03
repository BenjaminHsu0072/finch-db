let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('main.db');


enum dbDataType {
    INTEGER,
    REAL,
    TEXT,
    TEXT_UNIQUE
}

//serializableObject
interface defObject {
    [name: string]: dbDataType,
}


function createTable(tableName: string, object: defObject, callback?: (err: Error) => any) {
    let sql = "";
    for (let a in object) {
        if (a === "id") {
            sql += "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        } else {
            sql += `${a} ${dbDataType[object[a]].replace(/_/g, " ")},`
        }
    }
    sql = sql.slice(0, -1);
    db.run(`CREATE TABLE ${tableName} (${sql})`, (e) => {
        if (e) console.error(`${e.message} [AT] CREATE TABLE ${tableName}`);
        if (callback) callback(e);
    })
}


function inData(tableName: string, dataObject: any, callback?: (err: Error, id: number) => any) {
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
        } else {
            values += `'${d}',`
        }
    }
    keys = keys.slice(0, -1);
    values = values.slice(0, -1);
    db.run(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`, (err) => {
        if (err) {
            if (callback) callback(err, 0);
            return;
        }
        db.get(`SELECT last_insert_rowid() from ${tableName}`, (er, data) => {
            if (er) {
                if (callback) callback(er, 0);
                return;
            }
            let id = data["last_insert_rowid()"];
            if (callback) callback(er, id);
        })

    });
}

function alData(tableName: string, callback?: (err: Error, data: any) => any) {
    db.all(`SELECT * FROM ${tableName}`, (err, data) => {
        if (callback) callback(err, data);
    });
}


function upData(tableName: string, id: number, dataObject: any, callback?: (err: Error) => any) {
    if (dataObject.hasOwnProperty('id')) {
        delete dataObject.id;
    }
    let str = "";
    for (let k in dataObject) {
        let v = dataObject[k];
        if (typeof v === "number") {
            str += `${k}=${v},`;
        } else {
            str += `${k}='${v}',`
        }
    }
    str = str.slice(0, -1);
    db.run(`UPDATE ${tableName} SET ${str} WHERE id=${id}`, (err) => {
        if (callback) callback(err)
    });
}


function deData(tableName: string, id: number, callback?: (err: Error) => any) {
    db.run(`DELETE from ${tableName} WHERE id = ${id}`, (err) => {
        if (callback) callback(err)
    });
}


export {db, createTable, inData, upData, deData, alData, defObject, dbDataType};

