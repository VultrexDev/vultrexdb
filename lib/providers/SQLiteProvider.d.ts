import { SQLiteProviderOptions } from "../interfaces/SQLiteProviderOptions";
import { RowData } from "../interfaces/RowData";
export declare class SQLiteProvider {
    private db;
    private tableName;
    private fileName;
    initialized: boolean;
    constructor(config: SQLiteProviderOptions);
    init(): Promise<void>;
    set(key: string | number, value: any): Promise<void>;
    get<T>(key: string | number, defaultValue: any): Promise<T>;
    getAll(): Promise<RowData[]>;
    size(): Promise<any>;
    delete(key: string | number): Promise<void>;
    clear(): Promise<void>;
}
