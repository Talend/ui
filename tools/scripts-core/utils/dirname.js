import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getDirName(url) {
	const filename = fileURLToPath(url);
	return dirname(filename);
}
