# Vultrex DB

A simple SQLite / MongoDB Database Wrapper developed for novices in JavaScript and SQL - Developed with <3 by Stasium#0001, Documentation by Host#0001

## Installation
```bash
npm i vultrex/vultrexdb
```  

### SQLite Installation
```bash
npm i sqlite
```

### MongoDB Installation
```bash
npm i mongodb
```
 
### Basic Documentation
```javascript
const { VultrexDB, SQLiteProvider, MongoDBProvider } = require("vultrex.db");

// SQLite Database - only use if you're using SQLite
const db = new VultrexDB({
  provider: new SQLiteProvider({ name: "databaseName", fileName: "dataFileName" })
});

// MongoDB Database - only use if you're using MongoDB
const db = new VultrexDB({
  provider: new MongoDBProvider({ url: "connectionStringForMongoDB" })
});

await db.connect(); // this is mandatory

// Set Values on Keys in Database
await db.set("foo", "bar");

// Return an Array of Objects containing the Keys and Values from the Database
console.log(await db.getAll());

// Return the Value of a Key from the Database - if this fails, you can return a optional Default Value
console.log(await db.get("foo", "defaultValue"));

// Delete a Key from the Database
await db.delete("foo");

// Delete all Keys from the Database
await db.clear();

// Return a Number of Keys in the Database
console.log(await db.size());
```
