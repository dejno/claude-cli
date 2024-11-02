// README.md usage section
# Claude CLI

A command-line interface for interacting with the Anthropic Claude API.

## Installation

```bash
# Install globally
npm install -g claude-cli

# Or install locally
npm install claude-cli
```

## Usage

```bash
# Show help
claude --help

# Configure API key and settings
claude configure

# Start a chat session
claude chat

# List all sessions
claude sessions -l

# Continue existing session
claude chat -s <session-id>

# Enable debug mode
claude -d chat

# Suppress output
claude -q chat
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start built version
npm start

# Run tests
npm test
```

## Environment Configuration

The CLI can be configured using environment variables or a `.env` file. Create a `.env` file in the project root:

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-xxxx  # Your Anthropic API key

# Optional
NODE_ENV=development           # development, test, or production
LOG_LEVEL=info                # error, warn, info, or debug
SESSIONS_DIR=.claude-cli/sessions  # Directory for storing chat sessions
MAX_HISTORY=100               # Maximum messages in history
TEMPERATURE=0.7              # Model temperature (0-1)
MAX_TOKENS=4096             # Maximum tokens per response
DEFAULT_MODEL=claude-3-5-sonnet-20241022  # Default Claude model
STREAM_OUTPUT=true          # Enable streaming responses
```

Environment variables take precedence over the configuration file. You can also use the `claude configure` command to set these values interactively.

Installation:

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your settings:
```bash
nano .env
```

3. Install new dependency:
```bash
npm install envalid
```