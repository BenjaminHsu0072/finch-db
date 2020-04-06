"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
let theTableDefine = {
    id: index_1.dbDataType.INTEGER,
    name: index_1.dbDataType.TEXT,
    number: index_1.dbDataType.REAL
};
index_1.createTable('theTable', theTableDefine, (e) => {
    if (e) {
        console.log(e);
    }
});
let insertData = {
    id: 0,
    name: "Mike",
    number: 123.4567,
};
index_1.inData('theTable', insertData, (err) => {
    if (err) {
        console.log(err);
    }
});
index_1.alData('theTable', (err, data) => {
    console.log(data);
});
let modifyData = {
    id: 0,
    name: "Jack",
    number: 456.7890,
};
index_1.upData('theTable', 1, modifyData, (err) => {
    if (err) {
        console.log(err);
    }
});
index_1.deData('theTable', 2, (err) => {
    if (err) {
        console.log(err);
    }
});
