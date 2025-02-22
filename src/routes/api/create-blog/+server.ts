// src/routes/api/update-blog/+server.ts
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { blogs } from '$lib/blogs.json';
import { env } from '$env/dynamic/private';
const blogsPath = path.resolve('src/lib/blogs.json');

export async function POST({ request, cookies }) {
	// Verify if the user is authenticated and has the 'admin' status
	const token = cookies.get('session'); // Assuming you're storing an admin token in cookies

	if (!token || token !== env.ADMIN_TOKEN) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const { title, updatedBlog } = await request.json();

	// Read the existing blogs
	const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8')).blogs;

	// Create a new blog
	const newBlog = {
		id: blogs.length + 1,
		title: `New Blog ${blogs.length + 1}`,
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

	blogs.push(newBlog);

	// Write the updated blogs back to the file
	fs.writeFileSync(blogsPath, JSON.stringify({ blogs }, null, 2));

	return json({ success: true, title: newBlog.title, message: 'Blog updated successfully.' });
}
