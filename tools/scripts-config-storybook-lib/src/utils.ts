/**
 * Fix Windows path separators for Storybook
 * Temporary fix until Storybook handles Windows paths properly
 *
 * @param path - Path to fix
 * @returns Fixed path with forward slashes on Windows
 */
export function fixWindowsPath(path: string): string {
	return process.platform === 'win32' ? path.replace(/\\/g, '/') : path;
}

/**
 * Fix Windows path separators for multiple paths
 *
 * @param paths - Array of paths to fix
 * @returns Array of fixed paths
 */
export function fixWindowsPaths(paths: string[]): string[] {
	return paths.map(fixWindowsPath);
}
