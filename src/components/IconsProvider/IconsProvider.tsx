import React, { ReactElement } from 'react';

type GenericObject = { [key: string]: Promise<Response> };

const DEFAULT_BUNDLES = ['/all.svg'];
const FETCHING_BUNDLES: GenericObject = {};

function hasBundle(url: string) {
	if (FETCHING_BUNDLES[url]) {
		return true;
	}

	const results = document.querySelectorAll('.tc-iconsprovider');
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
	const symbols = document.querySelectorAll('.tc-iconsprovider symbol');
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
	const symbols = document.querySelectorAll('.tc-iconsprovider filter');
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
	const element = document.querySelector(`.tc-iconsprovider #${id}`);
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
 * add the content of the reponse into the dom if it starts with SVG
 */
function addBundle(response: Response) {
	if (response.status === 200 && response.ok) {
		return response.text().then(content => {
			if (content.startsWith('<svg')) {
				const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				container.setAttribute('class', 'tc-iconsprovider');
				container.setAttribute('style', 'display: none');
				container.setAttribute('aria-hidden', 'true');
				container.setAttribute('focusable', 'false');
				container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
				container.setAttribute('data-url', response.url);
				container.innerHTML = content;
				document.body.appendChild(container);
			}
			return response;
		});
	}
	return Promise.resolve(response);
}

type IconSet = Record<string, ReactElement>;

function isRootProvider(ref: React.RefObject<any>) {
	const providers = document.querySelectorAll('.tc-iconsprovider');
	if (ref !== null && ref.current && providers.length > 0) {
		return providers[0] === ref.current;
	}
	return providers.length === 0;
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
	const ref = React.createRef<SVGSVGElement>();
	React.useEffect(() => {
		if (!Array.isArray(bundles)) {
			return;
		}
		bundles
			.filter(url => !hasBundle(url))
			.forEach(url => {
				FETCHING_BUNDLES[url] = fetch(url)
					.then(addBundle)
					.finally(() => {
						delete FETCHING_BUNDLES[url];
					});
			});
	}, [bundles]);

	if (isRootProvider(ref)) {
		console.warn('IconsProvider Error: multiple instance escape, return null');
		return null;
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			focusable="false"
			className="tc-iconsprovider"
			style={{ display: 'none' }}
			ref={ref}
		>
			{Object.keys(iconset).map((id, index) => (
				<symbol key={index} id={id}>
					{iconset[id]}
				</symbol>
			))}
		</svg>
	);
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.getCurrentIconIds = getCurrentIconIds;
IconsProvider.getAllIconIds = getAllIconIds;
IconsProvider.getAllFilterIds = getAllFilterIds;
IconsProvider.injectIcon = injectIcon;
