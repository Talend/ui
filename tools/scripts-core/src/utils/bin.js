/**
 * Resolve the module script path.
 * @param modName The bin module name
 * @returns {*} The executable path
 */
export function resolveScript(modName) {
	const filePath = import.meta.resolve(modName);
	const parsedUrl = new URL(filePath);
	let fileURL = parsedUrl.pathname;

	// For windows, remove the first char who is a slash
	if (process.platform === 'win32') {
		fileURL = fileURL.substring(1);
	}
	return fileURL;
}
