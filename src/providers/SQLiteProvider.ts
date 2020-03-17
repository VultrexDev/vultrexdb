import sqlite, { Database } from "sqlite";
import { SQLiteProviderOptions } from "../interfaces/SQLiteProviderOptions";
import { RowData } from "../interfaces/RowData";

export class SQLiteProvider {
	private db: Database;

	private tableName: string;
	private fileName: string;
	public initialized: boolean = false;
	
	public constructor(config: SQLiteProviderOptions) {
		this.tableName = config.name || "Vultrex";
		this.fileName = config.fileName || "VultrexDB";
	}

	public async init() {
		this.db = await sqlite.open(`./${this.fileName}.db`);
		await this.db.run(`CREATE TABLE IF NOT EXISTS '${this.tableName}' (key TEXT PRIMARY KEY, value TEXT);`);
		this.initialized = true;
	}

	public async set(key: string | number, value: any) {
		this.db.run(`INSERT OR REPLACE INTO '${this.tableName}' (key, value) VALUES(?, ?);`, key, JSON.stringify(value));
	}

	public async get<T>(key: string | number, defaultValue: any): Promise<T> {
		const data = await this.db.get(`SELECT * FROM '${this.tableName}';`);
		if (data !== null) {
			return JSON.parse(data["value"]);
		}
		return defaultValue;
	}

	public async getAll(): Promise<RowData[]> {
		const data = await this.db.all(`SELECT * FROM '${this.tableName}';`);
		return data.map(data => ({ key: data["key"], value: JSON.parse(data["value"]) }));
	}

	public async size(): Promise<number> {
		const data = await this.db.run(`SELECT COUNT(*) FROM '${this.tableName}';`);
		return data["COUNT(*)"];
	}

	public async delete(key: string | number): Promise<void> {
		this.db.run(`DELETE FROM '${this.tableName}' WHERE key = ?;`, key);
	}

	public async clear(): Promise<void> {
		this.db.run(`DELETE FROM '${this.tableName}';`);
	}
}