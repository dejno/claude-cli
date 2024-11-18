// README.md usage section
# Claude CLI

A command-line interface for interacting with the Anthropic Claude API.

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

## Local Install / Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration (see Environment Configuration below)

4. Start development mode:
```bash
npm run dev
```

This will:
- Clean the dist directory
- Build the TypeScript code
- Make the CLI executable
- Link it globally for testing
- You can now use the `claude` command anywhere in your terminal

The `dev` command automatically handles unlinking any previous versions, rebuilding, and relinking the CLI tool.

## Environment Configuration

The CLI can be configured using environment variables or a `.env` file. Create a `.env` file in the project root:

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-xxxx  # Your Anthropic API key

# Optional - Application Settings
NODE_ENV=development           # development, test, or production
LOG_LEVEL=info                # error, warn, info, or debug
SESSIONS_DIR=.claude-cli/sessions  # Directory for storing chat sessions

# Optional - Model Configuration
DEFAULT_MODEL=claude-3-5-sonnet-20241022  # Default Claude model
MAX_TOKENS=4096              # Maximum tokens per response
TEMPERATURE=0.7              # Model temperature (0-1)

# Optional - CLI Behavior
MAX_HISTORY=100              # Maximum messages in history
STREAM_OUTPUT=true           # Enable streaming responses

# Optional - Gmail Integration
GMAIL_USER=your.email@gmail.com  # Gmail address
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop  # Gmail App Password (16 characters)

# Optional - Weather Integration
WEATHER_API_KEY=xxx          # API key for weather service
WEATHER_API_URL=https://api.openweathermap.org/data/2.5  # Weather API base URL

# Optional - Database
DB_PATH=claude.db           # Path to SQLite database file

# Optional - Stock Integration
STOCK_API_KEY=xxx           # API key for stock price service
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
