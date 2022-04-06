(function () {
	const jsFiles = window.jsFiles || [];
	const cssFiles = window.cssFiles || [];

	function talendAddScripts(jsMetas, prepareUrl) {
		jsMetas.forEach(function onUrl(jsMeta) {
			const metaIsUrl = typeof jsMeta === 'string';
			let finalUrl = metaIsUrl ? jsMeta : jsMeta.path;
			const integrity = metaIsUrl ? undefined : jsMeta.integrity;
			if (prepareUrl) {
				finalUrl = prepareUrl(finalUrl);
			}
			const script = document.createElement('script');
			script.setAttribute('src', finalUrl);
			script.setAttribute('type', 'text/javascript');
			if (integrity) {
				script.setAttribute('integrity', integrity);
				script.setAttribute('crossorigin', 'anonymous');
			}
			script.async = false;
			document.body.appendChild(script);
		});
	}

	function talendAddStyles(cssMetas, prepareUrl) {
		const title = document.getElementsByTagName('TITLE')[0];
		cssMetas.forEach(function onUrl(cssMeta) {
			const metaIsUrl = typeof cssMeta === 'string';
			let finalUrl = metaIsUrl ? cssMeta : cssMeta.path;
			const integrity = metaIsUrl ? undefined : cssMeta.integrity;
			if (prepareUrl) {
				finalUrl = prepareUrl(finalUrl);
			}
			const style = document.createElement('link');
			style.setAttribute('rel', 'stylesheet');
			style.setAttribute('media', 'print');
			style.setAttribute('onload', 'this.media="all"');
			if (integrity) {
				style.setAttribute('integrity', integrity);
				style.setAttribute('crossorigin', 'anonymous');
			}
			style.setAttribute('href', finalUrl);
			document.head.insertBefore(style, title);
		});
	}

	window.talendAddStyles = talendAddStyles;
	window.talendAddScripts = talendAddScripts;

	document.addEventListener('DOMContentLoaded', function onDocumentReady() {
		if (!window.TALEND_INITIATOR_URL.startsWith('@@')) {
			talendAddScripts([window.TALEND_INITIATOR_URL]);
		} else {
			// on prem
			// if a base tag is present, it defines the base path where the app is hosted
			// in this case, we make the url relative to ensure the right path resolution
			const base = document.querySelector('base');
			const prepareUrl = url => (base ? url.slice(1) : url);

			talendAddStyles(cssFiles, prepareUrl);
			talendAddScripts(jsFiles, prepareUrl);
		}
	});
})();
