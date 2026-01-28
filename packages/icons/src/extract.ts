import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const T_SHIRT_SIZES = ['XS', 'S', 'M', 'L'] as const;

type IconMap = Record<string, Buffer>;
type IconInfoMap = Record<string, { parent?: string }>;

function isTShirtSize(size: string) {
	return T_SHIRT_SIZES.includes(size as (typeof T_SHIRT_SIZES)[number]);
}

function getAbsolutePath(folder: string) {
	if (folder.startsWith(__dirname)) {
		return folder;
	}
	return path.join(__dirname, folder);
}

function getFiles(folder: string) {
	const dir = getAbsolutePath(folder);
	// Case-insensitive sort for consistent ordering across platforms
	return fs
		.readdirSync(dir)
		.sort((a: string, b: string) =>
			a.localeCompare(b, undefined, { sensitivity: 'base' } as Intl.CollatorOptions),
		);
}

function getIconId(file: string) {
	return file.split('.svg')[0];
}

function assertUnique(files: IconMap | IconInfoMap, acc: IconMap | IconInfoMap) {
	const hasDuplicate = Object.keys(files).some(file => acc[getIconId(file)]);
	if (hasDuplicate) {
		throw new Error('Icons already exists');
	}
}

export function extractFiles(folder: string): IconMap {
	const dir = getAbsolutePath(folder);
	return getFiles(folder).reduce<IconMap>((acc, file: string) => {
		const absolutePath = path.resolve(dir, file);
		if (fs.lstatSync(absolutePath).isDirectory()) {
			const files = extractFiles(absolutePath);
			assertUnique(files, acc);
			return Object.assign(acc, files);
		}
		const iconId = getIconId(file);
		const parentFolder = path.basename(path.dirname(absolutePath));
		const iconIdWithSize = `${isTShirtSize(parentFolder) ? `${iconId}:${parentFolder}` : iconId}`;
		if (acc[iconIdWithSize]) {
			throw new Error(`Icon ${iconIdWithSize} already included in the bundle`);
		}
		return Object.assign(acc, {
			[iconIdWithSize]: fs.readFileSync(path.resolve(dir, file)),
		});
	}, {});
}

export function extractInfo(folder: string, parent?: string): IconInfoMap {
	const dir = getAbsolutePath(folder);
	return getFiles(folder).reduce<IconInfoMap>((acc, file: string) => {
		const absolutePath = path.resolve(dir, file);
		if (fs.lstatSync(absolutePath).isDirectory()) {
			const infos = extractInfo(absolutePath, file);
			assertUnique(infos, acc);
			return Object.assign(acc, infos);
		}
		const iconId = getIconId(file);
		const parentFolder = path.basename(path.dirname(absolutePath));
		const iconIdWithSize = `${isTShirtSize(parentFolder) ? `${iconId}:${parentFolder}` : iconId}`;
		if (acc[iconIdWithSize]) {
			throw new Error(`Icon ${iconIdWithSize} already included in the bundle`);
		}
		return Object.assign(acc, { [iconIdWithSize]: { parent } });
	}, {});
}

export function getFolders(folder: string) {
	return fs
		.readdirSync(folder)
		.filter(file => fs.lstatSync(path.resolve(folder, file)).isDirectory());
}

export default extractFiles;
