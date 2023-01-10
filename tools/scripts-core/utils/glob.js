import glob from 'glob';

export async function globMatch(pattern) {
	return new Promise((resolve, reject) => {
		glob(pattern, (error, files) => {
			if (error) {
				reject(error);
			}
			resolve(files.length > 0);
		});
	});
}
