export function importFromCDN({ name, version, path, varName, CDN }) {
	return new Promise((resolve, reject) => {
		if (!document.createElement) {
			reject(new Error('no document.createElement available'));
			return;
		}
		let safeCDN = CDN;
		if (!CDN) {
			safeCDN = window.CDN_URL || 'https://statics.cloud.talend.com';
		}
		if (document.querySelectorAll(`script[src~="/${name}/"]`).length === 0) {
			const script = document.createElement('script');
			script.setAttribute('src', `${safeCDN}/${name}/${version}${path}`);
			script.setAttribute('type', 'text/javascript');
			document.body.appendChild(script);
		}
		if (varName) {
			const intervalId = setInterval(() => {
				if (window[varName]) {
					clearInterval(intervalId);
					resolve(window[varName]);
				}
			}, 200);
		}
	});
}
