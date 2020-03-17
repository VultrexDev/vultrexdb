import { MongoClient, Db, Collection } from "mongodb";
import { MongoDBProviderOptions } from "../interfaces/MongoDBProviderOptions";
import { RowData } from "../interfaces/RowData";

export class MongoDBProvider {

	private url: string;
	private collectionName: string;

	private client: MongoClient;
	private db: Db;
	private collection: Collection;
	
	public initialized: boolean = false;
	
	public constructor(options: MongoDBProviderOptions) {
		this.url = options.url;
		this.collectionName = options.collection || "Vultrex";
	}

	public async init() {
		this.client = new MongoClient(this.url, { useUnifiedTopology: true });
		await this.client.connect();

		this.db = this.client.db();
		this.collection = this.db.collection(this.collectionName);
		this.initialized = true;
	}

	public async set(key: string | number, value: any) {
		this.collection.updateOne({ _id: key }, { $set: { _id: key, value } }, { upsert: true });
	}

	public async get<T>(key: string | number, defaultValue: any): Promise<T> {
		const data = await this.collection.findOne({ _id: key });
		const result = data["value"];
		return result !== null ? result : defaultValue;
	}

	public async getAll(): Promise<RowData[]> {
		const data = await this.collection.find({}).toArray();
		return data.map(data => ({ key: data["_id"], value: data["value"] }));
	}

	public async size(): Promise<number> {
		return this.collection.countDocuments();
	}

	public async delete(key: string | number): Promise<void> {
		this.collection.deleteOne({ _id: key });
	}

	public async clear(): Promise<void> {
		this.collection.drop();
	}
}