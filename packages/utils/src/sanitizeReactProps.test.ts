import { sanitizeReactProps } from './sanitizeReactProps';

describe('sanitizeReactProps', () => {
	it('preserves ordinary props, accessibility attributes and trusted callbacks', () => {
		const props = {
			id: 'item',
			'data-testid': 'menu.item',
			'aria-label': 'Item',
			onClick: vi.fn<() => void>(),
			disabled: false,
		};
		expect(sanitizeReactProps(props)).toEqual(props);
		expect(sanitizeReactProps(props)).not.toBe(props);
	});

	it.each([
		'__proto__',
		'constructor',
		'prototype',
		'dangerouslySetInnerHTML',
		'innerHTML',
		'outerHTML',
		'srcDoc',
		'componentClass',
		'as',
		'forwardedAs',
		'ref',
		'children',
		'srcdoc',
		'DANGEROUSLYSETINNERHTML',
	])('drops %s without evaluating its value', key => {
		const getter = vi.fn<() => never>(() => {
			throw new Error('Blocked value must not be read');
		});
		const props = Object.defineProperty({ id: 'item' }, key, {
			enumerable: true,
			get: getter,
		});
		expect(sanitizeReactProps(props)).toEqual({ id: 'item' });
		expect(getter).not.toHaveBeenCalled();
	});

	it('does not copy inherited props or pollute the output prototype', () => {
		const props = Object.assign(
			Object.create({ inherited: 'ignored' }),
			JSON.parse('{"__proto__":{"polluted":true},"id":"item"}'),
		);
		const result = sanitizeReactProps(props);
		expect(result).toEqual({ id: 'item' });
		expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
		expect(Object.hasOwn(result, '__proto__')).toBe(false);
	});

	it('supports component-specific exclusions without changing the input', () => {
		const props = Object.freeze({ style: { position: 'fixed' }, htmlFor: 'other', title: 'Item' });
		expect(sanitizeReactProps(props, ['style', 'htmlFor'])).toEqual({ title: 'Item' });
		expect(sanitizeReactProps(props, ['STYLE', 'HTMLFOR'])).toEqual({ title: 'Item' });
		expect(props.style).toEqual({ position: 'fixed' });
	});
});
