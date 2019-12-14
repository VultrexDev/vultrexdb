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
            verbose: options.verbose || null,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNEQ7QUFDNUQsa0VBQTBDO0FBZ0IxQzs7R0FFRztBQUNILE1BQWEsU0FBUztJQU9yQixZQUFtQixPQUF5QjtRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxjQUFjLENBQUM7UUFDM0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLHdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJO1lBQ2hDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUs7WUFDN0MsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSTtTQUNoQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU8sS0FBSztRQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLCtCQUErQixJQUFJLENBQUMsS0FBSyxzQ0FBc0MsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNyQztJQUNGLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O01BWUU7SUFDSyxHQUFHLENBQUMsR0FBb0IsRUFBRSxLQUFVO1FB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QyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsSUFBVyxJQUFJO1FBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMseUJBQXlCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRDtBQWxKRCw4QkFrSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU1FMaXRlLCB7IERhdGFiYXNlLCBSdW5SZXN1bHQgfSBmcm9tIFwiYmV0dGVyLXNxbGl0ZTNcIlxyXG5pbXBvcnQgVnVsdHJleEVycm9yIGZyb20gXCIuL1Z1bHRyZXhFcnJvclwiO1xyXG5cclxuaW50ZXJmYWNlIFZ1bHRyZXhEQk9wdGlvbnMge1xyXG5cdG5hbWU/OiBzdHJpbmc7XHJcblx0dmVyYm9zZT86ICgpID0+IHZvaWQ7XHJcblx0dGltZW91dD86IG51bWJlcjtcclxuXHRmaWxlTXVzdEV4aXN0PzogYm9vbGVhbjtcclxuXHR3YWw/OiBib29sZWFuO1xyXG5cdGZpbGVOYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUm93IHtcclxuXHRrZXk6IHN0cmluZyB8IG51bWJlcjtcclxuXHR2YWx1ZTogYW55O1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG1haW4gaW5zdGFuY2UuIENyZWF0ZXMgYSBuZXcgZGF0YWJhc2UgdGFibGUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVnVsdHJleERCIHtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSB0YWJsZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgd2FsOiBib29sZWFuO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgZGI6IERhdGFiYXNlO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgZmlsZU5hbWU6IHN0cmluZztcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZ1bHRyZXhEQk9wdGlvbnMpIHtcclxuXHRcdHRoaXMudGFibGUgPSBvcHRpb25zLm5hbWUgfHwgXCJ2dWx0cmV4ZGJcIjtcclxuXHRcdHRoaXMud2FsID0gb3B0aW9ucy53YWwgfHwgdHJ1ZTtcclxuXHRcdHRoaXMuZmlsZU5hbWUgPSBgJHtvcHRpb25zLmZpbGVOYW1lfS5kYmAgfHwgXCIuL3Z1bHRyZXguZGJcIjtcclxuXHRcdHRoaXMuZGIgPSBuZXcgU1FMaXRlKHRoaXMuZmlsZU5hbWUsIHtcclxuXHRcdFx0dmVyYm9zZTogb3B0aW9ucy52ZXJib3NlIHx8IG51bGwsXHJcblx0XHRcdGZpbGVNdXN0RXhpc3Q6IG9wdGlvbnMuZmlsZU11c3RFeGlzdCB8fCBmYWxzZSxcclxuXHRcdFx0dGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IDUwMDBcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5faW5pdCgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfaW5pdCgpIHtcclxuXHRcdHRoaXMuZGIucHJlcGFyZShgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgJyR7dGhpcy50YWJsZX0nIChrZXkgVEVYVCBQUklNQVJZIEtFWSwgdmFsdWUgVEVYVClgKS5ydW4oKTtcclxuXHRcdGlmICh0aGlzLndhbCkge1xyXG5cdFx0XHR0aGlzLmRiLnByYWdtYShcInN5bmNocm9ub3VzID0gMVwiKTtcclxuXHRcdFx0dGhpcy5kYi5wcmFnbWEoXCJqb3VybmFsX21vZGUgPSB3YWxcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIFN0b3JlIHRoZSB2YWx1ZSB3aXRoIHRoZSBnaXZlbiBrZXkgaW5zaWRlIG9mIGEgZGF0YWJhc2VcclxuXHQqIEBwYXJhbSBrZXkgUmVxdWlyZWQuXHJcblx0KiBAcGFyYW0gdmFsdWVcclxuXHQqXHJcblx0KiBgYGBqYXZhc2NyaXB0XHJcblx0KiBjb25zdCBWdWx0cmV4REIgPSByZXF1aXJlKFwidnVsdHJleGRiXCIpO1xyXG5cdCogY29uc3QgZGIgPSBuZXcgVnVsdHJleERCKHsgbmFtZTogXCJteURCXCIgfSk7XHJcblx0KlxyXG5cdCogZGIuc2V0KFwidmlwc1wiLCBbXCIyNjQzNzg5MDg3NTYwMTcxNTRcIl0pO1xyXG5cdCogQCBUaGUgYWJvdmUgY29kZSB3b3VsZCBzZXQgYW4gYXJyYXkgb2YgVklQIHVzZXJzIGluIHRoZSBcInZpcHNcIiBrZXlcclxuXHQqIGBgYFxyXG5cdCovXHJcblx0cHVibGljIHNldChrZXk6IHN0cmluZyB8IG51bWJlciwgdmFsdWU6IGFueSk6IFJ1blJlc3VsdCB7XHJcblx0XHRpZiAoIWtleSB8fCAhW1wiU3RyaW5nXCIsIFwiTnVtYmVyXCJdLmluY2x1ZGVzKGtleS5jb25zdHJ1Y3Rvci5uYW1lKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVnVsdHJleEVycm9yKFwiVnVsdHJleCBEQiByZXF1aXJlcyBTdHJpbmcgb3IgTnVtYmVyIGFzIEtleS5cIiwgXCJWdWx0cmV4S2V5VHlwZUVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuZGIucHJlcGFyZShgSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyAnJHt0aGlzLnRhYmxlfScgKGtleSwgdmFsdWUpIFZBTFVFUyAoPywgPyk7YCkucnVuKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSBvciBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgZGF0YWJhc2VcclxuXHQqIEBwYXJhbSBrZXlcclxuXHQqIEBwYXJhbSBbZGVmYXVsdFZhbHVlXVxyXG5cdCogXHJcblx0KiBAZXhhbXBsZVxyXG5cdCogY29uc3QgVnVsdHJleERCID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XHJcblx0KiBjb25zdCBkYiA9IG5ldyBWdWx0cmV4REIoeyBuYW1lOiBcIm15REJcIiB9KTtcclxuXHQqIGRiLmdldChcInZpcHNcIiwgW10pO1xyXG5cdCpcclxuXHQqIEAgVGhlIGFib3ZlIGNvZGUgd291bGQgYHJldHVybjogW1wiMjY0Mzc4OTA4NzU2MDE3MTU0XCJdYCAoYW4gYXJyYXkgb2YgVklQIHVzZXJzKSBvciBhbiBlbXB0eSBhcnJheVxyXG5cdCogXHJcblx0Ki9cclxuXHRwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nIHwgbnVtYmVyLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwpOiBUIHtcclxuXHRcdGlmICgha2V5IHx8ICFbXCJTdHJpbmdcIiwgXCJOdW1iZXJcIl0uaW5jbHVkZXMoa2V5LmNvbnN0cnVjdG9yLm5hbWUpKSB7XHJcblx0XHRcdHRocm93IG5ldyBWdWx0cmV4RXJyb3IoXCJWdWx0cmV4IERCIHJlcXVpcmVzIFN0cmluZyBvciBOdW1iZXIgYXMgS2V5LlwiLCBcIlZ1bHRyZXhLZXlUeXBlRXJyb3JcIik7XHJcblx0XHR9XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy5kYi5wcmVwYXJlKGBTRUxFQ1QgdmFsdWUgRlJPTSAnJHt0aGlzLnRhYmxlfScgV0hFUkUga2V5ID0gPztgKS5nZXQoa2V5KTtcclxuXHRcdHJldHVybiBkYXRhID8gSlNPTi5wYXJzZShkYXRhLnZhbHVlKSA6IGRlZmF1bHRWYWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogXHJcblx0KiBAcGFyYW0ga2V5XHJcblx0Ki9cclxuXHRwdWJsaWMgaGFzKGtleTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoIWtleSB8fCAhW1wiU3RyaW5nXCIsIFwiTnVtYmVyXCJdLmluY2x1ZGVzKGtleS5jb25zdHJ1Y3Rvci5uYW1lKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVnVsdHJleEVycm9yKFwiVnVsdHJleCBEQiByZXF1aXJlcyBTdHJpbmcgb3IgTnVtYmVyIGFzIEtleS5cIiwgXCJWdWx0cmV4S2V5VHlwZUVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICEhdGhpcy5kYi5wcmVwYXJlKGBTRUxFQ1QgdmFsdWUgRlJPTSAnJHt0aGlzLnRhYmxlfScgV0hFUkUga2V5ID0gPztgKS5nZXQoa2V5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogUmV0dXJucyBhbiBBcnJheSB3aXRoIGFsbCBEYXRhIGZyb20gdGhlIERhdGFiYXNlXHJcblx0KiBcclxuXHQqIGBgYGphdmFzY3JpcHRcclxuXHQqIGNvbnN0IFZ1bHRyZXhEQiA9IHJlcXVpcmUoXCJ2dWx0cmV4LmRiXCIpO1xyXG5cdCogY29uc3QgZGIgPSBuZXcgVnVsdHJleERCKHsgbmFtZTogXCJteURCXCIgfSk7XHJcblx0KiBkYi5nZXRBbGwoKTtcclxuXHQqXHJcblx0KmBgYFxyXG5cdCogVGhlIGFib3ZlIGNvZGUgd291bGQgcmV0dXJuOiBbIHtrZXk6IFwidGVzdFwiLCB2YWx1ZTogXCJ0ZXN0IGRhdGFcIn0gXSAoYW4gYXJyYXkgb2YgZGF0YWJhc2Ugb2JqZWN0cylcclxuXHQqIFxyXG5cdCogQHJldHVyblxyXG5cdCovXHJcblx0cHVibGljIGdldEFsbCgpOiBSb3dbXSB7XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy5kYi5wcmVwYXJlKGBTRUxFQ1QgKiBGUk9NICcke3RoaXMudGFibGV9JztgKS5hbGwoKTtcclxuXHRcdHJldHVybiBkYXRhLm1hcChyb3cgPT4gKHsga2V5OiByb3cua2V5LCB2YWx1ZTogSlNPTi5wYXJzZShyb3cudmFsdWUpIH0pKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogUmVtb3ZlIGEgc3BlY2lmaWMga2V5IGZyb20gdGhlIGRhdGFiYXNlXHJcblx0KiBAcGFyYW0ga2V5IFxyXG5cdCogXHJcblx0KiBcclxuXHQqIGBgYGphdmFzY3JpcHRcclxuXHQqIGNvbnN0IFZ1bHRyZXhEQiA9IHJlcXVpcmUoXCJ2dWx0cmV4LmRiXCIpO1xyXG5cdCogY29uc3QgZGIgPSBuZXcgVnVsdHJleERCKHsgbmFtZTogXCJteURCXCIgfSk7XHJcblx0KiBkYi5yZW1vdmUoXCJ2aXBzXCIpO1xyXG5cdCogYGBgXHJcblx0KlxyXG5cdCogVGhlIGFib3ZlIGNvZGUgd291bGQgZGVsZXRlIGFsbCB0aGUgVklQIHVzZXJzIGZyb20gdGhlIGRhdGFiYXNlXHJcblx0KiBcclxuXHQqIEByZXR1cm5zIHtSdW5SZXN1bHR9XHJcblx0Ki9cclxuXHRwdWJsaWMgcmVtb3ZlKGtleTogU3RyaW5nIHwgTnVtYmVyKTogUnVuUmVzdWx0IHtcclxuXHRcdGlmICgha2V5IHx8ICFbXCJTdHJpbmdcIiwgXCJOdW1iZXJcIl0uaW5jbHVkZXMoa2V5LmNvbnN0cnVjdG9yLm5hbWUpKSB7XHJcblx0XHRcdHRocm93IG5ldyBWdWx0cmV4RXJyb3IoXCJWdWx0cmV4REIgcmVxdWlyZXMgU3RyaW5nIG9yIE51bWJlciBhcyBLZXkuXCIsIFwiVnVsdHJleEtleVR5cGVFcnJvclwiKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmRiLnByZXBhcmUoYERFTEVURSBGUk9NICcke3RoaXMudGFibGV9JyBXSEVSRSBrZXkgPSA/O2ApLnJ1bihrZXkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBEZWxldGVzIGFsbCBkYXRhIGZyb20gdGhlIHRhYmxlXHJcblx0KiBcclxuXHQqIEBleGFtcGxlXHJcblx0KiBjb25zdCBWdWx0cmV4REIgPSByZXF1aXJlKFwidnVsdHJleC5kYlwiKTtcclxuXHQqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7IG5hbWU6IFwibXlEQlwiIH0pO1xyXG5cdCogZGIuY2xlYXIoKTtcclxuXHQqIFxyXG5cdCpcclxuXHQqIEAgVGhlIGFib3ZlIGNvZGUgd291bGQgcmVzZXQgdGhlIHRhYmxlLlxyXG5cdCogXHJcblx0KiBAcmV0dXJucyB7dm9pZH1cclxuXHQqL1xyXG5cdHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuXHRcdHRoaXMuZGIucHJlcGFyZShgRFJPUCBUQUJMRSAnJHt0aGlzLnRhYmxlfSc7YCkucnVuKCk7XHJcblx0XHR0aGlzLl9pbml0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIEdldHMgdGhlIHNpemUgb2YgdGhlIHRhYmxlLlxyXG5cdCogXHJcblx0KiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCovXHJcblx0cHVibGljIGdldCBzaXplKCk6IG51bWJlciB7XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy5kYi5wcmVwYXJlKGBTRUxFQ1QgY291bnQoKikgRlJPTSAnJHt0aGlzLnRhYmxlfSc7YCkuZ2V0KCk7XHJcblx0XHRyZXR1cm4gZGF0YVtcImNvdW50KCopXCJdO1xyXG5cdH1cclxufSJdfQ==