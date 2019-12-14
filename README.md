# Vultrex DB

A simple SQLite Database Wrapper developed for novices in JavaScript and SQL - Developed with love by Stasium#0001

## Installation

```bash
npm i vultrex/vultrexdb
```  
  
Not working? Run the following command in your Terminal or Windows PowerShell:

`npm i -g --add-python-to-path --vs2015 --production windows-build-tools`

## Example Usage

```javascript
const { VultrexDB } = require("vultrexdb");

const db = new VultrexDB();

/*
name: string = A name for the database table. (Default: 'vultrexdb')
timeout: number = This is the number (in milliseconds) to wait before executing queries on a locked database before throwing an error.
fileMustExist: boolean = When set to true, if the file does not exist then an error will be thrown. (Default: false)
verbose: function = Provide a function which is used on every SQL string executed by the database. (Default: null)
wal: boolean = (Default: true)
fileName: string = Default: 'vultrex'
*/
const db = new VultrexDB({
  name: "yourDatabaseName",
  timeout: 5000,
  fileMustExist: false,
  verbose: null
});

// Set an entry (key and value) to the database
db.set("foo", "bar");

// Get a value from a specified key
db.get("foo");
// Optionally, you can return a default value if none exists in the database
db.get("foo", "defaultValue");

// Get all the entries from the database
db.getAll();

// Remove an entry from the database
db.remove("foo");

// Check if an entry exists in the database
db.has("foo");

// Clear all the entires/entire database. (Warning: all the data will be lost by doing this.)
db.clear();

// Check how many entries the database has
db.size;
```
