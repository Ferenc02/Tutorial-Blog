import { json, redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import { connectToDB } from '$lib/db.js';

export async function load({ cookies }) {
	const token = cookies.get('session');

	const isAdmin = token === env.ADMIN_TOKEN;

	if (!token || token !== env.ADMIN_TOKEN) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	let blogs: any = [];

	const db = await connectToDB();
	const collection = await db.collection('blogs');

	blogs = await collection.find({}).toArray();

	blogs = blogs.map((blog: any) => ({
		...blog,
		_id: blog._id.toString() // Convert ObjectId to string
	}));

	return {
		isAdmin,
		blogs
	};
}
