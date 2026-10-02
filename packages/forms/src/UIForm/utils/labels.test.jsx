import { getLabelProps } from './labels';

describe('getLabelProps', () => {
	it('should keep allowed props', () => {
		const props = getLabelProps('Title', {
			'data-testid': 'a',
			'aria-label': 'b',
			title: 'c',
			className: 'd',
		});
		expect(props).toEqual({
			children: 'Title',
			'data-testid': 'a',
			'aria-label': 'b',
			title: 'c',
			className: 'd',
		});
	});

	it('should drop unsupported props', () => {
		const props = getLabelProps('Title', {
			htmlFor: 'other',
			style: { position: 'fixed' },
			children: 'x',
			onClick: () => {},
		});
		expect(props).toEqual({ children: 'Title' });
	});

	it('should drop unsupported props when a hint is set', () => {
		const props = getLabelProps('Title', { htmlFor: 'other', style: {} }, { icon: 'i' });
		expect(props.htmlFor).toBeUndefined();
		expect(props.style).toBeUndefined();
		expect(props.required).toBe(false);
	});
});
