# 🚀 Claude Code Configs

[![NPM Version](https://img.shields.io/npm/v/claude-config-composer)](https://www.npmjs.com/package/claude-config-composer)
[![NPM Downloads](https://img.shields.io/npm/dm/claude-config-composer)](https://www.npmjs.com/package/claude-config-composer)
[![GitHub Stars](https://img.shields.io/github/stars/Matt-Dionis/claude-code-configs)](https://github.com/Matt-Dionis/claude-code-configs)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Tests](https://github.com/Matt-Dionis/claude-code-configs/actions/workflows/ci.yml/badge.svg)](https://github.com/Matt-Dionis/claude-code-configs/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/node/v/claude-config-composer)](https://nodejs.org)

> **Production-ready Claude Code configurations for popular frameworks and tools**

🎉 **Version 1.0.0** - Production-ready with comprehensive testing and 124 passing tests
📦 **NPM Package** - Install with `npm install -g claude-config-composer` or use `npx`

## 🚨 **Breaking Changes for Existing Users**

**This release fundamentally changes how configs are organized and used.**

- ✅ **Migration Guide Available:** [MIGRATION.md](MIGRATION.md)
- 🔄 Individual configs moved to `configurations/` directory
- 🎯 New CLI tool for intelligent config merging
- ⚠️ Direct directory copying is deprecated

## 🎯 Key Features

- ✅ **124 Passing Tests** - Comprehensive test coverage
- ✅ **8+ Production Configurations** - Frameworks, UI libraries, databases, MCP servers, and tools
- ✅ **Intelligent Merging** - Combine multiple configs without conflicts
- ✅ **Zero Dependencies** (runtime) - Lightweight and fast
- ✅ **TypeScript** - Full type safety and modern development
- ✅ **Git Integration** - Automatic .gitignore updates and backups


https://github.com/user-attachments/assets/5b407973-4148-49e3-872f-ce3f9a3161f8


### Report Issues

Found a bug? Please report it at [GitHub Issues](https://github.com/Matt-Dionis/claude-code-configs/issues)

## 🎯 Two Ways to Use This Repository

### 1. 🚀 Generate Combined Configs (Recommended)

**Quick Start with NPX (No Installation Required):**

```bash
# Generate configs directly in your project
npx claude-config-composer nextjs-15 shadcn

# Or use interactive mode
npx claude-config-composer
```

**Global Installation:**

```bash
# Install globally for frequent use
npm install -g claude-config-composer

# Then use from any project
claude-compose nextjs-15 shadcn tailwindcss
```

**Local Development (For Contributors):**

```bash
# Clone and set up the composer
git clone https://github.com/Matt-Dionis/claude-code-configs.git
cd claude-code-configs/claude-config-composer
npm install && npm run build

# Generate configs from your project directory
cd /path/to/your/project
node /path/to/claude-code-configs/claude-config-composer/dist/cli.js nextjs-15 shadcn
```

**✨ Features:**

- Intelligently merges multiple configs
- Automatic backups of existing configs
- Git-friendly (auto-adds to .gitignore)
- Production-ready output
- Zero installation (once published to npm)

### 2. 📁 Manual Copy Individual Configs

**For single framework setups:**

```bash
# Copy a specific configuration to your project
cp -r configurations/frameworks/nextjs-15/.claude your-project/
cp configurations/frameworks/nextjs-15/CLAUDE.md your-project/
```

**Available configurations:**

**Frameworks:**

- `nextjs-15` - Next.js 15 with App Router and React 19

**UI & Styling:**

- `shadcn` - shadcn/ui component library with Radix UI
- `tailwindcss` - Utility-first CSS framework with responsive design

**Databases:**

- `drizzle` - Type-safe ORM with schema management and migrations

**Development Tools:**

- `vercel-ai-sdk` - Streaming AI applications with function calling

**MCP Servers (Complete Solutions):**

- `memory-mcp-server` - MCP server with vector search and persistence
- `token-gated-mcp-server` - Token-gated MCP server using the [Radius MCP SDK](https://github.com/radiustechsystems/mcp-sdk)

## 📸 What Gets Generated - Before & After Example

### Before: Empty Project Directory

```
your-nextjs-project/
├── app/
├── components/
├── package.json
└── next.config.js
```

### After: Running `npx claude-config-composer nextjs-15 shadcn tailwindcss`

```
your-nextjs-project/
├── app/
├── components/
├── package.json
├── next.config.js
├── CLAUDE.md                   # ✨ Combined best practices from all configs
└── .claude/                    # ✨ Generated configuration
    ├── agents/
    │   ├── nextjs-app-router.md         # Next.js routing expertise
    │   ├── component-builder.md         # shadcn component patterns
    │   ├── responsive-designer.md       # Tailwind responsive design
    │   └── ... (20+ more specialized agents)
    ├── commands/
    │   ├── create-page.md               # Generate Next.js pages
    │   ├── add-component.md             # Add shadcn components
    │   ├── optimize-styles.md           # Tailwind optimization
    │   └── ... (15+ workflow commands)
    ├── hooks/
    │   ├── format-code.sh               # Auto-format on save
    │   ├── validate-components.sh       # Component validation
    │   └── optimize-imports.sh          # Import optimization
    └── settings.json                    # Merged permissions & env vars
```

### 🎯 Key Benefits of Generated Config

- **40+ specialized agents** covering Next.js, shadcn, and Tailwind expertise
- **Intelligent permission controls** tailored to your stack
- **Automated workflows** via hooks for formatting, validation, and optimization
- **Zero conflicts** - all configurations intelligently merged
- **Production-ready** - works immediately with Claude Code

## 📁 Repository Structure

```text
claude-config-composer/         # 🔧 Dynamic config generator CLI tool
├── src/
│   ├── cli.ts                 # Interactive CLI interface
│   ├── parser/                # Config parsing logic
│   ├── merger/                # Intelligent merging
│   └── generator/             # .claude directory generation
└── README.md                  # Tool documentation

configurations/                 # 📦 All Claude Code configurations
├── frameworks/                 # Framework-specific configurations
│   └── nextjs-15/             # Next.js 15 with App Router & React 19
│       ├── .claude/           # Complete config with agents, commands, hooks
│       ├── CLAUDE.md          # Next.js 15 development patterns
│       └── README.md          # Setup and usage guide
├── ui/                        # UI library and styling configurations
│   ├── shadcn/                # shadcn/ui component library
│   │   ├── .claude/           # UI development agents and commands
│   │   ├── CLAUDE.md          # Component patterns and best practices
│   │   └── README.md          # Installation and setup guide
│   └── tailwindcss/           # Utility-first CSS framework
│       ├── .claude/           # Styling and design system agents
│       ├── CLAUDE.md          # Tailwind patterns and optimization
│       └── README.md          # Configuration and usage guide
├── databases/                  # Database and ORM configurations
│   └── drizzle/               # Type-safe ORM with migrations
│       ├── .claude/           # Database development agents
│       ├── CLAUDE.md          # Schema management and query patterns
│       └── README.md          # Setup and migration guide
├── tooling/                   # Development tools and SDKs
│   └── vercel-ai-sdk/         # AI application development
│       ├── .claude/           # AI development agents and workflows
│       ├── CLAUDE.md          # Streaming and function calling patterns
│       └── README.md          # SDK setup and usage guide
└── mcp-servers/               # Complete MCP server solutions
    ├── memory-mcp-server/     # Memory-enabled MCP server
    │   ├── .claude/           # Full-stack development agents
    │   ├── CLAUDE.md          # Vector search and persistence patterns
    │   └── README.md          # Complete setup guide
    └── token-gated-mcp-server/ # Authentication-enabled MCP server
        ├── .claude/           # Security and auth agents
        ├── CLAUDE.md          # Token management and security patterns
        └── README.md          # Authentication setup guide

docs/                          # 📚 Documentation and guides
├── claude-code-github-actions.md
├── claude-code-sdk.md
├── get-started-with-claude-code-hooks.md
└── [other documentation files]

# 🚧 Coming Soon:
# configurations/
# ├── frameworks/
# │   ├── react-19/           # Standalone React 19 patterns
# │   └── svelte-5/           # SvelteKit 2.0 configuration
# ├── databases/
# │   ├── prisma/             # Alternative ORM configuration
# │   └── supabase/           # Backend-as-a-Service setup
# ├── testing/
# │   ├── vitest/             # Fast testing framework
# │   └── playwright/         # E2E testing configuration
# └── tooling/
#     ├── zod/                # Schema validation patterns
#     └── trpc/               # End-to-end type safety
```

## 🚀 Quick Start with Claude Config Composer

### Install and Use

```bash
# Quick start with npx (no installation)
npx claude-config-composer nextjs-15 shadcn tailwindcss

# Or install globally
npm install -g claude-config-composer

# Then use the short alias
claude-compose nextjs-15 shadcn
```

### Common Commands

```bash
# Interactive mode - choose configs visually
npx claude-config-composer

# List all available configurations
npx claude-config-composer list

# Generate full-stack configuration
npx claude-config-composer nextjs-15 shadcn tailwindcss drizzle vercel-ai-sdk

# AI development stack
npx claude-config-composer vercel-ai-sdk drizzle

# Preview without creating files
npx claude-config-composer dry-run nextjs-15 shadcn

# Validate existing configuration
npx claude-config-composer validate
```

### What Gets Generated

A complete `.claude/` directory in your project with:

- Combined agents from all selected configs
- Merged commands and hooks
- Unified settings.json
- Comprehensive CLAUDE.md documentation

## 🎯 Available Configurations

### Memory MCP Server Configuration

A production-grade configuration for building MCP servers with memory persistence and vector search:

- **15 Specialized Agents** for MCP, database, and memory systems
- **7 Custom Commands** for development workflows
- **2 Automation Hooks** for TypeScript and logging
- **Optimized for:** PostgreSQL 17, pgvector, Drizzle ORM, MCP SDK

[View Memory MCP Server Details →](./configurations/mcp-servers/memory-mcp-server/README.md)

## 🎯 Framework-Specific Configurations

### Next.js 15 Configuration

A complete Claude Code configuration tailored for Next.js 15 development, including:

#### Specialized Next.js Agents (11 total)

**Core Development:**

- **`nextjs-app-router`** - App Router routing patterns and best practices
- **`nextjs-server-components`** - Server/Client component optimization
- **`nextjs-server-actions`** - Forms, mutations, and progressive enhancement
- **`nextjs-data-fetching`** - Caching strategies and streaming
- **`nextjs-performance`** - Bundle analysis and Core Web Vitals

**Infrastructure & Quality:**

- **`nextjs-testing`** - Jest, Vitest, Playwright setup
- **`nextjs-deployment`** - Docker, Vercel, AWS deployment
- **`nextjs-migration`** - Pages Router to App Router migration
- **`nextjs-security`** - Authentication, CSP, OWASP compliance
- **`nextjs-debugging`** - React DevTools and troubleshooting
- **`nextjs-typescript`** - Type safety and error resolution

#### Next.js Commands (6 total)

```bash
/create-page [route]          # Generate page with loading/error boundaries
/create-server-action [name]  # Create type-safe Server Actions
/optimize-components          # Analyze component boundaries
/setup-testing [framework]    # Configure testing framework
/analyze-performance          # Generate performance report
/migrate-to-app-router        # Migrate from Pages Router
```

#### Key Features

- **React 19 & Async Request APIs** - Full support for Next.js 15 breaking changes
- **Server Components First** - Optimized for minimal client JavaScript
- **Intelligent Validation** - Pre-commit hooks for Next.js patterns
- **Best Practices Enforcement** - Automated checks for common mistakes
- **Complete Documentation** - CLAUDE.md with Next.js 15 patterns

## 🛠️ Featured Commands

### Memory MCP Server Commands

```bash
/setup quick       # Quick MCP project setup
/setup full        # Complete environment with dependencies
/setup database    # PostgreSQL & pgvector initialization
/mcp-debug        # Debug MCP protocol issues
/memory-ops       # Test memory CRUD operations
```

### Next.js 15 Commands

```bash
/create-page              # Generate page with boundaries
/create-server-action     # Create type-safe Server Actions
/optimize-components      # Analyze component boundaries
/analyze-performance      # Generate performance report
/migrate-to-app-router    # Migrate from Pages Router
```

## ⚡ Shared Features

### Automation Hooks

Both configurations include intelligent hooks:

- **TypeScript Development** - Auto type-check, format, lint
- **Command Logging** - Audit trail with timestamps
- **Smart Filtering** - Skip node_modules, build directories
- **Test Automation** - Run tests on file changes

### Security Best Practices

All configurations enforce:

- 🔒 **Whitelist approach** for commands
- 🚫 **Protected sensitive files** (.env, secrets)
- ✅ **Scoped write permissions** by file type
- 🛡️ **Safe git operations** (no force push)
- 🔐 **Input validation** with Zod schemas

## 💡 Use Cases & Examples

### 1. Memory MCP Server Development

Use the memory-mcp-server configuration for:

- Building MCP servers with persistent memory storage
- Implementing vector search with pgvector and OpenAI embeddings
- Creating multi-tenant AI companion systems
- Setting up production PostgreSQL with Neon
- Deploying with Docker and Kubernetes

### 2. Next.js 15 Application Development

Use the nextjs-15 configuration for:

- Setting up new Next.js 15 projects with best practices
- Migrating from Pages Router to App Router
- Implementing Server Components and Server Actions
- Optimizing performance and Core Web Vitals
- Setting up comprehensive testing
- Deploying to Vercel, Docker, or AWS

### Production Deployment Pipeline

Leverage deployment agents for:

- Docker containerization with security hardening
- Kubernetes orchestration with auto-scaling
- Prometheus/Grafana monitoring setup
- Structured logging and distributed tracing

### AI Companion Development

Build multi-tenant companion systems with:

- Isolated memory spaces per user
- Token-based authentication
- Rate limiting and quota management
- Conversation history with vector search

## 📊 What You Get

### Complete .claude Directory Structure

```text
.claude/
├── CLAUDE.md           # Combined best practices
├── .claude/
│   ├── settings.json   # Merged settings
│   ├── agents/         # Framework-specific agents
│   ├── commands/       # Custom commands
│   └── hooks/          # Automation scripts
├── README.md           # Setup instructions
└── package.json        # Dependencies
```

### Example: Full-Stack Next.js

Generating a `nextjs-15 shadcn tailwindcss drizzle vercel-ai-sdk` config gives you:

- **40+ specialized agents** across all frameworks
- **25+ custom commands** for complete workflows
- **Intelligent merging** without duplication
- **Production-ready patterns** for modern web apps
- **Type-safe development** from database to AI

### Key Configuration Patterns

#### Environment Variables (Placeholder Examples)

```json
"env": {
  "DATABASE_URL": "postgresql://user:pass@host/dbname?sslmode=require",
  "OPENAI_API_KEY": "sk-your-openai-api-key-here",
  "MCP_SERVER_PORT": "3000"
}
```

#### Hook Configuration

```json
"hooks": {
  "PostToolUse": [{
    "matcher": "Edit|MultiEdit|Write",
    "hooks": [{
      "type": "command",
      "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/typescript-dev.sh"
    }]
  }]
}
```

## 📊 Configuration Statistics

### Memory MCP Server Configuration

- **15 Specialized Agents** - ~15,000 lines of domain expertise
- **7 Custom Commands** - Full development lifecycle coverage
- **2 Automation Hooks** - TypeScript and logging automation
- **Focus Areas:** MCP protocol, vector search, memory systems, production deployment

### Next.js 15 Configuration

- **11 Next.js Agents** - Framework-specific expertise
- **6 Workflow Commands** - Next.js development automation
- **Intelligent Hooks** - Validation and formatting
- **Focus Areas:** App Router, Server Components, performance, testing

## 🔗 Technology Stack

This configuration is optimized for:

### General Development

- **TypeScript** & Node.js development
- **PostgreSQL 17** with **Neon** serverless
- **Drizzle ORM v0.44.4** for type-safe database access
- **pgvector v0.8.0** for vector similarity search
- **MCP SDK** for protocol implementation
- **Docker** & **Kubernetes** for deployment

### Framework Support

- **Next.js 15** with App Router
- **React 19** with Server Components
- **Tailwind CSS** for styling
- **Server Actions** for mutations
- **Turbopack** for faster builds

## 📈 Benefits of This Configuration

1. **🚀 10x Faster Development** - Specialized agents handle complex tasks
2. **🛡️ Enhanced Security** - Multi-layered permission controls
3. **🤖 Automated Workflows** - Hooks handle routine tasks
4. **📚 Built-in Expertise** - Deep domain knowledge in agents
5. **🔧 Production-Ready** - Deployment and monitoring included
6. **🧪 Quality Assurance** - Automated testing and review

## 🤝 Contributing

**We welcome open-source contributions!** This repository thrives on community input to support more frameworks and use cases.

### How to Contribute

1. **Add a New Framework Configuration:**
   - Create a new directory (e.g., `vercel-ai-sdk/`, `drizzle/`, `zod/`)
   - Include `.claude/` directory with agents, commands, hooks, and settings
   - Add a comprehensive `CLAUDE.md` with framework-specific best practices
   - Create a `README.md` documenting the configuration

2. **Improve Existing Configurations:**
   - Add specialized agents for new use cases
   - Create workflow commands for common tasks
   - Enhance automation hooks
   - Improve security patterns

3. **Help Build the CLI Tool:**
   - Contribute to the configuration generator logic
   - Add framework detection capabilities
   - Create configuration templates
   - Improve the interactive setup experience

### Testing the CLI Tool Locally

When developing the composer, test your changes:

```bash
# From claude-config-composer directory
npm run dev nextjs-15 shadcn              # Test with tsx (TypeScript)
npm run build && npm run test             # Build and run tests
node dist/cli.js nextjs-15 shadcn         # Test built version
```

### Available Configurations ✅

- **Next.js 15** ✅ - App Router, React 19, Server Components
- **shadcn/ui** ✅ - Radix UI components with Tailwind CSS
- **Tailwind CSS** ✅ - Utility classes, responsive design, dark mode
- **Vercel AI SDK** ✅ - Streaming, function calling, provider management
- **Drizzle ORM** ✅ - Schema management, migrations, type safety
- **Memory MCP Server** ✅ - Vector search and memory persistence
- **Token-Gated MCP** ✅ - Secure MCP server with authentication

### Coming Soon 🚧

- **Prisma** - Alternative ORM with different patterns
- **Zod** - Validation schemas and type generation
- **Vitest** - Fast testing framework configuration
- **Supabase** - Backend-as-a-Service setup
- **tRPC** - End-to-end type safety, API patterns
- **React 19** - Standalone React patterns and hooks

### Contribution Guidelines

- Follow the existing structure and patterns
- Include comprehensive documentation
- Test configurations thoroughly
- Add examples of real-world usage
- Ensure security best practices

## 📝 License

This configuration reference is provided as-is for educational purposes. Adapt and modify for your specific needs.

## ⚠️ Important Notes

1. **Reference Only** - This repository is for learning, not direct cloning
2. **Placeholder Values** - All credentials are examples only
3. **Customize for Your Needs** - Adapt patterns to your specific workflow
4. **Security First** - Always review and adjust permissions for your environment

## 🎓 Learning Path

1. **Start Simple** - Begin with `settings.json` permissions
2. **Add Commands** - Implement one custom command
3. **Integrate Agents** - Add relevant specialized agents
4. **Automate** - Set up hooks for your workflow
5. **Iterate** - Refine based on your experience

---

**Built with ❤️ for the Claude Code community**

*Transform your AI-assisted development with production-grade configurations*

🌟 **Star this repo** if you find it helpful!  
🐛 **Open an issue** for bugs or suggestions  
🚀 **Submit a PR** to add your framework configuration
