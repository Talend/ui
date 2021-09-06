import React, { ReactElement, RefObject, useState, useEffect, useRef } from 'react';

const DEFAULT_BUNDLES = ['/all.svg'];
const FETCHING_BUNDLES: { [url: string]: Promise<Response> } = {};
const ICONS_PROVIDER_CLASS = '.tc-iconsprovider';

function hasBundle(url: string) {
	if (Object.prototype.hasOwnProperty.call(FETCHING_BUNDLES, url)) {
		return true;
	}

	const results = document.querySelectorAll(ICONS_PROVIDER_CLASS);
	return (
		Array.prototype.slice.call(results).filter(e => {
			return e.getAttribute('data-url') === url;
		}).length >= 1
	);
}

/**
 * This function return the list of available icons in the document
 * @returns <Array<string>> Array of id if available icons
 */
function getCurrentIconIds() {
	const symbols = document.querySelectorAll(`${ICONS_PROVIDER_CLASS} symbol`);
	return Array.from(symbols)
		.map(symbol => symbol.getAttribute('id'))
		.filter(Boolean);
}

/**
 * This function fetch all icon bundles and get the list of available icons in the document
 * @returns <Array<string>> Array of id if available icons
 */
function getAllIconIds() {
	return Promise.all(Object.values(FETCHING_BUNDLES)).then(getCurrentIconIds);
}

/**
 * This function return the list of available filter in the document
 * @returns {Array<string>} Array of id if available filters
 */
function getAllFilterIds() {
	const symbols = document.querySelectorAll(`${ICONS_PROVIDER_CLASS} filter`);
	return Array.from(symbols)
		.map(symbol => symbol.getAttribute('id'))
		.filter(Boolean);
}

/**
 * clone the icon with the id and add it to the container
 * @param {string} id
 * @param {Element} container
 */
function injectIcon(id: string, container: Element) {
	const element = document.querySelector(`${ICONS_PROVIDER_CLASS} #${id}`);
	if (element) {
		while (container.hasChildNodes()) {
			// @ts-ignores
			container.removeChild(container.lastChild);
		}
		container.appendChild(element.children[0].cloneNode(true));
	} else if (Object.keys(FETCHING_BUNDLES).length) {
		Promise.any(Object.values(FETCHING_BUNDLES)).then(() => injectIcon(id, container));
	}
}

/**
 * add the content of the response into the dom if it starts with SVG
 */
function addBundle(response: Response, url: string) {
	if (response.status === 200 && response.ok) {
		return response.text().then(content => {
			if (content.startsWith('<svg')) {
				const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				container.setAttribute('class', 'tc-iconsprovider sr-only');
				container.setAttribute('aria-hidden', 'true');
				container.setAttribute('focusable', 'false');
				container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
				container.setAttribute('data-url', url);
				container.innerHTML = content;
				document.body.appendChild(container);
			}
			return response;
		});
	}
	return Promise.resolve(response);
}

type IconSet = Record<string, ReactElement>;

function isRootProvider(ref: RefObject<any>) {
	const providers = document.querySelectorAll(ICONS_PROVIDER_CLASS);
	if (ref !== null && ref.current && providers.length > 0) {
		return providers[0] === ref.current;
	}
	return providers.length === 1;
}

/**
 * If you want to use Icon with SVG you have to load this
 * component in your app.
 * If you don't pass any props you will have our default
 * iconset (please look at talend-icons in that case)
 * @param {object} props react props
 * @example
<IconsProvider />
 */
export function IconsProvider({ bundles = DEFAULT_BUNDLES, defaultIcons = {}, icons = {} }) {
	const iconset: IconSet = { ...defaultIcons, ...icons };
	const ref = useRef<SVGSVGElement>(null);
	const [shouldRender, setShouldRender] = useState(true);

	useEffect(() => {
		if (!Array.isArray(bundles)) {
			return;
		}
		bundles
			.filter(url => !hasBundle(url))
			.forEach(url => {
				FETCHING_BUNDLES[url] = fetch(url)
					.then(res => addBundle(res, url))
					.finally(() => {
						delete FETCHING_BUNDLES[url];
					});
			});
	}, [bundles]);

	useEffect(() => {
		if (!isRootProvider(ref)) {
			console.warn('IconsProvider Error: multiple instance escape');
			setShouldRender(false);
		}
	}, [ref]);

	return (
		(shouldRender && (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				focusable="false"
				className="tc-iconsprovider sr-only"
				ref={ref}
			>
				{Object.keys(iconset).map((id, index) => (
					<symbol key={index} id={id}>
						{iconset[id]}
					</symbol>
				))}
			</svg>
		)) ||
		null
	);
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.getCurrentIconIds = getCurrentIconIds;
IconsProvider.getAllIconIds = getAllIconIds;
IconsProvider.getAllFilterIds = getAllFilterIds;
IconsProvider.injectIcon = injectIcon;
