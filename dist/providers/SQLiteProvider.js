"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = require("sqlite");
class SQLiteProvider {
    constructor(config) {
        this.initialized = false;
        this.table = config.table;
        this.fileName = config.fileName;
    }
    async init() {
        this.db = await sqlite_1.open(`./${this.fileName}.db`);
        await this.db.run(`CREATE TABLE IF NOT EXISTS '${this.table}' (key TEXT PRIMARY KEY, value TEXT);`);
        this.initialized = true;
    }
    async set(key, value) {
        this.db.run(`INSERT OR REPLACE INTO '${this.table}' (key, value) VALUES(?, ?);`, key, JSON.stringify(value));
    }
    async get(key, defaultValue) {
        const data = await this.db.get(`SELECT * FROM '${this.table}' WHERE key = ?;`, key);
        return data ? JSON.parse(data["value"]) : defaultValue;
    }
    async getAll(key) {
        const query = key ? `SELECT * FROM '${this.table}' WHERE key LIKE '%${key}%';` : `SELECT * FROM '${this.table}';`;
        const data = await this.db.all(query);
        return data.map((data) => ({ key: data["key"], value: JSON.parse(data["value"]) }));
    }
    async size() {
        const data = await this.db.get(`SELECT count(*) FROM '${this.table}';`);
        return data["count(*)"];
    }
    async delete(key) {
        this.db.run(`DELETE FROM '${this.table}' WHERE key = ?;`, key);
    }
    async clear() {
        this.db.run(`DELETE FROM '${this.table}';`);
    }
}
exports.default = SQLiteProvider;
