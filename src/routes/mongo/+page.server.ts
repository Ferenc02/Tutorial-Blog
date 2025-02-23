import { env } from '$env/dynamic/private';
import { connectToDB } from '$lib/db';

async function createBlog(blogData: any) {
	try {
		const db = await connectToDB();
		const collection = await db.collection('blogs');

		// Insert a new blog document
		const result = await collection.insertOne(blogData);
		console.log('Blog created:', result);
	} catch (e) {
		console.error('Error creating blog:', e);
	}
}

// Sample blog data to insert
const newBlog = {
	id: 1,
	title: 'Blog 1',
	date: '2025-01-02',
	category: 'JavaScript',
	image: 'https://picsum.photos/id/366/600/300',
	imageCaption: 'Image Caption 1',
	content: [{ type: 'text', text: 'Being a developer is fun :)' }]
};

createBlog(newBlog);
