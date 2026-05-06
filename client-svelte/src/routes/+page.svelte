<script lang="ts">
    const servers = [
        { id: 'netcore', name: 'ASP.NET Core', url: 'http://localhost:5001/api/hello', color: 'purple' },
        { id: 'python', name: 'Python Flask', url: 'http://localhost:5002/api/hello', color: 'green' },
        { id: 'node', name: 'Node.js Express', url: 'http://localhost:5003/api/hello', color: 'blue' }
    ];

    let responses = $state<Record<string, { data: any; error: string | null }>>({});
    let loading = $state<Record<string, boolean>>({});

    async function fetchServer(server: typeof servers[0]) {
        loading[server.id] = true;
        try {
            const res = await fetch(server.url);
            if (res.ok) {
                responses[server.id] = { data: await res.json(), error: null };
            } else {
                responses[server.id] = { data: null, error: `HTTP ${res.status}` };
            }
        } catch {
            responses[server.id] = { data: null, error: 'Server not available' };
        }
        loading[server.id] = false;
    }

    async function fetchAll() {
        await Promise.all(servers.map(fetchServer));
    }

    function getButtonStyle(color: string): string {
        const styles: Record<string, string> = {
            purple: 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800',
            green: 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800',
            blue: 'bg-sky-600 hover:bg-sky-700 disabled:bg-sky-800'
        };
        return styles[color] || styles.blue;
    }

    function getStatusIcon(error: string | null): string {
        return error === null ? '✓' : '✗';
    }

    function getStatusColor(error: string | null): string {
        return error === null ? 'text-green-400' : 'text-red-400';
    }
</script>

<svelte:head>
    <title>Hello World Demo - Svelte</title>
</svelte:head>

<main class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Hello World Demo</h1>
        <p class="text-gray-400 mb-10">Built with SvelteKit 5 - Test each server below</p>

        <div class="flex flex-col gap-4 mb-10">
            {#each servers as server}
                {@const response = responses[server.id]}
                {@const isLoading = loading[server.id]}
                <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-xl font-semibold">{server.name}</h2>
                            <p class="text-gray-500 text-sm">{server.url}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            {#if response}
                                <span class="{getStatusColor(response.error)} text-lg font-bold">
                                    {getStatusIcon(response.error)} {response.data?.message || response.error}
                                </span>
                            {/if}
                            <button
                                onclick={() => fetchServer(server)}
                                disabled={isLoading}
                                class="px-8 py-3 text-lg font-semibold rounded-lg transition-colors text-white {getButtonStyle(server.color)}"
                            >
                                {isLoading ? 'Testing...' : 'Test'}
                            </button>
                        </div>
                    </div>
                    {#if response?.data}
                        <div class="mt-3 text-gray-400 text-sm">
                            Server: {response.data.server} | {response.data.timestamp}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <button
            onclick={fetchAll}
            class="w-full py-4 text-lg font-semibold bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
        >
            Test All Servers
        </button>

        <footer class="mt-12 text-gray-500 text-sm">
            <p>Client: SvelteKit 5 with static adapter</p>
            <p>Servers: ASP.NET Core 9.0 | Python Flask | Node.js Express</p>
        </footer>
    </div>
</main>
