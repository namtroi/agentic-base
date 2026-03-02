# How to Use Agentic Base with Claude Code (CLI)

## What Is This?

Agentic Base is a lean, 14-file kit that supercharges Claude Code CLI. It provides:
- **Auto-detected project context** (git, framework, runtime)
- **Security gates** blocking sensitive files + bloated directories
- **4 specialized agents** (planner, tester, reviewer, debugger)
- **Three Pillars enforcement** (Document-Driven, Test-Driven, Observability-Driven)
- **Lifecycle hooks** tracking edit quality

---

## Quick Start (2 Steps)

### Step 1: Copy to your project

```bash
# From Agentic Base repo
cp -r .claude /path/to/your-project/
cp CLAUDE.md /path/to/your-project/
```

### Step 2: Run Claude Code

```bash
cd /path/to/your-project
claude
```

That's it. Claude Code auto-reads `CLAUDE.md` + `.claude/settings.json` on startup.

---

## File Map

```
your-project/
├── CLAUDE.md                         # Entry point — Claude reads this first
└── .claude/
    ├── settings.json                 # Hook wiring (auto-loaded by Claude Code)
    ├── .agenticignore                # Blocked directories (node_modules, dist, etc.)
    ├── hooks/
    │   ├── session-init.cjs          # Detects git, framework, runtime on startup
    │   ├── privacy-gate.cjs          # Blocks .env, credentials, keys
    │   ├── scout-gate.cjs            # Blocks node_modules, dist, .git access
    │   └── post-edit-reminder.cjs    # Warns about TDD/DDD violations after 8 edits
    ├── agents/
    │   ├── planner.md                # Planning agent — creates implementation plans
    │   ├── tester.md                 # TDD agent — Red→Green→Refactor
    │   ├── reviewer.md               # Code review agent — checks Three Pillars
    │   └── debugger.md               # Debug agent — investigate issues
    ├── rules/
    │   ├── orchestration.md          # Workflow: Plan→Test→Code→Test→Docs→Review
    │   └── three-pillars.md          # DDD/TDD/ODD enforcement rules
    └── skills/
        ├── plan/SKILL.md             # `/plan` — create implementation plans
        └── preview/SKILL.md          # `/preview` — generate Mermaid/ASCII diagrams
```

---

## How It Works

### On Session Start

`session-init.cjs` fires automatically, injects context:

```
## Session Context (auto-injected)
- Git Branch: main
- Git Remote: git@github.com:user/project.git
- Node: v20.10.0
- Framework: Next.js
- Package Manager: pnpm
- CWD: /home/user/project
```

Claude now knows your stack without you typing anything.

### When Claude Reads Files

Two gates fire on every file access:

1. **Scout Gate** — blocks bloated dirs (`node_modules`, `dist`, `.git`...). Prevents token overflow.
2. **Privacy Gate** — blocks sensitive files (`.env`, credentials, keys). Asks user for approval.

If privacy-blocked:
```
PRIVACY BLOCK: Sensitive file requires approval
  File: .env
  
Claude: Use AskUserQuestion tool, then:
  If "Yes": Use bash: cat ".env"
  If "No":  Continue without this file.
```

### When Claude Edits Files

`post-edit-reminder.cjs` tracks edits. After 8 code file modifications:
- ⚠️ TDD warning if no test files written
- ⚠️ DDD warning if no docs updated
- 📝 General quality reminder

---

## Workflow (How Claude Works With This Kit)

For any significant task, Claude follows a **6-step pipeline**:

```
1. Plan      → planner agent creates plan.md (with Docs/Test/Observability sections)
2. Test (R)  → tester agent writes failing tests FIRST
3. Code      → implement minimal code to pass tests
4. Test (G)  → run tests, all green
5. Docs      → update/create docs per plan
6. Review    → reviewer agent checks Three Pillars compliance
```

For trivial changes (<20 lines, single file), steps 1 and 6 are skipped. **Tests are never skipped.**

---

## Using Skills

### `/plan` — Create Implementation Plan

```
> /plan Add user authentication with OAuth2
```

Claude will research, analyze, and create a `plan.md` with:
- Phases + effort estimates
- `## Docs Impact` — what docs to update
- `## Test Strategy` — what tests to write
- `## Observability` — what logging to add

### `/preview` — Generate Diagrams

```
> /preview --diagram authentication flow
> /preview --explain how the payment system works
> /preview --ascii database schema
```

---

## Using Agents

Agents are specialized sub-agents Claude delegates to. You can also invoke them directly:

```
> Use the planner agent to design a caching layer
> Use the tester agent to write tests for the auth module
> Use the reviewer agent to review my recent changes
> Use the debugger agent to investigate the 500 error on /api/users
```

---

## Customization

### Add blocked directories

Edit `.claude/.agenticignore`:
```
# Add your own
.dart_tool
.gradle
.terraform
```

### Add project context to CLAUDE.md

Append project-specific info:

```markdown
## Project Context

- Stack: Next.js 14 + Supabase + Prisma
- DB Schema: `./docs/database-schema.md`
- API Docs: `./docs/api-reference.md`
- Deploy: Vercel (auto-deploy on push to `main`)
```

### Add custom skills

Create `.claude/skills/<skill-name>/SKILL.md`:

```markdown
---
name: my-skill
description: "What this skill does"
---

# My Skill

Instructions for Claude when this skill is activated.
```

### Add custom agents

Create `.claude/agents/<agent-name>.md`:

```markdown
---
name: my-agent
description: "When to use this agent"
tools: Glob, Grep, Read, Bash
---

Agent instructions here.
```

---

## Tips

1. **First time in a project?** Claude auto-detects your stack. Just start coding.
2. **Need a plan?** Say `/plan <task>`. Claude creates a structured plan before coding.
3. **Privacy block annoying?** It protects your secrets. Approve once per session.
4. **Want stricter TDD?** Add a git pre-commit hook that rejects commits without test files.
5. **Too many reminders?** Edit `THRESHOLD` in `post-edit-reminder.cjs` (default: 8).
6. **New framework not detected?** Add detection logic to `session-init.cjs` `detectFramework()`.

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `fatal: not a git repository` on startup | No git repo | Run `git init`. Harmless — hook continues. |
| Privacy gate blocks too much | Pattern too broad | Edit `SENSITIVE_PATTERNS` in `privacy-gate.cjs` |
| Scout gate blocks needed dir | Dir in `.agenticignore` | Add `!your-dir` negation in `.agenticignore` |
| Hooks don't fire | `settings.json` not loaded | Ensure `.claude/settings.json` exists at project root |
| Agent not found | Wrong file location | Agents go in `.claude/agents/`, must have YAML frontmatter |
