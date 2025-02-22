<script lang="ts">
	async function login(password: string) {
		const res = await fetch('/api/authenticate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		});

		const data = await res.json();
		if (data.success) {
			location.pathname = '/admin'; // Redirect after successful login
		} else {
			alert('Wrong password!');
		}
	}
</script>

<h1 class="text-center text-4xl font-bold">Login</h1>
<form
	class="mx-auto mt-8 flex w-1/2 flex-col gap-4"
	on:submit|preventDefault={async (e) => {
		const password = (e.target as HTMLFormElement).password.value;
		await login(password);
	}}
>
	<label for="password" class="text-lg">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		class="rounded-lg border border-gray-300 p-2"
	/>
	<button type="submit" class="cursor-pointer rounded-lg bg-blue-600 p-2 font-semibold text-white">
		Login
	</button>
</form>
