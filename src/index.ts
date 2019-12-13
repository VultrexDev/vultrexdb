import sqlite, { Database, RunResult } from "better-sqlite3"
import VultrexError from "./VultrexError";

interface VultrexDBOptions {
	name: string
	verbose?: () => void
	timeout?: number
	fileMustExist?: boolean
}

interface DBEntry {
	key: string | number
	value: any
}

export class VultrexDB {

	private readonly table: String;
	private readonly db: Database;

	public constructor(options: VultrexDBOptions) {
		this.table = options.name
		this.db = new sqlite("./vultrex.db", {
			verbose: options.verbose || null,
			fileMustExist: options.fileMustExist || false,
			timeout: options.timeout || 5000
		});

		this._init();
	}

	private _init() {
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
	public set(key: String | Number, value: any): RunResult {
		if (!key || !["String", "Number"].includes(key.constructor.name)) {
			throw new VultrexError("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
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
	public get<T>(key: String | Number, defaultValue: any = null): T {
		if (!key || !["String", "Number"].includes(key.constructor.name)) {
			throw new VultrexError("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
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
	public has(key: String | Number): boolean {
		if (!key || !["String", "Number"].includes(key.constructor.name)) {
			throw new VultrexError("Vultrex DB requires String or Number as Key.", "VultrexKeyTypeError");
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
	public getAll(): DBEntry[] {
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
	public remove(key: String | Number): RunResult {
		if (!key || !["String", "Number"].includes(key.constructor.name)) {
			throw new VultrexError("VultrexDB requires String or Number as Key.", "VultrexKeyTypeError");
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
	public clear(): void {
		this.db.prepare(`DROP TABLE '${this.table}';`).run();
		this._init();
	}

	 /**
	 * Gets the size of the table.
	 * 
	 * @returns {number}
	 */
	public get size(): number {
		const data = this.db.prepare(`SELECT count(*) FROM '${this.table}';`).get();
		return data["count(*)"];
	}
}