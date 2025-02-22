import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

export async function load({ cookies }) {
	const token = cookies.get('session');

	const isAdmin = token === env.ADMIN_TOKEN;

	return {
		isAdmin
	};
}
