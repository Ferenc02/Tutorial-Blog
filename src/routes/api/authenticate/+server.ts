import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as cookie from 'cookie';

export async function POST({ request }) {
	const { password } = await request.json();

	if (password !== env.ADMIN_PASSWORD) {
		return json({ success: false }, { status: 401 });
	}

	const token = env.ADMIN_TOKEN;

	return json(
		{ success: true },
		{
			status: 200,
			headers: {
				'Set-Cookie': cookie.serialize('session', token, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24, // 1 day
					path: '/'
				})
			}
		}
	);
}
