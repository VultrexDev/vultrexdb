import { VultrexDB } from "./VultrexDB/VultrexDB";

let SQLiteProvider = null;
let MongoDBProvider = null;

try {
	MongoDBProvider = { MongoDBProvider } = require("./providers/MongoDBProvider");
} catch {}

try {
	SQLiteProvider = { SQLiteProvider } = require("./providers/SQLiteProvider");
} catch {}

export { VultrexDB, MongoDBProvider, SQLiteProvider };