// src/routes/api/update-blog/+server.ts
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

import { env } from '$env/dynamic/private';
import { connectToDB, getBlogsLength } from '$lib/db.js';

export async function POST({ request, cookies }) {
	// Verify if the user is authenticated and has the 'admin' status
	const token = cookies.get('session'); // Assuming you're storing an admin token in cookies

	if (!token || token !== env.ADMIN_TOKEN) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const { title, updatedBlog } = await request.json();

	// Read the existing blogs

	// Create a new blog
	let newBlog = {
		id: 0,
		title: `New Blog`,
		date: '2025-01-01',
		category: 'JavaScript',
		image: 'https://picsum.photos/id/366/600/300',
		imageCaption: 'Image Caption 1',
		content: [
			{
				type: 'text',
				text: 'This is a new blog post.'
			}
		]
	};

	newBlog = await createBlog(newBlog);

	return json({ success: true, title: newBlog.title, message: 'Blog updated successfully.' });
}

async function createBlog(blogData: any) {
	try {
		const db = await connectToDB();
		const collection = db.collection('blogs'); // Collection name

		let date = new Date();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let year = date.getFullYear();

		blogData.id = (await getBlogsLength()) + 1;
		blogData.date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
		blogData.title = `Blog ${blogData.id}`;

		// Insert a new blog document
		const result = await collection.insertOne(blogData);

		return blogData;
	} catch (e) {
		console.error('Error creating blog:', e);
	}
}
