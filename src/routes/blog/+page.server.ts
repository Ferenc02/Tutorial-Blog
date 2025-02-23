import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import { MongoClient } from 'mongodb';
import { connectToDB } from '$lib/db';

export async function load({ cookies }) {
	const token = cookies.get('session');

	const isAdmin = token === env.ADMIN_TOKEN;

	const uri = env.MONGO_URI;
	const client = new MongoClient(uri);

	let blogs: any = [];
	try {
		const db = await connectToDB();
		const collection = await db.collection('blogs');

		blogs = await collection.find({}).toArray();
		blogs = blogs.map((blog: any) => ({
			...blog,
			_id: blog._id.toString() // Convert ObjectId to string
		}));
	} catch (e) {
		console.error('Error getting blog:', e);
	}

	return {
		isAdmin,
		blogs
	};
}
