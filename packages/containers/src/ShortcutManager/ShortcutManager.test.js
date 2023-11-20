import { Map } from 'immutable';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

	it('should handle global keypresses', async () => {
		const spy = jest.spyOn(Container.prototype, 'handleKeyPress');

		render(<Container redirectMap={{}} />);

		await userEvent.keyboard('{Esc}');

		expect(spy).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
	});

	it('should call redirect actionCreator', async () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '/test': '/test/next' } };
		render(<Container redirectMap={redirectMap} dispatchActionCreator={fn} pathname="/test" />);

		await userEvent.keyboard('{Esc}');

		expect(fn).toHaveBeenCalledWith('redirect', expect.anything(), {
			action: { path: '/test/next' },
		});
	});

	it('should call matching actionCreator', async () => {
		const fn = jest.fn();
		const redirectMap = { esc: { '^[/]test[/].*$': 'test' } };

		render(
			<Container redirectMap={redirectMap} dispatchActionCreator={fn} pathname="/test/12345" />,
		);

		await userEvent.keyboard('{Esc}');

		expect(fn).toHaveBeenCalledWith('test', expect.anything());
	});
});

describe('Connected ShortcutManager', () => {
	it('should connect ShortcutManager', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});
