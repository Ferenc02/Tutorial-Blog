import { json } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';
import { connectToDB } from '$lib/db';

const uri = env.MONGO_URI;
const client = new MongoClient(uri);

export async function POST({ request, cookies }) {
	// Verify if the user is authenticated and has the 'admin' status
	const token = cookies.get('session'); // Assuming you're storing an admin token in cookies

	if (!token || token !== env.ADMIN_TOKEN) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const { title, updatedBlog } = await request.json();

	const db = await connectToDB();
	const collection = await db.collection('blogs');

	// Find the blog document using the title
	const blog = await collection.findOne({ title });

	if (!blog) {
		return json({ success: false, message: 'Blog not found' }, { status: 404 });
	}

	// Remove the _id field from updatedBlog before updating
	const { _id, ...blogWithoutId } = updatedBlog;

	// Update the blog
	await client.db('blogsDB').collection('blogs').updateOne({ title }, { $set: blogWithoutId });

	return json({ success: true, message: 'Blog updated successfully.', updatedBlog });
}
