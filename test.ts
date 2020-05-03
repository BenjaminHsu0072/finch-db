import {db, createTable, inData, alData, deData, upData, dbDataType} from "./index";

let theTableDefine = {
    id: dbDataType.INTEGER,
    name: dbDataType.TEXT_UNIQUE,
    number: dbDataType.REAL
};

interface theTableData {
    id: number,
    name: string,
    number: number
}

// createTable('theTable', theTableDefine,
//     (e) => {
//         if (e) {
//             console.log(e)
//         }
//     });

let insertData: theTableData = {
    id: 0,
    name: "Ben",
    number: 123.4567,
};
inData('theTable', insertData, (err,id) => {
    console.log(id);
    if (err) {
        console.log(err)
    }
});
alData('theTable', (err, data) => {
    console.log(data)
});
let modifyData: theTableData =
    {
        id: 0,
        name: "Jack",
        number: 456.7890,
    };
upData('theTable', 1, modifyData, (err) => {
    if (err) {
        console.log(err)
    }
});
deData('theTable',2,(err)=>{
    if (err) {
        console.log(err)
    }
});