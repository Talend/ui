import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const svgDir = path.join(rootDir, 'src', 'svg');
const tmpDir = path.join(rootDir, '.fantasticon-tmp');
const baseConfigPath = path.join(rootDir, '.fantasticonrc.json');
const tmpConfigPath = path.join(rootDir, '.fantasticonrc.tmp.json');

const T_SHIRT_SIZES = ['XS', 'S', 'M', 'L'];

function isTShirtSize(name) {
	return T_SHIRT_SIZES.includes(name);
}

function sortedEntries(dir) {
	return fs.readdirSync(dir).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

function collectIcons(dir) {
	const entries = sortedEntries(dir);
	const items = [];
	const seen = new Set();
	for (const entry of entries) {
		const abs = path.join(dir, entry);
		const stat = fs.statSync(abs);
		if (stat.isDirectory()) {
			for (const item of collectIcons(abs)) {
				if (seen.has(item.id)) {
					throw new Error(`Icon ${item.id} already included in the bundle`);
				}
				seen.add(item.id);
				items.push(item);
			}
			continue;
		}
		if (!entry.endsWith('.svg')) continue;
		const basename = path.basename(entry, '.svg');
		const parent = path.basename(path.dirname(abs));
		const id = isTShirtSize(parent) ? `${basename}:${parent}` : basename;
		if (seen.has(id)) {
			throw new Error(`Icon ${id} already included in the bundle`);
		}
		seen.add(id);
		items.push({ id, abs });
	}
	return items;
}

function ensureCleanDir(dir) {
	if (fs.existsSync(dir)) {
		fs.rmSync(dir, { recursive: true, force: true });
	}
	fs.mkdirSync(dir, { recursive: true });
}

function writeTmpSvgs(icons) {
	ensureCleanDir(tmpDir);
	for (const { id, abs } of icons) {
		const dest = path.join(tmpDir, `${id}.svg`);
		fs.copyFileSync(abs, dest);
	}
}

function buildCodepoints(icons) {
	const start = 0xf101;
	return icons.reduce((acc, icon, index) => {
		acc[icon.id] = start + index;
		return acc;
	}, {});
}

function writeTmpConfig(icons) {
	const baseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));
	const tmpConfig = {
		...baseConfig,
		inputDir: tmpDir,
		codepoints: buildCodepoints(icons),
	};
	fs.writeFileSync(tmpConfigPath, `${JSON.stringify(tmpConfig, null, 2)}\n`);
}

function cleanupTmp() {
	if (fs.existsSync(tmpConfigPath)) {
		fs.rmSync(tmpConfigPath);
	}
	if (fs.existsSync(tmpDir)) {
		fs.rmSync(tmpDir, { recursive: true, force: true });
	}
}

function runFantasticon() {
	execSync(`npx fantasticon --config ${path.basename(tmpConfigPath)}`, {
		cwd: rootDir,
		stdio: 'inherit',
	});
}

function postProcessCss() {
	execSync('node scripts/post-process-css.mjs', { cwd: rootDir, stdio: 'inherit' });
}

function main() {
	cleanupTmp();
	const icons = collectIcons(svgDir);
	writeTmpSvgs(icons);
	writeTmpConfig(icons);
	try {
		runFantasticon();
		postProcessCss();
	} finally {
		cleanupTmp();
	}
}

main();
