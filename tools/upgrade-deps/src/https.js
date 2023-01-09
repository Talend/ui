import https from 'https';

export function get(url) {
	return new Promise((resolve, reject) => {
		https
			.get(url, response => {
				const result = {
					status: response.statusCode,
					data: '',
				};
				response.on('data', d => {
					result.data += d;
				});
				response.on('end', () => {
					resolve(result);
				});
			})
			.on('error', error => {
				console.error(error);
				reject(error);
			});
	});
}
