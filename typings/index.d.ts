import { RunResult } from "better-sqlite3";
interface VultrexDBOptions {
    name?: string;
    verbose?: () => void;
    timeout?: number;
    fileMustExist?: boolean;
    wal?: boolean;
    fileName?: string;
}
interface Row {
    key: string | number;
    value: any;
}
/**
 * The main instance. Creates a new database table.
 */
export declare class VultrexDB {
    private readonly table;
    private readonly wal;
    private readonly db;
    private readonly fileName;
    constructor(options: VultrexDBOptions);
    private _init;
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
    set(key: string | number, value: any): RunResult;
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
    get<T>(key: string | number, defaultValue?: any): T;
    /**
    *
    * @param key
    */
    has(key: string | number): boolean;
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
    getAll(): Row[];
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
    remove(key: String | Number): RunResult;
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
    clear(): void;
    /**
    * Gets the size of the table.
    *
    * @returns {number}
    */
    get size(): number;
}
export {};
