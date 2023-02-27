# @talend/scripts-yarn-workspace

This package expose a command line useful for mono repository management.

To use it as usual with scripts packages: `npx talend-yarn-workspace {command} {arguments}`

| command             | arguments      | description                                                                             |
| ------------------- | -------------- | --------------------------------------------------------------------------------------- |
| `run`               | scriptName     | run package.json script accross all packages inside your mono repository                |
| `lint-merge-report` | main pr-branch | merge all eslint-report.json and stylelint-report.json and filter on only changed files |
