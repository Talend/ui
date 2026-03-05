/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'raf/polyfill';
import { afterAll, expect, vi } from 'vitest';
import * as jestAxe from 'jest-axe';

expect.extend(jestAxe.toHaveNoViolations);

// ResizeObserver polyfill
class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}
if (!global.ResizeObserver) {
	global.ResizeObserver = ResizeObserver;
}

if (!global.TextEncoder) {
	const { TextEncoder, TextDecoder } = require('util');
	global.TextEncoder = TextEncoder;
	global.TextDecoder = TextDecoder;
}

if (!global.URL?.revokeObjectURL) {
	global.URL.revokeObjectURL = vi.fn();
}

// Provide a stable randomUUID so tests that rely on a fixed UUID value work
// (mirrors the jest setup which sets crypto.randomUUID = () => '42')
try {
	Object.defineProperty(global, 'crypto', {
		value: {
			...global.crypto,
			randomUUID: () => '42',
		},
		configurable: true,
		writable: true,
	});
} catch {
	// ignore if crypto is non-configurable
}

vi.mock('i18next', () => {
	function tMock(key: string, options?: { defaultValue?: string; [k: string]: unknown }) {
		if (typeof options === 'string') return options;
		if (options?.defaultValue) {
			const getOptionValue = (k: string) => (options[k] === undefined ? '' : String(options[k]));
			return (options.defaultValue || '').replace(/{{\s*(\w+)\s*}}/g, (_: string, k: string) =>
				getOptionValue(k),
			);
		}
		return String(key).split(':').reverse()[0];
	}

	return {
		default: {
			t: tMock,
			language: 'en',
			getFixedT: () => tMock,
			use() {
				return this;
			},
			addResources: () => {},
			init: () => {},
		},
	};
});

vi.mock('react-i18next', async () => {
	const React = await vi.importActual<typeof import('react')>('react');

	function tMock(key: string, options?: { defaultValue?: string; [k: string]: unknown }) {
		if (typeof options === 'string') return options;
		if (options?.defaultValue) {
			const getOptionValue = (k: string) => (options[k] === undefined ? '' : String(options[k]));
			return (options.defaultValue || '').replace(/{{\s*(\w+)\s*}}/g, (_: string, k: string) =>
				getOptionValue(k),
			);
		}
		return String(key).split(':').reverse()[0];
	}

	const hasChildren = (node: any): boolean =>
		node && (node.children || (node.props && node.props.children));
	const getChildren = (node: any): any =>
		node && node.children ? node.children : node.props && node.props.children;

	const renderNodes = (reactNodes: any): any => {
		if (typeof reactNodes === 'string') return reactNodes;
		return Object.keys(reactNodes).map((key, i) => {
			const child = reactNodes[key];
			const isElement = (React as any).isValidElement(child);
			if (typeof child === 'string') return child;
			if (hasChildren(child)) {
				const inner = renderNodes(getChildren(child));
				return (React as any).cloneElement(child, { ...child.props, key: i }, inner);
			}
			if (typeof child === 'object' && !isElement) {
				return Object.keys(child).reduce((str: string, k: string) => `${str}${child[k]}`, '');
			}
			return child;
		});
	};

	return {
		withTranslation:
			() =>
			(Component: any): any => {
				Component.defaultProps = { ...Component.defaultProps, t: tMock };
				Component.displayName = `withI18nextTranslation(${Component.displayName || Component.name})`;
				return Component;
			},
		useTranslation: () => ({ t: tMock }),
		setI18n: () => {},
		getI18n: () => ({
			t: tMock,
			language: 'en',
			getFixedT: () => tMock,
		}),
		Trans: ({ children }: { children: any }) =>
			Array.isArray(children) ? renderNodes(children) : renderNodes([children]),
	};
});

// @floating-ui/react async tasks cleanup
// https://github.com/floating-ui/floating-ui/issues/1908
afterAll(() => new Promise<void>(resolve => setTimeout(resolve, 0)));

// Mock @talend/assets-api to avoid "Version not found" errors
// (the babel-plugin-assets-api normally injects versions at build time)
vi.mock('@talend/assets-api', () => {
	const getURL = (path: string, name?: string) => `https://cdn.talend.com/${name || ''}${path}`;
	return {
		default: {
			getURL,
			addScript: vi.fn(),
			addStyle: vi.fn(),
		},
	};
});
