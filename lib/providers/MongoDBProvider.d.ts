import { MongoDBProviderOptions } from "../interfaces/MongoDBProviderOptions";
import { RowData } from "../interfaces/RowData";
export declare class MongoDBProvider {
    private url;
    private collectionName;
    private client;
    private db;
    private collection;
    initialized: boolean;
    constructor(options: MongoDBProviderOptions);
    init(): Promise<void>;
    set(key: string | number, value: any): Promise<void>;
    get<T>(key: string | number, defaultValue: any): Promise<T>;
    getAll(): Promise<RowData[]>;
    size(): Promise<number>;
    delete(key: string | number): Promise<void>;
    clear(): Promise<void>;
}
