// src/routes/api/update-blog/+server.ts
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { blogs } from '$lib/blogs.json';

const blogsPath = path.resolve('src/lib/blogs.json');

export async function POST({ request }) {
	const { title, updatedBlog } = await request.json();

	// Read the existing blogs
	const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8')).blogs;

	console.log(blogs);

	// Find the blog and update it
	const blogIndex = blogs.findIndex((blog) => blog.title === title);
	if (blogIndex !== -1) {
		blogs[blogIndex] = { ...blogs[blogIndex], ...updatedBlog };
	} else {
		return json({ success: false, message: 'Blog not found.' }, { status: 404 });
	}

	// Write the updated blogs back to the file
	fs.writeFileSync(blogsPath, JSON.stringify({ blogs }, null, 2));

	return json({ success: true, message: 'Blog updated successfully.' });
}
