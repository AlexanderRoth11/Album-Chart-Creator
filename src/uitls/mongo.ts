import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@albumchart.rtql1.mongodb.net/?retryWrites=true&w=majority&appName=AlbumChart`;

let client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

clientPromise = client.connect();

export default clientPromise;
