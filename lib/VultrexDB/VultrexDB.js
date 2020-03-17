"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VultrexDB {
    constructor(options) {
        this.provider = options.provider;
    }
    /**
     * Connect to SQLite or MongoDB
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     *     provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new MongoDBProvider({ url: "urlConnectionString" })
     * });
     * await db.connect();
    */
    async connect() {
        return this.provider.init();
    }
    /**
     * Get a value from the database with the specified key and optionally fallback to a default value
     *
     * @param key
     * @param defaultValue
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     * const value = await db.get("key", "defaultValue");
    */
    async get(key, defaultValue) {
        this.checkReady();
        return this.provider.get(key, defaultValue);
    }
    /**
     * Return an array of all values from the database
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     * const values = await db.getAll();
    */
    async getAll() {
        this.checkReady();
        return this.provider.getAll();
    }
    /**
     * Set a value of a key in the database
     *
     * @param key
     * @param value
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     * await db.set("key", "newValue");
    */
    async set(key, value) {
        this.checkReady();
        return this.provider.set(key, value);
    }
    /**
     * Delete a key from the database
     *
     * @param key
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     * await db.delete("key");
    */
    async delete(key) {
        this.checkReady();
        return this.provider.delete(key);
    }
    /**
     * Return the number of keys in the database
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     * const size = await db.size;
    */
    async size() {
        return this.provider.size();
    }
    /**
     * Delete all keys from the database
     *
     * @example
     * const { VultrexDB } = require("vultrex.db");
     * const db = new VultrexDB({
     * 		provider: new SQLiteProvider({ name: "main" })
     * });
     * await db.connect();
     * await db.clear();
    */
    async clear() {
        this.checkReady();
        return this.provider.clear();
    }
    checkReady() {
        if (!this.provider.initialized) {
            throw new Error("[VultrexDB] Provider has not been initialized yet.");
        }
    }
}
exports.VultrexDB = VultrexDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVnVsdHJleERCLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1Z1bHRyZXhEQi9WdWx0cmV4REIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxNQUFhLFNBQVM7SUFHckIsWUFBbUIsT0FBeUI7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztNQWdCRTtJQUNLLEtBQUssQ0FBQyxPQUFPO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7TUFhRTtJQUNLLEtBQUssQ0FBQyxHQUFHLENBQUksR0FBb0IsRUFBRSxZQUFpQjtRQUMxRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7Ozs7Ozs7O01BVUU7SUFDSyxLQUFLLENBQUMsTUFBTTtRQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztNQWFFO0lBQ0ssS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEtBQVU7UUFDaEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O01BWUU7SUFDSyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQW9CO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7OztNQVVFO0lBQ0ssS0FBSyxDQUFDLElBQUk7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7OztNQVVFO0lBQ0ssS0FBSyxDQUFDLEtBQUs7UUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU8sVUFBVTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0YsQ0FBQztDQUNEO0FBeElELDhCQXdJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNRTGl0ZVByb3ZpZGVyIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9TUUxpdGVQcm92aWRlclwiO1xuaW1wb3J0IHsgTW9uZ29EQlByb3ZpZGVyIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9Nb25nb0RCUHJvdmlkZXJcIjtcbmltcG9ydCB7IFJvd0RhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9Sb3dEYXRhXCI7XG5cbmludGVyZmFjZSBWdWx0cmV4REJPcHRpb25zIHtcblx0cHJvdmlkZXI6IFNRTGl0ZVByb3ZpZGVyIHwgTW9uZ29EQlByb3ZpZGVyO1xufVxuXG5leHBvcnQgY2xhc3MgVnVsdHJleERCIHtcblx0cHJpdmF0ZSBwcm92aWRlcjogU1FMaXRlUHJvdmlkZXIgfCBNb25nb0RCUHJvdmlkZXI7XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZ1bHRyZXhEQk9wdGlvbnMpIHtcblx0XHR0aGlzLnByb3ZpZGVyID0gb3B0aW9ucy5wcm92aWRlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25uZWN0IHRvIFNRTGl0ZSBvciBNb25nb0RCXG5cdCAqIFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCB7IFZ1bHRyZXhEQiB9ID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XG5cdCAqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7XG5cdCAqICAgICBwcm92aWRlcjogbmV3IFNRTGl0ZVByb3ZpZGVyKHsgbmFtZTogXCJtYWluXCIgfSlcblx0ICogfSk7XG5cdCAqIGF3YWl0IGRiLmNvbm5lY3QoKTtcblx0ICogXG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IHsgVnVsdHJleERCIH0gPSByZXF1aXJlKFwidnVsdHJleC5kYlwiKTtcblx0ICogY29uc3QgZGIgPSBuZXcgVnVsdHJleERCKHtcblx0ICogXHRcdHByb3ZpZGVyOiBuZXcgTW9uZ29EQlByb3ZpZGVyKHsgdXJsOiBcInVybENvbm5lY3Rpb25TdHJpbmdcIiB9KVxuXHQgKiB9KTtcblx0ICogYXdhaXQgZGIuY29ubmVjdCgpO1xuXHQqL1xuXHRwdWJsaWMgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRyZXR1cm4gdGhpcy5wcm92aWRlci5pbml0KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgdmFsdWUgZnJvbSB0aGUgZGF0YWJhc2Ugd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBhbmQgb3B0aW9uYWxseSBmYWxsYmFjayB0byBhIGRlZmF1bHQgdmFsdWVcblx0ICogXG5cdCAqIEBwYXJhbSBrZXkgXG5cdCAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgXG5cdCAqIFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCB7IFZ1bHRyZXhEQiB9ID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XG5cdCAqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7XG5cdCAqIFx0XHRwcm92aWRlcjogbmV3IFNRTGl0ZVByb3ZpZGVyKHsgbmFtZTogXCJtYWluXCIgfSlcblx0ICogfSk7XG5cdCAqIGF3YWl0IGRiLmNvbm5lY3QoKTtcblx0ICogY29uc3QgdmFsdWUgPSBhd2FpdCBkYi5nZXQoXCJrZXlcIiwgXCJkZWZhdWx0VmFsdWVcIik7XG5cdCovXG5cdHB1YmxpYyBhc3luYyBnZXQ8VD4oa2V5OiBzdHJpbmcgfCBudW1iZXIsIGRlZmF1bHRWYWx1ZTogYW55KTogUHJvbWlzZTxUPiB7XG5cdFx0dGhpcy5jaGVja1JlYWR5KCk7XG5cdFx0cmV0dXJuIHRoaXMucHJvdmlkZXIuZ2V0PFQ+KGtleSwgZGVmYXVsdFZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYW4gYXJyYXkgb2YgYWxsIHZhbHVlcyBmcm9tIHRoZSBkYXRhYmFzZVxuXHQgKiBcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgeyBWdWx0cmV4REIgfSA9IHJlcXVpcmUoXCJ2dWx0cmV4LmRiXCIpO1xuXHQgKiBjb25zdCBkYiA9IG5ldyBWdWx0cmV4REIoe1xuXHQgKiBcdFx0cHJvdmlkZXI6IG5ldyBTUUxpdGVQcm92aWRlcih7IG5hbWU6IFwibWFpblwiIH0pXG5cdCAqIH0pO1xuXHQgKiBhd2FpdCBkYi5jb25uZWN0KCk7XG5cdCAqIGNvbnN0IHZhbHVlcyA9IGF3YWl0IGRiLmdldEFsbCgpO1xuXHQqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8Um93RGF0YVtdPiB7XG5cdFx0dGhpcy5jaGVja1JlYWR5KCk7XG5cdFx0cmV0dXJuIHRoaXMucHJvdmlkZXIuZ2V0QWxsKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGEgdmFsdWUgb2YgYSBrZXkgaW4gdGhlIGRhdGFiYXNlXG5cdCAqIFxuXHQgKiBAcGFyYW0ga2V5IFxuXHQgKiBAcGFyYW0gdmFsdWUgXG5cdCAqIFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCB7IFZ1bHRyZXhEQiB9ID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XG5cdCAqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7XG5cdCAqIFx0XHRwcm92aWRlcjogbmV3IFNRTGl0ZVByb3ZpZGVyKHsgbmFtZTogXCJtYWluXCIgfSlcblx0ICogfSk7XG5cdCAqIGF3YWl0IGRiLmNvbm5lY3QoKTtcblx0ICogYXdhaXQgZGIuc2V0KFwia2V5XCIsIFwibmV3VmFsdWVcIik7XG5cdCovXG5cdHB1YmxpYyBhc3luYyBzZXQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIHZhbHVlOiBhbnkpIHtcblx0XHR0aGlzLmNoZWNrUmVhZHkoKTtcblx0XHRyZXR1cm4gdGhpcy5wcm92aWRlci5zZXQoa2V5LCB2YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogRGVsZXRlIGEga2V5IGZyb20gdGhlIGRhdGFiYXNlXG5cdCAqIFxuXHQgKiBAcGFyYW0ga2V5IFxuXHQgKiBcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgeyBWdWx0cmV4REIgfSA9IHJlcXVpcmUoXCJ2dWx0cmV4LmRiXCIpO1xuXHQgKiBjb25zdCBkYiA9IG5ldyBWdWx0cmV4REIoe1xuXHQgKiBcdFx0cHJvdmlkZXI6IG5ldyBTUUxpdGVQcm92aWRlcih7IG5hbWU6IFwibWFpblwiIH0pXG5cdCAqIH0pO1xuXHQgKiBhd2FpdCBkYi5jb25uZWN0KCk7XG5cdCAqIGF3YWl0IGRiLmRlbGV0ZShcImtleVwiKTtcblx0Ki9cblx0cHVibGljIGFzeW5jIGRlbGV0ZShrZXk6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuY2hlY2tSZWFkeSgpO1xuXHRcdHJldHVybiB0aGlzLnByb3ZpZGVyLmRlbGV0ZShrZXkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhlIGRhdGFiYXNlXG5cdCAqIFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCB7IFZ1bHRyZXhEQiB9ID0gcmVxdWlyZShcInZ1bHRyZXguZGJcIik7XG5cdCAqIGNvbnN0IGRiID0gbmV3IFZ1bHRyZXhEQih7XG5cdCAqIFx0XHRwcm92aWRlcjogbmV3IFNRTGl0ZVByb3ZpZGVyKHsgbmFtZTogXCJtYWluXCIgfSlcblx0ICogfSk7XG5cdCAqIGF3YWl0IGRiLmNvbm5lY3QoKTtcblx0ICogY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnNpemU7XG5cdCovXG5cdHB1YmxpYyBhc3luYyBzaXplKCk6IFByb21pc2U8bnVtYmVyPiB7XG5cdFx0cmV0dXJuIHRoaXMucHJvdmlkZXIuc2l6ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlbGV0ZSBhbGwga2V5cyBmcm9tIHRoZSBkYXRhYmFzZVxuXHQgKiBcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgeyBWdWx0cmV4REIgfSA9IHJlcXVpcmUoXCJ2dWx0cmV4LmRiXCIpO1xuXHQgKiBjb25zdCBkYiA9IG5ldyBWdWx0cmV4REIoe1xuXHQgKiBcdFx0cHJvdmlkZXI6IG5ldyBTUUxpdGVQcm92aWRlcih7IG5hbWU6IFwibWFpblwiIH0pXG5cdCAqIH0pO1xuXHQgKiBhd2FpdCBkYi5jb25uZWN0KCk7XG5cdCAqIGF3YWl0IGRiLmNsZWFyKCk7XG5cdCovXG5cdHB1YmxpYyBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLmNoZWNrUmVhZHkoKTtcblx0XHRyZXR1cm4gdGhpcy5wcm92aWRlci5jbGVhcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBjaGVja1JlYWR5KCkge1xuXHRcdGlmICghdGhpcy5wcm92aWRlci5pbml0aWFsaXplZCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiW1Z1bHRyZXhEQl0gUHJvdmlkZXIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldC5cIik7XG5cdFx0fVxuXHR9XG59Il19