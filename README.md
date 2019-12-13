# Vultrex DB

A simple SQLite Database Wrapper developed for novices in JavaScript and SQL - Developed with love by Stasium#0001

## Installation

```bash
npm i vultrex/vultrexdb
```  
  
Not working? Run the following command in your Terminal or Windows PowerShell:

`npm i -g --add-python-to-path --vs2015 --production windows-build-tools`

#### JavaScript Defining without Options

```javascript
const { VultrexDB } = require("vultrex.db");

const db = new VultrexDB();
```

#### TypeScript Defining without Options

```typescript
import { VultrexDB } from "vultrex.db";

const db = new VultrexDB();
```

#### Options
```
name (string) - This is the name of your database table
timeout (number) - This is the number (in milliseconds) to wait before executing queries on a locked database before throwing an error
fileMustExist (boolean) - When set to true, if the file does not exist then an error will be thrown
verbose (function) - Provide a function which is used on every SQL string executed by the Database
```

#### JavaScript Defining with Options
```javascript
const { VultrexDB } = require("vultrex.db");

const db = new VultrexDB({
  name: "yourDatabaseName",
  timeout: 5000,
  fileMustExist: false,
  verbose: null 
});
```

#### TypeScript Defining with Options
```typescript
import { VultrexDB } from "vultrex.db";

const db = new VultrexDB({
  name: "yourDatabaseName",
  timeout: 5000,
  fileMustExist: false,
  verbose: null 
});
```

#### Return a value from a provided key:
### JavaScript
```javascript
return db.get("key");
```

### TypeScript
```typescript
return db.get<string>("key");
```
For TypeScript replace the type "string" with the type you want to get from the Database
Optionally, you can return a default value if none exists in the Database:

```javascript
return db.get("key", "defaultValue");
```

#### Return all values from a table:

```javascript
return db.getAll();
```

#### Check if key has a value:

```javascript
return db.has("key");
```

#### Set a value with a provided key:

```javascript
return db.set("key", "newValue");
```

#### Remove a provided key:

```javascript
return db.remove("key");
```

#### Destroy the entire table (WARNING: you will lose all data from doing this):

```javascript
return db.clear();
```

#### Check how many records a table has

```javascript
return db.size;
```
