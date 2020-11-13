import React from 'react';
import keycode from 'keycode';
import { Map } from 'immutable';
import { shallow, mount } from 'enzyme';
import { mock } from '@talend/react-cmf';

import Container from './ShortcutManager.container';
import Connected from './ShortcutManager.connect';

describe('Shortcut container', () => {
	let wrapper;
	const context = { router: { getCurrentLocation: () => ({ pathname: '/test' }) } };
	afterEach(() => {
		wrapper.unmount();
	});

	it('should render', () => {
		wrapper = shallow(<Container redirectMap={{}} />, { context });
		expect(wrapper.getElement()).toBeNull();
	});
});

describe('handles routes', () => {
	const state = mock.store.state();
	state.cmf.settings.props.shortcuts = {
		redirectMap: {},
	};
	state.cmf.components = new Map();
	state.routing = {
		locationBeforeTransitions: {
			pathname: '/test',
		},
	};

	it('should get the redirectMap', () => {
		const { Provider } = mock;
		const wrapper = mount(
			<Provider state={state}>
				<Connected view="shortcuts" />
			</Provider>,
		);
		expect(wrapper.find(Container.displayName).props().redirectMap).toBeDefined();
	});

	it('should handle global keypresses', () => {
		const spy = jest.spyOn(Container.prototype, 'handleKeyPress');

		mount(<Container redirectMap={{}} />);

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(spy).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
	});

	it('should call redirect actionCreator', () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '/test': '/test/next' } };
		mount(<Container redirectMap={redirectMap} dispatchActionCreator={fn} pathname="/test" />);

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(fn).toHaveBeenCalledWith('redirect', event, { action: { path: '/test/next' } });
	});

	it('should call matching actionCreator', () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '^[/]test[/].*$': 'test' } };

		mount(
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
