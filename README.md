# Vultrex DB
A simple SQLite Database Wrapper developed for novices in JavaScript and SQL - Developed with love by Stasium#0001

### Installation
NPM Installation: `npm i vultrex/vultrexdb`  
  
Not working? Run the following command in your Windows PowerShell:  
  
`npm i -g --add-python-to-path --vs2015 --production windows-build-tools`

### Documentation
```javascript
const VultrexDB = require("vultrex.db");
const db = new VultrexDB({
  name: "yourDatabaseName"
});
```
##### Return a value from a provided key:
```javascript
return db.get("key");
```
Optionally, you can return a default value if none exists in the database:
```javascript
return db.get("key", "defaultValue");
```
##### Set a value with a provided key:
```javascript
db.set("key", "newValue");
```
##### Remove a provided key:
```javascript
db.remove("key");
```
##### Destroy the entire table (WARNING: you will lose all data from doing this):
```javascript
db.clear();
```
