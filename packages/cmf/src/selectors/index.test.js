import { describe, it, expect } from 'vitest';
import selectors from './index';
import * as collections from './collections';
import * as components from './components';
import toJS from './toJS';

describe('selectors index', () => {
	it('exposes collections selectors', () => {
		expect(selectors.collections).toEqual(collections);
	});

	it('exposes components selectors', () => {
		expect(selectors.components).toEqual(components);
	});

	it('exposes toJS selector', () => {
		expect(selectors.toJS).toEqual(toJS);
	});
});
