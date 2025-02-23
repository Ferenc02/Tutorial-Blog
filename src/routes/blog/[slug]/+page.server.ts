import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

import { page } from '$app/state';
import { connectToDB } from '$lib/db';

export async function load({ params, cookies }) {
	//Get the current title from the URL
	const { slug } = params;
	const decodedSlug = decodeURIComponent(slug); // Decode the URL-encoded slug

	try {
		const db = await connectToDB();
		const collection = db.collection('blogs');

		// Get the blog with the matching title
		let blog: any = await collection.findOne({ title: decodedSlug });

		// Serialize the blog
		blog = blog?._id ? { ...blog, _id: blog._id.toString() } : null;
		const token = cookies.get('session');

		const isAdmin = token === env.ADMIN_TOKEN;

		return {
			isAdmin,
			blog
		};
	} catch (e) {
		console.error('Error getting blog:', e);
	}
}
