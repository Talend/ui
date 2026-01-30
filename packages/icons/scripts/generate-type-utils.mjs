#!/usr/bin/env node
// Generate src/typeUtils.ts from src/svg and src/icon/* contents

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const svgDir = path.join(srcDir, 'svg');
const iconDir = path.join(srcDir, 'icon');
const outFile = path.join(srcDir, 'typeUtils.ts');

function listSvgsRecursive(dir) {
	const results = [];
	if (!fs.existsSync(dir)) return results;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...listSvgsRecursive(p));
		} else if (entry.isFile() && entry.name.endsWith('.svg')) {
			results.push(p);
		}
	}
	return results;
}

function uniqueSorted(arr) {
	return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

function collectIconNameUnion() {
	const files = listSvgsRecursive(svgDir);
	const names = files.map(f => path.basename(f, '.svg'));
	const prefixed = names.map(n => `  | 'talend-${n}'`);
	return uniqueSorted(prefixed);
}

function collectSizedIcons() {
	const sizes = ['L', 'M', 'S', 'XS'];
	const result = {};
	for (const size of sizes) {
		const sizeDir = path.join(iconDir, size);
		const entries = fs.existsSync(sizeDir) ? fs.readdirSync(sizeDir) : [];
		const names = entries
			.filter(n => n.endsWith('.svg'))
			.map(n => n.replace(/\.svg$/, ''))
			.filter(n => !n.includes(' '));
		result[size] = uniqueSorted(names);
	}
	return result;
}

function renderFile(iconNameUnion, sizedIcons) {
	const sizesArray = Object.keys(sizedIcons);
	const iconsObject = sizesArray
		.map(size => `  ${size}: [\n${sizedIcons[size].map(n => `    '${n}',`).join('\n')}\n  ],`)
		.join('\n');

	return `export declare type IconName =\n${iconNameUnion.join('\n')}\n  | string;\n\nexport declare type LegacyIcon = { name: IconName };\n\nexport const sizes = ${JSON.stringify(sizesArray)} as const;\n\nexport const icons = {\n${iconsObject}\n} as const;\n\nexport declare type IconSize = ${sizesArray.map(s => `'${s}'`).join(' | ')};\n\nexport declare type IconNameWithSize<S extends IconSize> =\n  (typeof icons)[S][number];\n\nexport declare type Icon<S extends IconSize> = {\n  size: S;\n  name: IconNameWithSize<S>;\n};\n`;
}

async function main() {
	console.log('🧩 Generating typeUtils.ts ...');
	const iconNameUnion = collectIconNameUnion();
	const sizedIcons = collectSizedIcons();
	const content = renderFile(iconNameUnion, sizedIcons);
	fs.writeFileSync(outFile, content);
	console.log(`✓ Wrote ${path.relative(root, outFile)}`);
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
