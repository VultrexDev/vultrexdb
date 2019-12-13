import { RunResult, Database } from "better-sqlite3"

declare module "vultrex.db" {
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
		private readonly table: string;
		private readonly db: Database;

		constructor(options: VultrexDBOptions);

		/**
		 * Store the value with the given key inside of a database
		 * @param key 
		 * @param value 
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
		public set(key: String | Number, value: any): RunResult;

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
		public get<T>(key: String | Number, defaultValue?: any): T;

		/**
		 * 
		 * @param key 
		 * 
		 * @returns {boolean}
		 */
		public has(key: String | Number): boolean

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
		public remove(key: String | Number): RunResult;

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
		public getAll(): DBEntry[];

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
		public clear(): void;

		/**
		 * Gets the size of the table.
		 * 
		 * @returns {number}
		 */
		public get size(): number;
	}
}