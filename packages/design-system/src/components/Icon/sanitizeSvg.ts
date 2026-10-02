const SVG_NS = 'http://www.w3.org/2000/svg';

const ALLOWED_ELEMENTS = new Set(
	[
		'svg',
		'g',
		'defs',
		'symbol',
		'use',
		'title',
		'desc',
		'path',
		'circle',
		'ellipse',
		'line',
		'polyline',
		'polygon',
		'rect',
		'lineargradient',
		'radialgradient',
		'stop',
		'clippath',
		'mask',
		'pattern',
		'filter',
		'fegaussianblur',
		'feoffset',
		'feblend',
		'fecolormatrix',
		'fecomposite',
		'feflood',
		'femerge',
		'femergenode',
		'text',
		'tspan',
	].map(name => name.toLowerCase()),
);

const URL_ATTRIBUTES = ['href', 'xlink:href'];

/**
 * Only allow http(s) and relative urls to be fetched / displayed for remote icons.
 */
export function isSafeRemoteUrl(url: string): boolean {
	try {
		const base = typeof window !== 'undefined' ? window.location.href : 'http://localhost/';
		const { protocol } = new URL(url, base);
		return protocol === 'http:' || protocol === 'https:';
	} catch {
		return false;
	}
}

function isSafeStyle(value: string) {
	return !/url\s*\(|expression\s*\(|javascript:|@import|behavior|-moz-binding/i.test(value);
}

function stripWhitespaceAndControls(value: string) {
	return Array.from(value)
		.filter(char => char.charCodeAt(0) > 32)
		.join('');
}

function sanitizeElement(element: Element) {
	Array.from(element.children).forEach(child => {
		if (!ALLOWED_ELEMENTS.has(child.localName.toLowerCase()) || child.namespaceURI !== SVG_NS) {
			child.remove();
			return;
		}
		sanitizeElement(child);
	});

	Array.from(element.attributes).forEach(attr => {
		const attrName = attr.name.toLowerCase();
		const value = attr.value;
		if (attrName.startsWith('on')) {
			element.removeAttribute(attr.name);
		} else if (URL_ATTRIBUTES.includes(attrName)) {
			// only references to local fragments are allowed
			if (!value.trim().startsWith('#')) {
				element.removeAttribute(attr.name);
			}
		} else if (attrName === 'style') {
			if (!isSafeStyle(value)) {
				element.removeAttribute(attr.name);
			}
		} else if (/javascript:|data:text\/html/i.test(stripWhitespaceAndControls(value))) {
			element.removeAttribute(attr.name);
		}
	});
}

/**
 * Parse a remote svg and keep only an allowlist of elements and attributes.
 * Returns the sanitized root <svg> element, or undefined when the content
 * is not a valid svg document.
 */
export function sanitizeSvg(content: string): Element | undefined {
	if (typeof DOMParser === 'undefined') {
		return undefined;
	}
	const doc = new DOMParser().parseFromString(content, 'image/svg+xml');
	const root = doc.documentElement;
	if (
		!root ||
		root.localName !== 'svg' ||
		root.namespaceURI !== SVG_NS ||
		doc.getElementsByTagName('parsererror').length
	) {
		return undefined;
	}
	sanitizeElement(root);
	return root;
}
