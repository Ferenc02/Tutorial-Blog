import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { connectToDB } from '$lib/db';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');

	const isAdmin = token === env.ADMIN_TOKEN;

	return {
		isAdmin,
		blogs: loadBlogs()
	};
};

const loadBlogs = async () => {
	const db = await connectToDB();
	let blogs = await db.collection('blogs').find().toArray();

	blogs = blogs.map((blog: any) => ({
		...blog,
		_id: blog._id.toString()
	}));

	return blogs;
};
