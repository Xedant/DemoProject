# CLAUDE.md

## Project Overview

Hello World demo showcasing multiple technology stacks with Xedant Code.

## Structure

- `server-netcore/` - ASP.NET Core 9.0 minimal API (port 5001)
- `server-python/` - Python Flask API (port 5002)
- `server-node/` - Node.js Express API (port 5003)
- `client-svelte/` - SvelteKit 5 static client
- `client-react/` - React static client

## Prerequisites

This project contains source files only. No runtime dependencies are included or installed automatically.
Only install prerequisites for sub-projects the user actually plans to use.

- **.NET (server-netcore)**: .NET 9.0 SDK - https://dotnet.microsoft.com/download/dotnet/9.0
- **Python (server-python)**: Python 3.8+ - https://www.python.org/downloads/ (check "Add to PATH" during install)
- **Node.js (server-node, client-svelte, client-react)**: Node.js 18+ LTS - https://nodejs.org/ (includes npm)

## Development

All servers expose `/api/hello` returning JSON: `{ message, server, timestamp }`.

Clients have big "Test" buttons on the home page to connect to each server individually.

## Code Practices

- Keep code minimal - this is a demo project
- Use `$state` and `$effect` runes in Svelte components
- Use functional components with hooks in React
