const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function getModifiedPackage() {
	let output;
	try {
		output = execSync('git st -s --untracked-files=no');
		// we try to keep only lines with
		// M packages/cmf/package.json
		return (
			output
				.toString()
				.split(os.EOL)
				.filter(l => l.endsWith('package.json'))
				// keep only the path
				.map(l => l.split(' ')[2])
				// read the package.json to get the package name
				.map(p => require(path.join(process.cwd(), p)).name)
				.filter(Boolean)
		);
	} catch (e) {
		console.error(e);
	}
}

const pkgs = getModifiedPackage();
let content = pkgs.reduce((acc, pkg) => {
	return `${acc}${os.EOL}'${pkg}': patch`;
}, '');

fs.writeFileSync(
	`${process.cwd()}/.changeset/ci-dependencies.md`,
	`---
${content}
---

chore: upgrade dependencies and align @talend scoped packages to latest`,
);
