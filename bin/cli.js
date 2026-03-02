#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const commands = ['init'];

const helpText = `
Usage: npx agentic-base init

Description:
  Scaffolds the Agentic Base kit (.claude/ and CLAUDE.md) in your current directory.
  This provides a structured workflow (DDD, TDD, ODD) for Claude Code CLI.
`;

if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log(helpText);
  process.exit(0);
}

const command = args[0];

if (!commands.includes(command)) {
  console.error(`❌ Error: Unknown command "${command}".`);
  console.log(helpText);
  process.exit(1);
}

if (command === 'init') {
  console.log('Initializing Agentic Base...');

  const templateDir = path.join(__dirname, '..', 'template');
  const cwd = process.cwd();

  const claudeSrc = path.join(templateDir, '.claude');
  const claudeDest = path.join(cwd, '.claude');

  const markdownSrc = path.join(templateDir, 'CLAUDE.md');
  const markdownDest = path.join(cwd, 'CLAUDE.md');

  if (fs.existsSync(claudeDest) || fs.existsSync(markdownDest)) {
    console.error('\n❌ Warning: .claude/ directory or CLAUDE.md file already exists here.');
    console.error('To avoid overwriting your custom setup or data, this script will abort.');
    console.error('Please move or delete them manually if you want a fresh install.\n');
    process.exit(1);
  }

  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  try {
    copyRecursiveSync(claudeSrc, claudeDest);
    fs.copyFileSync(markdownSrc, markdownDest);

    console.log('\n✅ Successfully installed Agentic Base!');
    console.log('Just type `claude` to get started.\n');
  } catch (error) {
    console.error('❌ Failed to install:', error.message);
    process.exit(1);
  }
}
