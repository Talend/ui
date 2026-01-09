#!/usr/bin/env node

/**
 * Run `node css.js` from this package root to compile every `*.module.scss` to a sibling `*.module.css` and rewrite imports accordingly.
 *
 * - Scans the package for `*.module.scss` files (ignoring node_modules, lib, lib-esm, .turbo, .git).
 * - Compiles each of them with `sass` into a `*.module.css` that sits in the same folder.
 * - Updates `.js`, `.jsx`, `.ts`, and `.tsx` files so `.module.scss` imports point to the new `.module.css` files.
 * - Deletes the original `*.module.scss` files after successful compilation.
 */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const { pathToFileURL } = require('url');

const PACKAGE_ROOT = path.resolve(__dirname);
const NODE_MODULES_PATH = path.join(PACKAGE_ROOT, 'node_modules');
const WORKSPACE_NODE_MODULES = path.resolve(PACKAGE_ROOT, '..', '..', 'node_modules');
const IGNORED_DIRECTORIES = new Set(['node_modules', 'lib', 'lib-esm', '.turbo', '.git']);

function assertPackageRoot() {
	const packageJson = path.join(PACKAGE_ROOT, 'package.json');
	if (!fs.existsSync(packageJson)) {
		throw new Error(
			`No package.json found in ${PACKAGE_ROOT}. Run this script from the package root.`,
		);
	}
}

function toRelative(filePath) {
	return path.relative(PACKAGE_ROOT, filePath) || '.';
}

function getPkgRoot(filename) {
	let current = path.dirname(filename);
	while (true) {
		if (fs.existsSync(path.join(current, 'package.json'))) {
			return `${current}/`;
		}
		const parent = path.dirname(current);
		if (parent === current) {
			throw new Error(`Unable to find package.json for ${filename}`);
		}
		current = parent;
	}
}

function getInfo(importPath) {
	const parts = importPath.split('/');
	const isScoped = importPath.startsWith('@');
	const packageName = isScoped ? `${parts[0]}/${parts[1]}` : parts[0];
	const rest = isScoped ? parts.slice(2) : parts.slice(1);
	const mainPath = require.resolve(packageName, { paths: [PACKAGE_ROOT] });
	return {
		base: getPkgRoot(mainPath),
		url: rest.join('/'),
	};
}

function createImporter() {
	// https://sass-lang.com/documentation/js-api/interfaces/Options
	return {
		// Allow tilde-prefixed imports the same way webpack does.
		findFileUrl(url) {
			if (!url.startsWith('~')) {
				return null; // fallback to default resolution via loadPaths
			}
			const info = getInfo(url.slice(1));
			return new URL(info.url, pathToFileURL(info.base));
		},
	};
}

function buildSassOptions(sourceFile) {
	const loadPaths = [path.dirname(sourceFile), PACKAGE_ROOT, NODE_MODULES_PATH];
	if (fs.existsSync(WORKSPACE_NODE_MODULES)) {
		loadPaths.push(WORKSPACE_NODE_MODULES);
	}
	return {
		loadPaths,
		sourceMap: false,
		importers: [createImporter()],
	};
}

function walk(startDir, matcher, acc = []) {
	const entries = fs.readdirSync(startDir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(startDir, entry.name);
		if (entry.isDirectory()) {
			if (IGNORED_DIRECTORIES.has(entry.name)) {
				continue;
			}
			walk(fullPath, matcher, acc);
			continue;
		}
		if (entry.isFile() && matcher(entry.name, fullPath)) {
			acc.push(fullPath);
		}
	}
	return acc;
}

function findModuleScssFiles() {
	return walk(PACKAGE_ROOT, name => name.endsWith('.module.scss'));
}

function findCodeFiles() {
	const extensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
	return walk(PACKAGE_ROOT, name => extensions.has(path.extname(name)));
}

function compileModuleScss(filePath) {
	try {
		const targetPath = filePath.replace(/\.module\.scss$/, '.module.css');
		const result = sass.compile(filePath, buildSassOptions(filePath));
		fs.mkdirSync(path.dirname(targetPath), { recursive: true });
		fs.writeFileSync(targetPath, result.css);
		console.log(`compiled ${toRelative(filePath)} -> ${toRelative(targetPath)}`);
		return { source: filePath, target: targetPath };
	} catch (e) {
		console.error(`failed to compile ${toRelative(filePath)}: ${e.message}`);
		return null;
	}
}

function updateModuleImports(filePath) {
	// Do not rewrite this script itself
	if (path.resolve(filePath) === path.resolve(__filename)) {
		return false;
	}
	const content = fs.readFileSync(filePath, 'utf8');
	if (!content.includes('.module.scss')) {
		return false;
	}
	const updated = content.replace(/\.module\.scss\b/g, '.module.css');
	if (updated === content) {
		return false;
	}
	fs.writeFileSync(filePath, updated);
	console.log(`rewrote imports in ${toRelative(filePath)}`);
	return true;
}

function main() {
	assertPackageRoot();
	const scssFiles = findModuleScssFiles();
	if (scssFiles.length === 0) {
		console.log('No *.module.scss files found.');
		return;
	}

	console.log(`Found ${scssFiles.length} *.module.scss file(s).`);
	const compiled = scssFiles.map(compileModuleScss).filter(Boolean);

	const codeFiles = findCodeFiles();
	let updatedImports = 0;
	codeFiles.forEach(filePath => {
		if (updateModuleImports(filePath)) {
			updatedImports += 1;
		}
	});

	// Delete SCSS sources that compiled successfully
	let deletedCount = 0;
	compiled.forEach(({ source, target }) => {
		try {
			if (fs.existsSync(target)) {
				fs.unlinkSync(source);
				deletedCount += 1;
				console.log(`deleted ${toRelative(source)}`);
			}
		} catch (e) {
			console.warn(`could not delete ${toRelative(source)}: ${e.message}`);
		}
	});

	console.log(
		`Done: generated ${compiled.length} CSS file(s), updated imports in ${updatedImports} file(s), deleted ${deletedCount} SCSS file(s).`,
	);
}

main();
