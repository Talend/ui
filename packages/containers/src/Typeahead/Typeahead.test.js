import { render, fireEvent } from '@testing-library/react';
import { Map } from 'immutable';
import keycode from 'keycode';
import Container, { DEFAULT_STATE } from './Typeahead.container';
import Connect from './Typeahead.connect';

const defaultProps = {
	id: 42,
	icon: {
		title: 'my title',
	},
	items: [],
	state: DEFAULT_STATE,
};

describe('Connect', () => {
	it('should connect Typeahead', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('Typeahead container', () => {
	it('should render', () => {
		const { container } = render(<Container {...defaultProps} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should setState when changing display mode', () => {
		let state;
		const props = {
			...defaultProps,
			state: Map({ docked: true }),
			setState: jest.fn(fn => {
				state = fn();
			}),
			onToggle: jest.fn(),
		};

		render(<Container {...props} />);
		fireEvent.click(document.querySelector('button'));
		expect(props.setState).toHaveBeenCalled();
		expect(state.docked).toEqual(false);
	});

	describe('Handlers', () => {
		describe('keyDown', () => {
			const KEYS = {
				DOWN: 'ArrowDown',
				UP: 'ArrowUp',
				ENTER: 'Enter',
				ESC: 'Escape',
			};

			const data = {
				highlightedItemIndex: 1,
				newHighlightedItemIndex: 2,
				highlightedSectionIndex: 3,
				newHighlightedSectionIndex: 4,
			};

			it('should call onKeyDow', () => {
				const event = { key: KEYS.DOWN, preventDefault: () => {} };
				const props = {
					...defaultProps,
					state: Map({ docked: true }),
					setState: jest.fn(),
					onKeyDown: jest.fn(),
					onBlur: jest.fn(),
				};

				const instance = new Container(props);
				instance.onKeyDown(event, data);
				expect(props.onKeyDown).toHaveBeenCalledWith(event, data);
			});

			it('should blur', () => {
				const event = { which: keycode.codes.esc, preventDefault: () => {} };
				const props = {
					...defaultProps,
					state: Map({ docked: true }),
					setState: jest.fn(),
					onKeyDown: jest.fn(),
					onBlur: jest.fn(),
				};
				const instance = new Container(props);
				instance.onKeyDown(event, data);

				expect(props.onBlur).toHaveBeenCalledWith(event);
			});

			it('should select', () => {
				const event = { which: keycode.codes.enter, preventDefault: () => {} };
				const props = {
					...defaultProps,
					state: Map({ docked: true }),
					setState: jest.fn(),
					onKeyDown: jest.fn(),
					onSelect: jest.fn(),
				};
				const instance = new Container(props);
				instance.onKeyDown(event, data);

				expect(props.onSelect).toHaveBeenCalledWith(event, {
					sectionIndex: 3,
					itemIndex: 1,
				});
			});
		});
	});
});
