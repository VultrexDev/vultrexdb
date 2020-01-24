"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const VultrexError_1 = __importDefault(require("./VultrexError"));
/**
 * The main instance. Creates a new database table.
 */
class VultrexDB {
    constructor(options) {
        this.table = options.name || "vultrexdb";
        this.wal = options.wal || true;
        this.fileName = `${options.fileName}.db` || "./vultrex.db";
        this.db = new better_sqlite3_1.default(this.fileName, {
            verbose: options.verbose,
            fileMustExist: options.fileMustExist || false,
            timeout: options.timeout || 5000
        });
        this._init();
    }
    _init() {
        this.db.prepare(`CREATE TABLE IF NOT EXISTS '${this.table}' (key TEXT PRIMARY KEY, value TEXT)`).run();
        if (this.wal) {
            this.db.pragma("synchronous = 1");
            this.db.pragma("journal_mode = wal");
        }
    }
    /**
    * Store the value with the given key inside of a database
    * @param key Required.
    * @param value
    *
    * ```javascript
    * const VultrexDB = require("vultrexdb");
    * const db = new VultrexDB({ name: "myDB" });
    *
    * db.set("vips", ["264378908756017154"]);
    * @ The above code would set an array of VIP users in the "vips" key
    * ```
    */
    set(key, value) {
        if (!key || !["String", "Number"].includes(key.constructor.name)) {
            throw new VultrexError_1.default("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
        }
        return this.db.prepare(`INSERT OR REPLACE INTO '${this.table}' (key, value) VALUES (?, ?);`).run(key, JSON.stringify(value));
    }
    /**
    * Return the value for the given key or fall back to the default value from the database
    * @param key
    * @param [defaultValue]
    *
    * @example
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.get("vips", []);
    *
    * @ The above code would `return: ["264378908756017154"]` (an array of VIP users) or an empty array
    *
    */
    get(key, defaultValue = null) {
        if (!key || !["String", "Number"].includes(key.constructor.name)) {
            throw new VultrexError_1.default("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
        }
        const data = this.db.prepare(`SELECT value FROM '${this.table}' WHERE key = ?;`).get(key);
        return data ? JSON.parse(data.value) : defaultValue;
    }
    /**
    *
    * @param key
    */
    has(key) {
        if (!key || !["String", "Number"].includes(key.constructor.name)) {
            throw new VultrexError_1.default("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
        }
        return !!this.db.prepare(`SELECT value FROM '${this.table}' WHERE key = ?;`).get(key);
    }
    /**
    * Returns an Array with all Data from the Database
    *
    * ```javascript
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.getAll();
    *
    *```
    * The above code would return: [ {key: "test", value: "test data"} ] (an array of database objects)
    *
    * @return
    */
    getAll() {
        const data = this.db.prepare(`SELECT * FROM '${this.table}';`).all();
        return data.map(row => ({ key: row.key, value: JSON.parse(row.value) }));
    }
    /**
    * Remove a specific key from the database
    * @param key
    *
    *
    * ```javascript
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.remove("vips");
    * ```
    *
    * The above code would delete all the VIP users from the database
    *
    * @returns {RunResult}
    */
    remove(key) {
        if (!key || !["String", "Number"].includes(key.constructor.name)) {
            throw new VultrexError_1.default("VultrexDB requires String or Number as Key.", "VultrexKeyTypeError");
        }
        return this.db.prepare(`DELETE FROM '${this.table}' WHERE key = ?;`).run(key);
    }
    /**
    * Deletes all data from the table
    *
    * @example
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.clear();
    *
    *
    * @ The above code would reset the table.
    *
    * @returns {void}
    */
    clear() {
        this.db.prepare(`DROP TABLE '${this.table}';`).run();
        this._init();
    }
    /**
    * Gets the size of the table.
    *
    * @returns {number}
    */
    get size() {
        const data = this.db.prepare(`SELECT count(*) FROM '${this.table}';`).get();
        return data["count(*)"];
    }
}
exports.VultrexDB = VultrexDB;
