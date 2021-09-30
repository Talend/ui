const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

function getModifiedPackage() {
	let output;
	try {
		output = execSync('git status -s --untracked-files=no');
		// we try to keep only lines with
		// M packages/cmf/package.json
		return output
			.toString()
			.split(os.EOL)
			.filter(l => l.endsWith('package.json'))
			// keep only the path
			.map(l => l.split(' ')[2])
			// filter
			.map(p => require(path.join(process.cwd(), p)))
			.filter(p => p.name && !p.private && !p.workspaces)
			.map(p => p.name);
	} catch (e) {
		console.error(e);
	}
	return [];
}

const pkgs = getModifiedPackage();
let content = pkgs.reduce((acc, pkg) => {
	return `${acc}${os.EOL}'${pkg}': patch`;
}, '');

fs.writeFileSync(
	`${process.cwd()}/.changeset/ci-dependencies.md`,
	`---
${content.trim()}
---

chore: upgrade dependencies and align @talend scoped packages to latest
`,
);
