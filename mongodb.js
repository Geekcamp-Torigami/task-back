import { MongoClient } from "mongodb";

const DB_HOST = "mongodb://localhost:27017/task";
export const connectMongoDb = async() => {
    const client = await MongoClient.connect(DB_HOST)
    const db = client.db();
    return db
}