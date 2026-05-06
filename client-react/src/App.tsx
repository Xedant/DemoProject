import { useState, useCallback } from 'react';

interface ServerConfig {
    id: string;
    name: string;
    url: string;
    color: string;
}

interface ServerResponse {
    message: string;
    server: string;
    timestamp: string;
}

interface ResponseState {
    data: ServerResponse | null;
    error: string | null;
}

const servers: ServerConfig[] = [
    { id: 'netcore', name: 'ASP.NET Core', url: 'http://localhost:5001/api/hello', color: '#9333ea' },
    { id: 'python', name: 'Python Flask', url: 'http://localhost:5002/api/hello', color: '#059669' },
    { id: 'node', name: 'Node.js Express', url: 'http://localhost:5003/api/hello', color: '#0284c7' }
];

const buttonStyles: Record<string, { bg: string; hover: string; disabled: string }> = {
    purple: { bg: '#9333ea', hover: '#7e22ce', disabled: '#6b21a8' },
    green: { bg: '#059669', hover: '#047857', disabled: '#065f46' },
    blue: { bg: '#0284c7', hover: '#0369a1', disabled: '#075985' }
};

function getButtonColors(color: string, isLoading: boolean): string {
    const key = color === '#9333ea' ? 'purple' : color === '#059669' ? 'green' : 'blue';
    const s = buttonStyles[key];
    return isLoading ? s.disabled : s.bg;
}

export default function App() {
    const [responses, setResponses] = useState<Record<string, ResponseState>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const fetchServer = useCallback(async (server: ServerConfig) => {
        setLoading(prev => ({ ...prev, [server.id]: true }));
        try {
            const res = await fetch(server.url);
            if (res.ok) {
                setResponses(prev => ({ ...prev, [server.id]: { data: await res.json(), error: null } }));
            } else {
                setResponses(prev => ({ ...prev, [server.id]: { data: null, error: `HTTP ${res.status}` } }));
            }
        } catch {
            setResponses(prev => ({ ...prev, [server.id]: { data: null, error: 'Server not available' } }));
        }
        setLoading(prev => ({ ...prev, [server.id]: false }));
    }, []);

    const fetchAll = useCallback(async () => {
        await Promise.all(servers.map(fetchServer));
    }, [fetchServer]);

    const cardStyle: React.CSSProperties = {
        backgroundColor: '#1f2937',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid #374151'
    };

    const rowStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const buttonBase: React.CSSProperties = {
        padding: '0.75rem 2rem',
        fontSize: '1.125rem',
        fontWeight: 600,
        borderRadius: '0.5rem',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        opacity: 1,
        transition: 'background-color 0.15s'
    };

    return (
        <main style={{
            minHeight: '100vh',
            backgroundColor: '#111827',
            color: 'white',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Hello World Demo
                </h1>
                <p style={{ color: '#9ca3af', marginBottom: '2.5rem' }}>
                    Built with React - Test each server below
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                    {servers.map((server) => {
                        const response = responses[server.id];
                        const isLoading = loading[server.id];
                        return (
                            <div key={server.id} style={cardStyle}>
                                <div style={rowStyle}>
                                    <div>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                            {server.name}
                                        </h2>
                                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                            {server.url}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {response && (
                                            <span style={{
                                                fontSize: '1.125rem',
                                                fontWeight: 'bold',
                                                color: response.error ? '#f87171' : '#4ade80'
                                            }}>
                                                {response.error ? '✗' : '✓'} {response.data?.message || response.error}
                                            </span>
                                        )}
                                        <button
                                            onClick={() => fetchServer(server)}
                                            disabled={isLoading}
                                            style={{
                                                ...buttonBase,
                                                backgroundColor: getButtonColors(server.color, isLoading),
                                                cursor: isLoading ? 'wait' : 'pointer',
                                                opacity: isLoading ? 0.7 : 1
                                            }}
                                        >
                                            {isLoading ? 'Testing...' : 'Test'}
                                        </button>
                                    </div>
                                </div>
                                {response?.data && (
                                    <div style={{ marginTop: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                                        Server: {response.data.server} | {response.data.timestamp}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={fetchAll}
                    style={{
                        ...buttonBase,
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: '#374151',
                        borderRadius: '0.75rem'
                    }}
                >
                    Test All Servers
                </button>

                <footer style={{ marginTop: '3rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    <p>Client: React with Vite</p>
                    <p>Servers: ASP.NET Core 9.0 | Python Flask | Node.js Express</p>
                </footer>
            </div>
        </main>
    );
}
