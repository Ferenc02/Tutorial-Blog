// db.ts

import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

let client: MongoClient;
let db: any;

export const connectToDB = async () => {
	if (db) {
		return db; // If already connected, return the existing connection
	}

	try {
		client = new MongoClient(env.MONGO_URI); // Replace with your MongoDB URI
		await client.connect();
		db = client.db('blogsDB'); // Replace with your DB name
		console.log('Connected to MongoDB');
		return db;
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		throw error;
	}
};

export const getBlogsLength = async () => {
	const collection = db.collection('blogs');
	return await collection.countDocuments();
};

export const getDb = () => db;
