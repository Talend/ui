import React from 'react';
import keycode from 'keycode';
import { Map } from 'immutable';
import { shallow, mount } from 'enzyme';
import { Provider, store as mock } from '@talend/react-cmf/lib/mock';

import Container from './ShortcutManager.container';
import Connected from './ShortcutManager.connect';

describe('Container ShortcutManager', () => {
	it('should render', () => {
		const wrapper = shallow(<Container redirectMap={{}} />);
		expect(wrapper.getElement()).toBeNull();
		wrapper.unmount();
	});
});

describe('Connected ShortcutManager', () => {
	it('should connect ShortcutManager', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('handles routes', () => {
	const state = mock.state();
	state.cmf.settings.props.shortcuts = {
		redirectMap: {},
	};
	state.cmf.components = new Map();

	it('should get the redirectMap', () => {
		const wrapper = mount(
			<Provider state={state}>
				<Connected view="shortcuts" />
			</Provider>,
		);
		expect(wrapper.find(Container.displayName).props().redirectMap).toBeDefined();
		wrapper.unmount();
	});

	it('should handle global keypresses', () => {
		const spy = jest.spyOn(Container.prototype, 'handleKeyPress');

		const wrapper = mount(<Container redirectMap={{}} />);

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(spy).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
		wrapper.unmount();
	});

	it('should call redirect actionCreator', () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '/test': '/test/next' } };
		const context = { router: { getCurrentLocation: () => ({ pathname: '/test' }) } };

		const wrapper = mount(<Container redirectMap={redirectMap} dispatchActionCreator={fn} />, {
			context,
		});

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(fn).toHaveBeenCalledWith('redirect', event, { action: { path: '/test/next' } });
		wrapper.unmount();
	});

	it('should call matching actionCreator', () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '^[/]test[/].*$': 'test' } };
		const context = { router: { getCurrentLocation: () => ({ pathname: '/test/12345' }) } };

		const wrapper = mount(<Container redirectMap={redirectMap} dispatchActionCreator={fn} />, {
			context,
		});

		const event = new KeyboardEvent('keydown', { keyCode: keycode('esc') });
		document.dispatchEvent(event);

		expect(fn).toHaveBeenCalledWith('test', event);
		wrapper.unmount();
	});
});
