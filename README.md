# finch-db

A typescript database tool for using finch and sqlite3.

#### Usage
```typescript
import {db, createTable, inData, alData, deData, upData, dbDataType} from "finch-db";

let theTableDefine = {
    id: dbDataType.INTEGER,
    name: dbDataType.TEXT,
    number: dbDataType.REAL
};

interface theTableData {
    id: number,
    name: string,
    number: number
}

createTable('theTable', theTableDefine,
    (e) => {
        if (e) {
            console.log(e)
        }
    });

let insertData: theTableData = {
    id: 0,
    name: "Mike",
    number: 123.4567,
};
inData('theTable', insertData, (err) => {
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
```
#### Content
* `defObject:interface`   
Before starting to use the database, we need to define the field names and data types of the tables in the database, 
so when creating the table, we need a defObject.
Its key is the table field name, and the value is one of the data type enumeration.
* `dbDataType:enum`   
The database data type enumeration.
* `db`  
Start with `import {db}`,this simply created a sqlite3 db on root dir;
* `createTable(tableName: string, object: defObject,callback?:(err:Error)=>any)`  
Create a Table;
* `inData(tableName: string, dataObject: any, callback?: (err:Error)=>any)`    
Insert Data;
* `alData(tableName: string,callback?: (err:Error,data:any)=>any) `   
Retrieve all data in the table;
* `upData(tableName: string,id:number,dataObject: any, callback?: (err:Error)=>any)`   
Update Data by id;
* `deData(tableName: string,id:number, callback?: (err:Error)=>any) `   
Delete Data by id;
