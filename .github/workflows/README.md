# How to run github action locally

Use the cli ACT: https://github.com/nektos/act

# How to run PR-TEST

```bash
act pull_request -j build -W .github/workflows/pr-test.yml
```

```bash
act --container-architecture linux/amd64 pull_request -j build -W .github/workflows/pr-test.yml
```
