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

	// Find the blog and delete it
	const blogIndex = blogs.findIndex((blog: any) => blog.title === title);
	if (blogIndex !== -1) {
		blogs.splice(blogIndex, 1);
	} else {
		return json({ success: false, message: 'Blog not found.' }, { status: 404 });
	}

	// Write the updated blogs back to the file
	fs.writeFileSync(blogsPath, JSON.stringify({ blogs }, null, 2));

	return json({ success: true, message: 'Blog Deleted successfully.' });
}
