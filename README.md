<div align="center">
  <h1>🚀 @namtroi/agentic-base</h1>
  <p><strong>The definitive Agentic Workflow Kit for Anthropic Claude Code CLI.</strong></p>
  <p>Add guardrails, multi-agent routing, and intelligent context-awareness to your AI coding sessions in seconds.</p>

  [![npm version](https://badge.fury.io/js/@namtroi%2Fagentic-base.svg)](https://badge.fury.io/js/@namtroi%2Fagentic-base)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## The Problem: AI Coding Without Guardrails

Using the raw [Claude Code CLI](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) is powerful, but it often leads to:
- 💸 **Wasted Tokens:** Claude aggressively reads `node_modules`, `dist/`, or `.git/`, eating up your limits.
- 🔓 **Security Risks:** Accidental exposure of your `.env`, `.pem` keys, and credentials into AI context.
- 🍝 **Spaghetti Code:** AI outputting code without structure, tests, or documentation updates.

## The Solution: Agentic Base

**Agentic Base** is a highly-optimized, 14-file configuration kit that seamlessly injects specialized agents, security gates, and structured workflows straight into your terminal-based AI environment.

### 🌟 Core Features

- 🛡️ **Zero-Leak Privacy Gate:** Cryptographically blocks the CLI from reading or editing `.env`, keys, or credentials without your explicit, mid-session Y/N approval.
- 🧹 **Scout Gate (Token Saver):** Automatically ignores bloated directories, slashing token burn and keeping the AI context window laser-focused.
- 🧠 **Auto-Context Bootstrapper:** Instantly detects your current framework (Next.js, Vite, etc.), runtime, and Git branch to spoon-feed optimal context to Claude on startup.
- 🤖 **4 Specialized Sub-Agents:** Ready-to-use personas: `planner`, `tester`, `reviewer`, and `debugger`. Invoke them naturally: *"Use the tester agent to cover this component."*
- 🏛️ **The Three Pillars Enforcement:** Built-in lifecycle hooks ensure strict adherence to Document-Driven (DDD), Test-Driven (TDD), and Observability-Driven (ODD) development. Claude will literally remind you if tests aren't written!

---

## 🚀 Quick Start (Zero Config)

Run this once inside any project repository:

```bash
npx @namtroi/agentic-base init
```

*This cleanly scaffolds the `.claude/` directory and injects the `CLAUDE.md` golden prompt.*

Then, just start coding as usual:

```bash
claude
```

Claude will automatically ingest the new structured rules and optimized context.

---

## 🛠 Workflow Superpowers

With Agentic Base installed, you unlock micro-orchestration commands directly in Claude Code:

- **`/plan Add OAuth2 authentication`**
  Forces Claude to halt, research your stack, and output a structured `plan.md` (complete with test scope and docs impact) *before* writing any code.
- **`/preview --diagram payment architecture`**
  Instantly generates Mermaid or ASCII visual diagrams to explain complex systemic changes before you approve them.

---

## 📚 Documentation

Ready to customize hooks, write your own agents, or block specific directories?

👉 **[Read the Full Documentation Guide](docs/how-to-use-agentic-base.md)**

---

## 🤝 Open Source

Built with ❤️ for the AI developer community.

**License:** MIT
