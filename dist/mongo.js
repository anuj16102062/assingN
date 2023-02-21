"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
// get environment variables for database uri and database name
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;
// create cache variables so we can cache our connection
let cachedClient = null;
let cachedDb = null;
let collections = null;
// database connection function
async function connectToDatabase() {
    // check for database connection string and db name
    if (!uri || !dbName) {
        throw new Error("No URI available for MongoDB connection");
    }
    // if have cached use it
    if (cachedClient && cachedDb && collections) {
        return { client: cachedClient, db: cachedDb, collections };
    }
    try {
        const client = await mongodb_1.MongoClient.connect(uri);
        // connect to specific database
        const db = await client.db(dbName);
        // set cache
        cachedClient = client;
        cachedDb = db;
        collections = { posts: db.collection("posts") };
        return { client, db, collections };
    }
    catch (e) {
        throw new Error();
    }
}
exports.connectToDatabase = connectToDatabase;
