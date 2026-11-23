import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import allBundle from '@talend/icons/dist/svg-bundle/all.svg?url';
import extraSmallBundle from '@talend/icons/dist/svg-bundle/XS.svg?url';
import smallBundle from '@talend/icons/dist/svg-bundle/S.svg?url';
import mediumBundle from '@talend/icons/dist/svg-bundle/M.svg?url';
import largeBundle from '@talend/icons/dist/svg-bundle/L.svg?url';

import style from './IconsProvider.module.css';

const DEFAULT_BUNDLES = [allBundle, extraSmallBundle, smallBundle, mediumBundle, largeBundle];

const FETCHING_BUNDLES: { [url: string]: Promise<Response> } = {};

/**
 * Icon sources are tracked by reference and never matched by class or id in the document:
 * remote (user provided) content can carry any class or id, it must not be able to register
 * itself as an icon source.
 */
const PROVIDER_ELEMENTS = new Set<Element>();
const BUNDLE_CONTAINERS = new Set<Element>();

function getBundleContainers() {
	BUNDLE_CONTAINERS.forEach(container => {
		if (!container.isConnected) {
			BUNDLE_CONTAINERS.delete(container);
		}
	});
	return Array.from(BUNDLE_CONTAINERS);
}

/**
 * Containers created by IconsProvider that hold icons: rendered providers then loaded bundles
 */
function getIconContainers() {
	return [...Array.from(PROVIDER_ELEMENTS), ...getBundleContainers()];
}

function queryIconContainers(selector: string) {
	return getIconContainers().flatMap(container => Array.from(container.querySelectorAll(selector)));
}

function hasBundle(url: string) {
	if (Object.prototype.hasOwnProperty.call(FETCHING_BUNDLES, url)) {
		return true;
	}
	return getBundleContainers().some(container => container.getAttribute('data-url') === url);
}

/**
 * This function return the list of available icons in the document
 * @returns <Array<string>> Array of id if available icons
 */
function getCurrentIconIds() {
	return queryIconContainers('symbol')
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
	return queryIconContainers('filter')
		.map(symbol => symbol.getAttribute('id'))
		.filter(Boolean);
}

/**
 * clone the icon with the id and add it to the container
 * @param {string} id
 * @param {Element} container
 */
function injectIcon(id: string, container: Element) {
	// do not interpolate the id in a selector: it may not be a valid css identifier (ex: 1password)
	const element = queryIconContainers('[id]').find(
		candidate => candidate.getAttribute('id') === id,
	);
	if (element) {
		while (container.hasChildNodes()) {
			const lastChild = container.lastChild;
			if (lastChild) {
				container.removeChild(lastChild);
			}
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
				container.setAttribute('class', classNames('tc-iconsprovider', style.hidden));
				container.setAttribute('aria-hidden', 'true');
				container.setAttribute('focusable', 'false');
				container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
				container.setAttribute('data-url', url);
				container.innerHTML = content;
				document.body.appendChild(container);
				BUNDLE_CONTAINERS.add(container);
			}
			return response;
		});
	}
	return Promise.resolve(response);
}

type IconSet = Record<string, ReactElement>;

function isRootProvider(element: Element | null) {
	const providers = Array.from(PROVIDER_ELEMENTS);
	if (element && providers.length > 0) {
		return providers[0] === element;
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
export function IconsProvider({
	bundles = DEFAULT_BUNDLES,
	additionalBundles = [],
	defaultIcons = {},
	icons = {},
}: {
	bundles?: string[];
	additionalBundles?: string[];
	defaultIcons?: Record<string, ReactElement>;
	icons?: Record<string, ReactElement>;
}) {
	const iconset: IconSet = { ...defaultIcons, ...icons };
	const element = useRef<SVGSVGElement | null>(null);
	const ref = useCallback((node: SVGSVGElement | null) => {
		if (node) {
			element.current = node;
			PROVIDER_ELEMENTS.add(node);
		} else if (element.current) {
			PROVIDER_ELEMENTS.delete(element.current);
			element.current = null;
		}
	}, []);
	const [shouldRender, setShouldRender] = useState(true);

	useEffect(() => {
		if (!Array.isArray(bundles) || !Array.isArray(additionalBundles)) {
			return;
		}

		bundles
			.concat(additionalBundles)
			.filter(url => !hasBundle(url))
			.forEach(url => {
				FETCHING_BUNDLES[url] = fetch(url)
					.then(res => addBundle(res, url))
					.finally(() => {
						delete FETCHING_BUNDLES[url];
					});
			});
	}, [bundles, additionalBundles]);

	useEffect(() => {
		if (!isRootProvider(element.current)) {
			console.warn('IconsProvider Error: multiple instance escape');
			setShouldRender(false);
		}
	}, []);

	return (
		(shouldRender && (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				focusable="false"
				className={classNames('tc-iconsprovider', style.hidden)}
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
