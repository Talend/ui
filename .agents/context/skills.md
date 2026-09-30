# Installed skills

Managed with the [`skills`](https://skills.sh) CLI; pinned in `/skills-lock.json`. Skills are copied (not symlinked) into `.agents/skills/`.

| Skill                         | Source                     | Use for                                  |
| ----------------------------- | -------------------------- | ---------------------------------------- |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | React performance/patterns review        |
| `vite`                        | `antfu/skills`             | Vite config, plugins, build issues       |
| `playwright-cli`              | `microsoft/playwright-cli` | Browser automation / e2e with Playwright |

## Manage

```bash
npx skills add <owner/repo@skill> --agent universal --copy -y   # one source per call
npx skills update
npx skills list
```

Review a skill's content before committing it: skills run with full agent permissions.
Add new skills to the table above.
