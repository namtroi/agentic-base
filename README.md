# Agentic Base

A lean, robust AI coding kit built to supercharge the [Claude Code CLI](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview). 

Agentic Base provides:
- **Auto-detected project context** (git, framework, runtime)
- **Security gates** blocking sensitive files + bloated directories
- **4 specialized agents** (planner, tester, reviewer, debugger)
- **Three Pillars enforcement** (Document-Driven, Test-Driven, Observability-Driven)
- **Lifecycle hooks** tracking edit quality

## Setup

Navigate to your project folder and run:

```bash
npx agentic-base init
```

This will cleanly scaffold a `.claude/` directory and a `CLAUDE.md` standard instruction file into your project.

Once installed, just run `claude` and enjoy your highly-structured agentic workflow!

## Features

- **Privacy Gate**: Protects your `.env`, `.pem`, and keys.
- **Scout Gate**: Keeps Claude out of `node_modules`, `dist/`, etc., saving context window length.
- **Micro-Orchestration**: Direct routing via CLI for `/plan`, testing feedback loops, and architectural visualizations (`/preview`).

## Read More

See the [Detailed Guide](how-to-use-agentic-base.md) for customizing the kit or learning advanced usage.

## License
MIT
