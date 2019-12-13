export default class VultrexError extends Error {
	public constructor(error: string, name: string = null) {
		super();
		this.name = name || "VultrexError";
		this.message = error;
	}
}