const sqlite = require("better-sqlite3");

module.exports = class VultrexDB {

    constructor(options = {}) {
        this.tableName = options.name || "default"
        this.db = new sqlite("./vultrex.db")
        this._init()
    }

    _init() {
          this.db.prepare(`CREATE TABLE IF NOT EXISTS '${this.tableName}' (key TEXT PRIMARY KEY, value TEXT)`).run();
          this.db.pragma("synchronous = 1");
          this.db.pragma("journal_mode = wal");
    }

    /**
     * Store the value with the given key inside of a database
     * @param {string | number} key Required. 
     * @param {any} value 
     * 
     * @example
     * const VultrexDB = require("vultrexdb");
     * const db = new VultrexDB({ name: "myDB" });
     * 
     * db.set("vips", ["264378908756017154"]);
     * // The above code would set an array of VIP users in the "vips" key
     */
    set(key, value) {
        if (!["String", "Number"].includes(key.constructor.name)) {
            throw Error("[VultrexDB] Key must be a String or Number!");
        }
        return this.db.prepare(`INSERT OR REPLACE INTO '${this.tableName}' (key, value) VALUES (?, ?);`).run(key, JSON.stringify(value));
    }

    /**
     * Return the value for the given key or fall back to the default value from the database
     * @param {string | number} key Required.  
     * @param {any}defaultValue the fall back value
     * 
     * @example
     * const VultrexDB = require("vultrex.db");
     * const db = new VultrexDB({ name: "myDB" });
     * 
     * db.get("vips", []);
     * // The above code would return: ["264378908756017154"] (an array of VIP users) or an empty array
     */
    get(key, defaultValue = null) {
        if (!["String", "Number"].includes(key.constructor.name)) {
            throw Error("[VultrexDB] Key must be a String or Number!");
        }
        const data = this.db.prepare(`SELECT value FROM '${this.tableName}' WHERE key = ?;`).get(key);
        return data ? JSON.parse(data.value) : defaultValue;
    }

    /**
     * Remove a specific key from the database
     * @param {string | number} key Required. 
     * 
     * @example
     * const VultrexDB = require("vultrex.db");
     * const db = new VultrexDB({ name: "myDB" });
     * 
     * db.remove("vips");
     * // The above code would delete all the VIP users from the database
     */
    remove(key) {
        if (!["String", "Number"].includes(key.constructor.name)) {
            throw Error("[VultrexDB] Key must be a String or Number!");
        }
        return this.db.prepare(`DELETE FROM '${this.tableName}' WHERE key = ?;`).run(key);
    }

    /**
     * Deletes all data from the table
     * 
     * @example
     * const VultrexDB = require("vultrex.db");
     * const db = new VultrexDB({ name: "myDB" });
     * 
     * db.clear();
     * // The above code would destroy the whole table
     */
    clear() {
        this.db.prepare(`DROP TABLE '${this.tableName}';`).run();
        this._init();
    }
}
