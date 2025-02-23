// src/routes/api/update-blog/+server.ts

import fs from 'fs';
import path from 'path';

import { env } from '$env/dynamic/private';

import { json } from '@sveltejs/kit';
import { connectToDB } from '$lib/db.js';

export async function POST({ request, cookies }) {
	// Verify if the user is authenticated and has the 'admin' status
	const token = cookies.get('session'); // Assuming you're storing an admin token in cookies

	if (!token || token !== env.ADMIN_TOKEN) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const { title, updatedBlog } = await request.json();

	const db = await connectToDB();
	const collection = await db.collection('blogs');

	// Read the existing blogs
	const blogs = await collection.find({}).toArray();

	// Find the blog and delete it
	const blogIndex = blogs.findIndex((blog: any) => blog.title === title);
	if (blogIndex === -1) {
		return json({ success: false, message: 'Blog not found' }, { status: 404 });
	}

	let result = await collection.deleteOne({ title });

	return json({ success: true, message: 'Blog Deleted successfully.' });
}
