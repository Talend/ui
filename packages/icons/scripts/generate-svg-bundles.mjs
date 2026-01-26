#!/usr/bin/env node
/**
 * Generate SVG bundles, metadata, and icon information
 * This modernized ESM script replaces the old Babel-dependent react.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const svgBundleDir = path.join(distDir, 'svg-bundle');

// Ensure directories exist
function ensureDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

// Dynamic import of CommonJS modules
async function loadCommonJSModule(modulePath) {
	try {
		const module = await import(modulePath);
		return module.default || module;
	} catch (error) {
		console.error(`Failed to load ${modulePath}:`, error.message);
		return null;
	}
}

// Read SVGs from a directory
function extractSVGsFromDir(dirPath) {
	const svgs = {};
	try {
		const files = fs.readdirSync(dirPath, { withFileTypes: true });
		for (const file of files) {
			if (file.isFile() && file.name.endsWith('.svg')) {
				const iconName = file.name.replace('.svg', '');
				const content = fs.readFileSync(path.join(dirPath, file.name), 'utf-8');
				// Extract just the SVG content (remove outer svg tag if present)
				const match = content.match(/<svg[^>]*>(.*)<\/svg>/s);
				svgs[iconName] = match ? match[1] : content;
			}
		}
	} catch (error) {
		console.warn(`Directory not found or error reading: ${dirPath}`);
	}
	return svgs;
}

// Create SVG sprite file from icons
function createSVGSprite(icons, filename) {
	const symbols = Object.entries(icons)
		.map(([name, content]) => `<symbol id="${name}">${content}</symbol>`)
		.join('\n');

	const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" focusable="false" class="sr-only">
${symbols}
</svg>`;

	fs.writeFileSync(path.join(svgBundleDir, filename), svgContent);
	console.log(`✓ Created ${filename}`);
}

// Generate metadata info.js
function generateInfoJs(svgBundles, iconBundles) {
	const infoMap = {};
	const infoFromFigmaMap = {};

	// Map SVG bundles
	for (const [bundle, icons] of Object.entries(svgBundles)) {
		for (const iconName of Object.keys(icons)) {
			infoMap[`talend-${iconName}`] = bundle;
		}
	}

	// Map icon bundles (from Figma)
	for (const [bundle, icons] of Object.entries(iconBundles)) {
		for (const iconName of Object.keys(icons)) {
			infoFromFigmaMap[iconName] = bundle;
		}
	}

	const jsCode = `export const info = {
${Object.entries(infoMap)
	.map(([name, bundle]) => `  "${name}": "${bundle}",`)
	.join('\n')}
};

export const infoFromFigma = {
${Object.entries(infoFromFigmaMap)
	.map(([name, bundle]) => `  "${name}": "${bundle}",`)
	.join('\n')}
};

export function getIconHref(name) {
  return info[name] ? \`/\${info[name]}.svg#\${name}\` : \`#\${name}\`;
}

export function getIconHrefFromFigma(name) {
  return infoFromFigma[name] ? \`/\${infoFromFigma[name]}.svg#\${name}\` : \`#\${name}\`;
}
`;

	fs.writeFileSync(path.join(distDir, 'info.js'), jsCode);
	console.log(
		`✓ Generated info.js with ${Object.keys(infoMap).length} SVG icons and ${Object.keys(infoFromFigmaMap).length} Figma icons`,
	);
}

// Copy CSS file
function copyCSSFile() {
	const srcCss = path.join(__dirname, '../src/talendicons.css');
	const distCss = path.join(distDir, 'talendicons.css');

	if (fs.existsSync(srcCss)) {
		fs.copyFileSync(srcCss, distCss);
		console.log(`✓ Copied talendicons.css`);
	} else {
		console.warn(`CSS file not found: ${srcCss}`);
	}
}

// Main function
async function generateSVGBundles() {
	console.log('🎨 Generating SVG bundles...\n');

	ensureDir(svgBundleDir);

	const svgDir = path.join(__dirname, '../src/svg');
	const iconDir = path.join(__dirname, '../src/icon');
	const filterDir = path.join(__dirname, '../src/filters');

	// Create bundles from svg/ directory (organized by subdirectories)
	const svgBundles = {};
	if (fs.existsSync(svgDir)) {
		const categories = fs.readdirSync(svgDir, { withFileTypes: true });
		for (const cat of categories) {
			if (cat.isDirectory()) {
				const icons = extractSVGsFromDir(path.join(svgDir, cat.name));
				if (Object.keys(icons).length > 0) {
					svgBundles[cat.name] = icons;
					createSVGSprite(
						Object.fromEntries(
							Object.entries(icons).map(([name, content]) => [`talend-${name}`, content]),
						),
						`${cat.name}.svg`,
					);
				}
			}
		}
	}

	// Create bundles from icon/ directory (organized by subdirectories)
	const iconBundles = {};
	if (fs.existsSync(iconDir)) {
		const categories = fs.readdirSync(iconDir, { withFileTypes: true });
		for (const cat of categories) {
			if (cat.isDirectory()) {
				const icons = extractSVGsFromDir(path.join(iconDir, cat.name));
				if (Object.keys(icons).length > 0) {
					iconBundles[cat.name] = icons;
					createSVGSprite(icons, `${cat.name}.svg`);
				}
			}
		}
	}

	// Create filters bundle
	const filters = extractSVGsFromDir(filterDir);
	if (Object.keys(filters).length > 0) {
		createSVGSprite(filters, 'filters.svg');
	}

	// Create all-in-one bundle
	const allIcons = {};
	for (const bundle of Object.values(svgBundles)) {
		Object.assign(allIcons, bundle);
	}
	for (const bundle of Object.values(iconBundles)) {
		Object.assign(allIcons, bundle);
	}
	Object.assign(allIcons, filters);

	if (Object.keys(allIcons).length > 0) {
		createSVGSprite(allIcons, 'all.svg');
	}

	// Generate metadata
	generateInfoJs(svgBundles, iconBundles);

	// Copy CSS
	copyCSSFile();

	console.log('\n✨ SVG bundles generated successfully!');
}

// Run the script
generateSVGBundles().catch(error => {
	console.error('Error generating SVG bundles:', error);
	process.exit(1);
});
