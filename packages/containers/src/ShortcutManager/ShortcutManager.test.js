import keycode from 'keycode';
import { Map } from 'immutable';
import { render } from '@testing-library/react';
import { mock } from '@talend/react-cmf';

import Container from './ShortcutManager.container';
import Connected from './ShortcutManager.connect';

describe('Shortcut container', () => {
	it('should render', () => {
		const { container } = render(<Container redirectMap={{}} />);
		expect(container).toBeEmptyDOMElement();
	});
});

describe('handles routes', () => {
	const state = mock.store.state();
	state.cmf.settings.props.shortcuts = {
		redirectMap: {
			esc: { '/test': '/test/next' },
		},
	};
	state.cmf.components = new Map();
	state.routing = {
		locationBeforeTransitions: {
			pathname: '/test',
		},
	};

	it('should handle global keypresses', () => {
		const spy = jest.spyOn(Container.prototype, 'handleKeyPress');

		render(<Container redirectMap={{}} />);

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(spy).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
	});

	it('should call redirect actionCreator', () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '/test': '/test/next' } };
		render(<Container redirectMap={redirectMap} dispatchActionCreator={fn} pathname="/test" />);

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(fn).toHaveBeenCalledWith('redirect', event, { action: { path: '/test/next' } });
	});

	it('should call matching actionCreator', () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '^[/]test[/].*$': 'test' } };

		render(
			<Container redirectMap={redirectMap} dispatchActionCreator={fn} pathname="/test/12345" />,
		);

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(fn).toHaveBeenCalledWith('test', event);
	});
});

describe('Connected ShortcutManager', () => {
	it('should connect ShortcutManager', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});
