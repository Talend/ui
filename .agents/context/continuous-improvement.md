# Continuous improvement directive

`/AGENTS.md` is the single source of truth for agent instructions in this repo. Keep it correct, short and in sync with the code.

## When to update AGENTS.md

Update it in the same change (same PR) whenever you:

- change tooling: package manager, build (turbo/talend-scripts), test runner, linter, formatter, Node version
- add/rename/remove a root script or a shared config package under `tools/`
- introduce or change a convention (styling, `data-testid`, i18n keys, dependency rules, folder structure, test patterns)
- add an ADR in `docs/` (add it to the ADR table)
- discover the file is wrong or stale — e.g. a documented command fails, a path no longer exists

Also update it when the user corrects you about a repo convention that is not yet documented and is likely to matter again.

## How to update

1. Verify against the source of truth first (`package.json`, `turbo.json`, `tools/*`, `docs/adr-*.md`, a real component/test). Never document from memory.
2. Edit the smallest section that covers it. Prefer replacing stale text over appending.
3. Keep it factual and terse: commands, paths, rules. No tutorials, no duplication of what ADRs or READMEs already say — link them.
4. Do not put task-specific workflows in AGENTS.md; put them in a skill under `.agents/skills/<name>/SKILL.md`.
5. Do not paste secrets, tokens or personal paths.

## Sync check (before finishing a task)

- Every command in AGENTS.md still exists (`grep` the script in root/package `package.json`).
- Every path referenced still exists.
- Versions/config values quoted (e.g. Prettier width, tsconfig options) match their config files.
- If you changed a convention above, the matching AGENTS.md section is updated.

## Skills

If a repeated workflow emerges (3+ times), propose a new skill in `.agents/skills/` and record it in `.agents/context/skills.md`.
