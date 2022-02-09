function getAssetUrl({ name, version, path }) {
	const upgradedVersion = sessionStorage.getItem(name);
	let root = '';
	if (window.Talend.CDN_URL.startsWith('/')) {
		const baseTag = document.querySelector('base');
		if (baseTag) {
			root = baseTag.getAttribute('href');
		}
	}
	return `${root}${window.Talend.CDN_URL}/${name}/${upgradedVersion || version}${path}`;
}

function addScript({ src, integrity, ...attr }) {
	const script = document.createElement('script');
	script.setAttribute('src', src);
	script.setAttribute('type', 'text/javascript');
	if (integrity) {
		script.setAttribute('integrity', integrity);
		script.setAttribute('crossorigin', 'anonymous');
	}
	script.async = false;
	Object.assign(script, attr);
	document.body.appendChild(script);
}
function addStyle({ href, integrity, ...attr }) {
	const style = document.createElement('link');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('media', 'print');
	style.setAttribute('onload', 'this.media="all"');
	if (integrity) {
		style.setAttribute('integrity', integrity);
		style.setAttribute('crossorigin', 'anonymous');
	}
	style.setAttribute('href', href);
	Object.assign(style, attr);
	document.head.insertBefore(style, title);
}
if (window.Talend) {
	window.Talend.getAssetUrl = getAssetUrl;
	window.Talend.addScript = addScript;
}
