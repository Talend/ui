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

// Attributes are matched on their lowercased local name; xml namespaced attributes are handled
// separately in isAllowedAttribute.
const ALLOWED_ATTRIBUTES = new Set(
	[
		// structure / geometry
		'id',
		'class',
		'viewBox',
		'width',
		'height',
		'x',
		'y',
		'x1',
		'y1',
		'x2',
		'y2',
		'cx',
		'cy',
		'r',
		'rx',
		'ry',
		'fx',
		'fy',
		'd',
		'points',
		'transform',
		'preserveAspectRatio',
		'focusable',
		'role',
		'aria-hidden',
		'aria-label',
		'aria-labelledby',
		'aria-describedby',
		'version',
		'overflow',
		'display',
		'visibility',
		// references (validated as local fragments)
		'href',
		// presentation
		'fill',
		'fill-opacity',
		'fill-rule',
		'stroke',
		'stroke-width',
		'stroke-linecap',
		'stroke-linejoin',
		'stroke-miterlimit',
		'stroke-dasharray',
		'stroke-dashoffset',
		'stroke-opacity',
		'opacity',
		'color',
		'clip-path',
		'clip-rule',
		'clipPathUnits',
		'mask',
		'maskUnits',
		'maskContentUnits',
		'filter',
		'filterUnits',
		'primitiveUnits',
		'color-interpolation-filters',
		'stop-color',
		'stop-opacity',
		'offset',
		'gradientUnits',
		'gradientTransform',
		'spreadMethod',
		'patternUnits',
		'patternContentUnits',
		'patternTransform',
		'font-family',
		'font-size',
		'font-weight',
		'font-style',
		'text-anchor',
		'dominant-baseline',
		'letter-spacing',
		'dx',
		'dy',
		// filter primitives
		'in',
		'in2',
		'result',
		'type',
		'values',
		'mode',
		'operator',
		'k1',
		'k2',
		'k3',
		'k4',
		'stdDeviation',
		'flood-color',
		'flood-opacity',
		'exponent',
	].map(name => name.toLowerCase()),
);

const XLINK_NS = 'http://www.w3.org/1999/xlink';

function isAllowedAttribute(attr: Attr) {
	const localName = attr.localName.toLowerCase();
	if (!attr.namespaceURI) {
		return ALLOWED_ATTRIBUTES.has(localName);
	}
	// only xlink:href is allowed among namespaced attributes, whatever the prefix is bound to
	return attr.namespaceURI === XLINK_NS && localName === 'href';
}

const LOCAL_URL_REFERENCE = /url\(\s*(['"]?)#[^'")\s]*\1\s*\)/gi;

/**
 * Values may only reference local fragments, either as a whole (href) or through url(#id).
 */
function isSafeAttributeValue(localName: string, value: string) {
	if (localName === 'href') {
		return value.trim().startsWith('#');
	}
	if (/url\s*\(|\\/i.test(value.replace(LOCAL_URL_REFERENCE, ''))) {
		return false;
	}
	return !/javascript:|data:|expression\s*\(|@import|behavior|-moz-binding/i.test(
		stripWhitespaceAndControls(value),
	);
}

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
		if (
			!isAllowedAttribute(attr) ||
			!isSafeAttributeValue(attr.localName.toLowerCase(), attr.value)
		) {
			element.removeAttributeNode(attr);
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
