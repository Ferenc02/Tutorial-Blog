import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

export async function load({ cookies }) {
	const token = cookies.get('session');

	if (!token || token !== env.ADMIN_TOKEN) {
		throw redirect(303, '/login');
	}

	return {
		status: 200,
		headers: {
			'Cache-Control': 'no-store'
		}
	};
}
