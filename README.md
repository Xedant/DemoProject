# Hello World Demo Project

This demo project showcases multiple technology stacks working together with Xedant Code.

## Servers
- **server-netcore** - ASP.NET Core 9.0 minimal API (port 5001)
- **server-python** - Python Flask API (port 5002)
- **server-node** - Node.js Express API (port 5003)

## Clients
- **client-svelte** - SvelteKit 5 with static adapter
- **client-react** - React with Vite

## Prerequisites

The demo project contains **source files only** - no runtime dependencies are included or installed automatically.
You only need to install the prerequisites for the sub-projects you actually plan to use.

### .NET (for server-netcore)

Download and install the .NET 9.0 SDK from https://dotnet.microsoft.com/download/dotnet/9.0

### Python (for server-python)

1. Download Python 3.8+ from https://www.python.org/downloads/
2. During installation, check **"Add Python to PATH"**

### Node.js (for server-node, client-svelte, client-react)

1. Download Node.js 18+ LTS from https://nodejs.org/
2. npm is included with Node.js

## How to Use

1. Install prerequisites for the sub-projects you want to use (see above)
2. Build and deploy the servers using the Build panel in Xedant Code
3. Build the client projects
4. Open the built client in a browser to see "Hello World" from all servers

Each server exposes `/api/hello` endpoint returning a JSON response with:
- `message`: "Hello World"
- `server`: Server name/technology
- `timestamp`: Current time
