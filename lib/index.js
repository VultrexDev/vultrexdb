"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const VultrexError_1 = __importDefault(require("./VultrexError"));
class VultrexDB {
    constructor(options) {
        this.table = options.name;
        this.db = new better_sqlite3_1.default("./vultrex.db", {
            verbose: options.verbose || null,
            fileMustExist: options.fileMustExist || false,
            timeout: options.timeout || 5000
        });
        this._init();
    }
    _init() {
        this.db.prepare(`CREATE TABLE IF NOT EXISTS '${this.table}' (key TEXT PRIMARY KEY, value TEXT)`).run();
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
    * db.set("vips", ["264378908756017154"]);
    *
    *
    * @ The above code would set an array of VIP users in the "vips" key
    *
    * @returns {RunResult}
    */
    set(key, value) {
        if (!key || !["String", "Number"].includes(key.constructor.name)) {
            throw new VultrexError_1.default("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
        }
        return this.db.prepare(`INSERT OR REPLACE INTO '${this.table}' (key, value) VALUES (?, ?);`).run(key, JSON.stringify(value));
    }
    /**
    * Return the value for the given key or fall back to the default value from the database
    * @param key {string | number}
    * @param defaultValue {any}
    *
    * @example
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.get("vips", []);
    *
    *
    * @ The above code would `return: ["264378908756017154"]` (an array of VIP users) or an empty array
    *
    * @returns {T}
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
    *
    * @returns {boolean}
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
    * @example
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.getAll();
    *
    *
    * @ The above code would return: [ {key: "test", value: "test data"} ] (an array of database objects)
    *
    * @returns {getAll[]}
    */
    getAll() {
        const data = this.db.prepare(`SELECT * FROM '${this.table}';`).all();
        return data.map(row => ({ key: row.key, value: JSON.parse(row.value) }));
    }
    /**
    * Remove a specific key from the database
    * @param key
    *
    * @example
    * const VultrexDB = require("vultrex.db");
    * const db = new VultrexDB({ name: "myDB" });
    * db.remove("vips");
    *
    *
    * @ The above code would delete all the VIP users from the database
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNEQ7QUFDNUQsa0VBQTBDO0FBYzFDLE1BQWEsU0FBUztJQUtyQixZQUFtQixPQUF5QjtRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLHdCQUFNLENBQUMsY0FBYyxFQUFFO1lBQ3BDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUk7WUFDaEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhLElBQUksS0FBSztZQUM3QyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJO1NBQ2hDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTyxLQUFLO1FBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsK0JBQStCLElBQUksQ0FBQyxLQUFLLHNDQUFzQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFQTs7Ozs7Ozs7Ozs7Ozs7TUFjRTtJQUNJLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEtBQVU7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pFLE1BQU0sSUFBSSxzQkFBWSxDQUFDLDhDQUE4QyxFQUFFLHFCQUFxQixDQUFDLENBQUM7U0FDOUY7UUFDRCxPQUFPLElBQUksQ0FBQyxF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QUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNEO0FBbEpELDhCQWtKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzcWxpdGUsIHsgRGF0YWJhc2UsIFJ1blJlc3VsdCB9IGZyb20gXCJiZXR0ZXItc3FsaXRlM1wiXHJcbmltcG9ydCBWdWx0cmV4RXJyb3IgZnJvbSBcIi4vVnVsdHJleEVycm9yXCI7XHJcblxyXG5pbnRlcmZhY2UgVnVsdHJleERCT3B0aW9ucyB7XHJcblx0bmFtZTogc3RyaW5nXHJcblx0dmVyYm9zZT86ICgpID0+IHZvaWRcclxuXHR0aW1lb3V0PzogbnVtYmVyXHJcblx0ZmlsZU11c3RFeGlzdD86IGJvb2xlYW5cclxufVxyXG5cclxuaW50ZXJmYWNlIERCRW50cnkge1xyXG5cdGtleTogc3RyaW5nIHwgbnVtYmVyXHJcblx0dmFsdWU6IGFueVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVnVsdHJleERCIHtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSB0YWJsZTogU3RyaW5nO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgZGI6IERhdGFiYXNlO1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogVnVsdHJleERCT3B0aW9ucykge1xyXG5cdFx0dGhpcy50YWJsZSA9IG9wdGlvbnMubmFtZVxyXG5cdFx0dGhpcy5kYiA9IG5ldyBzcWxpdGUoXCIuL3Z1bHRyZXguZGJcIiwge1xyXG5cdFx0XHR2ZXJib3NlOiBvcHRpb25zLnZlcmJvc2UgfHwgbnVsbCxcclxuXHRcdFx0ZmlsZU11c3RFeGlzdDogb3B0aW9ucy5maWxlTXVzdEV4aXN0IHx8IGZhbHNlLFxyXG5cdFx0XHR0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgNTAwMFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5faW5pdCgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfaW5pdCgpIHtcclxuXHRcdHRoaXMuZGIucHJlcGFyZShgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgJyR7dGhpcy50YWJsZX0nIChrZXkgVEVYVCBQUklNQVJZIEtFWSwgdmFsdWUgVEVYVClgKS5ydW4oKTtcclxuXHRcdHRoaXMuZGIucHJhZ21hKFwic3luY2hyb25vdXMgPSAxXCIpO1xyXG5cdFx0dGhpcy5kYi5wcmFnbWEoXCJqb3VybmFsX21vZGUgPSB3YWxcIik7XHJcblx0fVxyXG5cclxuXHQgLyoqXHJcblx0ICogU3RvcmUgdGhlIHZhbHVlIHdpdGggdGhlIGdpdmVuIGtleSBpbnNpZGUgb2YgYSBkYXRhYmFzZVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBrZXkgUmVxdWlyZWQuXHJcblx0ICogQHBhcmFtIHthbnl9IHZhbHVlXHJcblx0ICogXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBjb25zdCBWdWx0cmV4REIgPSByZXF1aXJlKFwidnVsdHJleGRiXCIpO1xyXG5cdCAqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7IG5hbWU6IFwibXlEQlwiIH0pO1xyXG5cdCAqIGRiLnNldChcInZpcHNcIiwgW1wiMjY0Mzc4OTA4NzU2MDE3MTU0XCJdKTtcclxuXHQgKlxyXG5cdCAqXHJcblx0ICogQCBUaGUgYWJvdmUgY29kZSB3b3VsZCBzZXQgYW4gYXJyYXkgb2YgVklQIHVzZXJzIGluIHRoZSBcInZpcHNcIiBrZXlcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7UnVuUmVzdWx0fVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXQoa2V5OiBTdHJpbmcgfCBOdW1iZXIsIHZhbHVlOiBhbnkpOiBSdW5SZXN1bHQge1xyXG5cdFx0aWYgKCFrZXkgfHwgIVtcIlN0cmluZ1wiLCBcIk51bWJlclwiXS5pbmNsdWRlcyhrZXkuY29uc3RydWN0b3IubmFtZSkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFZ1bHRyZXhFcnJvcihcIlZ1bHRyZXggREIgcmVxdWlyZXMgU3RyaW5nIG9yIE51bWJlciBhcyBLZXkuXCIsIFwiVnVsdHJleEtleVR5cGVFcnJvclwiKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmRiLnByZXBhcmUoYElOU0VSVCBPUiBSRVBMQUNFIElOVE8gJyR7dGhpcy50YWJsZX0nIChrZXksIHZhbHVlKSBWQUxVRVMgKD8sID8pO2ApLnJ1bihrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHQgLyoqXHJcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSBvciBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgZGF0YWJhc2VcclxuXHQgKiBAcGFyYW0ga2V5IHtzdHJpbmcgfCBudW1iZXJ9XHJcblx0ICogQHBhcmFtIGRlZmF1bHRWYWx1ZSB7YW55fVxyXG5cdCAqIFxyXG5cdCAqIEBleGFtcGxlXHJcblx0ICogY29uc3QgVnVsdHJleERCID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XHJcblx0ICogY29uc3QgZGIgPSBuZXcgVnVsdHJleERCKHsgbmFtZTogXCJteURCXCIgfSk7XHJcblx0ICogZGIuZ2V0KFwidmlwc1wiLCBbXSk7XHJcblx0ICogXHJcblx0ICogXHJcblx0ICogQCBUaGUgYWJvdmUgY29kZSB3b3VsZCBgcmV0dXJuOiBbXCIyNjQzNzg5MDg3NTYwMTcxNTRcIl1gIChhbiBhcnJheSBvZiBWSVAgdXNlcnMpIG9yIGFuIGVtcHR5IGFycmF5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7VH1cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0PFQ+KGtleTogU3RyaW5nIHwgTnVtYmVyLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwpOiBUIHtcclxuXHRcdGlmICgha2V5IHx8ICFbXCJTdHJpbmdcIiwgXCJOdW1iZXJcIl0uaW5jbHVkZXMoa2V5LmNvbnN0cnVjdG9yLm5hbWUpKSB7XHJcblx0XHRcdHRocm93IG5ldyBWdWx0cmV4RXJyb3IoXCJWdWx0cmV4IERCIHJlcXVpcmVzIFN0cmluZyBvciBOdW1iZXIgYXMgS2V5LlwiLCBcIlZ1bHRyZXhLZXlUeXBlRXJyb3JcIik7XHJcblx0XHR9XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy5kYi5wcmVwYXJlKGBTRUxFQ1QgdmFsdWUgRlJPTSAnJHt0aGlzLnRhYmxlfScgV0hFUkUga2V5ID0gPztgKS5nZXQoa2V5KTtcclxuXHRcdHJldHVybiBkYXRhID8gSlNPTi5wYXJzZShkYXRhLnZhbHVlKSA6IGRlZmF1bHRWYWx1ZTtcclxuXHR9XHJcblxyXG5cdCAvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ga2V5IFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoYXMoa2V5OiBTdHJpbmcgfCBOdW1iZXIpOiBib29sZWFuIHtcclxuXHRcdGlmICgha2V5IHx8ICFbXCJTdHJpbmdcIiwgXCJOdW1iZXJcIl0uaW5jbHVkZXMoa2V5LmNvbnN0cnVjdG9yLm5hbWUpKSB7XHJcblx0XHRcdHRocm93IG5ldyBWdWx0cmV4RXJyb3IoXCJWdWx0cmV4IERCIHJlcXVpcmVzIFN0cmluZyBvciBOdW1iZXIgYXMgS2V5LlwiLCBcIlZ1bHRyZXhLZXlUeXBlRXJyb3JcIik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gISF0aGlzLmRiLnByZXBhcmUoYFNFTEVDVCB2YWx1ZSBGUk9NICcke3RoaXMudGFibGV9JyBXSEVSRSBrZXkgPSA/O2ApLmdldChrZXkpO1xyXG5cdH1cclxuXHJcblx0IC8qKlxyXG5cdCAqIFJldHVybnMgYW4gQXJyYXkgd2l0aCBhbGwgRGF0YSBmcm9tIHRoZSBEYXRhYmFzZVxyXG5cdCAqIFxyXG5cdCAqIEBleGFtcGxlXHJcblx0ICogY29uc3QgVnVsdHJleERCID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XHJcblx0ICogY29uc3QgZGIgPSBuZXcgVnVsdHJleERCKHsgbmFtZTogXCJteURCXCIgfSk7XHJcblx0ICogZGIuZ2V0QWxsKCk7XHJcblx0ICpcclxuXHQgKlxyXG5cdCAqIEAgVGhlIGFib3ZlIGNvZGUgd291bGQgcmV0dXJuOiBbIHtrZXk6IFwidGVzdFwiLCB2YWx1ZTogXCJ0ZXN0IGRhdGFcIn0gXSAoYW4gYXJyYXkgb2YgZGF0YWJhc2Ugb2JqZWN0cylcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7Z2V0QWxsW119XHJcblx0ICovXHJcblx0cHVibGljIGdldEFsbCgpOiBEQkVudHJ5W10ge1xyXG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuZGIucHJlcGFyZShgU0VMRUNUICogRlJPTSAnJHt0aGlzLnRhYmxlfSc7YCkuYWxsKCk7XHJcblx0XHRyZXR1cm4gZGF0YS5tYXAocm93ID0+ICh7IGtleTogcm93LmtleSwgdmFsdWU6IEpTT04ucGFyc2Uocm93LnZhbHVlKSB9KSk7XHJcblx0fVxyXG5cclxuXHQgLyoqXHJcblx0ICogUmVtb3ZlIGEgc3BlY2lmaWMga2V5IGZyb20gdGhlIGRhdGFiYXNlXHJcblx0ICogQHBhcmFtIGtleSBcclxuXHQgKiBcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIGNvbnN0IFZ1bHRyZXhEQiA9IHJlcXVpcmUoXCJ2dWx0cmV4LmRiXCIpO1xyXG5cdCAqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7IG5hbWU6IFwibXlEQlwiIH0pO1xyXG5cdCAqIGRiLnJlbW92ZShcInZpcHNcIik7XHJcblx0ICogXHJcblx0ICpcclxuXHQgKiBAIFRoZSBhYm92ZSBjb2RlIHdvdWxkIGRlbGV0ZSBhbGwgdGhlIFZJUCB1c2VycyBmcm9tIHRoZSBkYXRhYmFzZVxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtSdW5SZXN1bHR9XHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZShrZXk6IFN0cmluZyB8IE51bWJlcik6IFJ1blJlc3VsdCB7XHJcblx0XHRpZiAoIWtleSB8fCAhW1wiU3RyaW5nXCIsIFwiTnVtYmVyXCJdLmluY2x1ZGVzKGtleS5jb25zdHJ1Y3Rvci5uYW1lKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVnVsdHJleEVycm9yKFwiVnVsdHJleERCIHJlcXVpcmVzIFN0cmluZyBvciBOdW1iZXIgYXMgS2V5LlwiLCBcIlZ1bHRyZXhLZXlUeXBlRXJyb3JcIik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5wcmVwYXJlKGBERUxFVEUgRlJPTSAnJHt0aGlzLnRhYmxlfScgV0hFUkUga2V5ID0gPztgKS5ydW4oa2V5KTtcclxuXHR9XHJcblxyXG5cdCAvKipcclxuXHQgKiBEZWxldGVzIGFsbCBkYXRhIGZyb20gdGhlIHRhYmxlXHJcblx0ICogXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBjb25zdCBWdWx0cmV4REIgPSByZXF1aXJlKFwidnVsdHJleC5kYlwiKTtcclxuXHQgKiBjb25zdCBkYiA9IG5ldyBWdWx0cmV4REIoeyBuYW1lOiBcIm15REJcIiB9KTtcclxuXHQgKiBkYi5jbGVhcigpO1xyXG5cdCAqIFxyXG5cdCAqXHJcblx0ICogQCBUaGUgYWJvdmUgY29kZSB3b3VsZCByZXNldCB0aGUgdGFibGUuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge3ZvaWR9XHJcblx0ICovXHJcblx0cHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5kYi5wcmVwYXJlKGBEUk9QIFRBQkxFICcke3RoaXMudGFibGV9JztgKS5ydW4oKTtcclxuXHRcdHRoaXMuX2luaXQoKTtcclxuXHR9XHJcblxyXG5cdCAvKipcclxuXHQgKiBHZXRzIHRoZSBzaXplIG9mIHRoZSB0YWJsZS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuZGIucHJlcGFyZShgU0VMRUNUIGNvdW50KCopIEZST00gJyR7dGhpcy50YWJsZX0nO2ApLmdldCgpO1xyXG5cdFx0cmV0dXJuIGRhdGFbXCJjb3VudCgqKVwiXTtcclxuXHR9XHJcbn0iXX0=