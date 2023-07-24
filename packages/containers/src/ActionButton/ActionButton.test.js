import { screen, render } from '@testing-library/react';
import cmf, { mock } from '@talend/react-cmf';
import userEvent from '@testing-library/user-event';

import Connected, {
	mapStateToProps,
	mergeProps,
	ContainerActionButton,
} from './ActionButton.connect';

jest.unmock('@talend/design-system');

describe('Connect(CMF(Container(ActionButton)))', () => {
	it('should connect Container(ActionButton)', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionButton.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionButton);
	});
});

describe('CMF(Container(ActionButton))', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {
				// ActionButton: ContainerActionButton,
			},
		});
		App = config.App;
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				settings: {
					actions: {
						foo: { id: 'foo', label: 'Foo!' },
					},
				},
			},
		};
		const props = mapStateToProps(state, { actionId: 'foo' });
		expect(typeof props).toBe('object');
		expect(props.label).toBe('Foo!');
		expect(props.id).toBe('foo');
	});
	it('should render', () => {
		const props = {
			actionId: 'menu:article',
			'data-extra': 'foo',
			onClick: () => {},
			label: 'click',
		};
		const context = mock.store.context();

		const { container } = render(
			<App {...context}>
				<ContainerActionButton {...props} />
			</App>,
		);
		expect(container.firstChild).toMatchSnapshot();
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});

	it('should dispatch one action when it clicks', async () => {
		const dispatch = jest.fn();
		const props = {
			actionId: 'menu:article',
			dispatch,
			label: 'Foo',
			payload: {
				type: 'ACTION',
			},
			model: {
				id: 42,
			},
		};
		const context = mock.store.context();
		render(
			<App {...context}>
				<ContainerActionButton {...props} />
			</App>,
		);
		userEvent.click(screen.getByRole('button'));
		expect(dispatch).toHaveBeenCalledWith({
			model: props.model,
			...props.payload,
		});
	});

	it('should dispatch one actioncreator when it clicks', async () => {
		const dispatchActionCreator = jest.fn();
		const props = {
			actionId: 'menu:article',
			dispatchActionCreator,
			label: 'foo',
			actionCreator: 'foo',
		};
		const context = mock.store.context();
		render(
			<App {...context}>
				<ContainerActionButton {...props} />
			</App>,
		);
		await userEvent.click(screen.getByRole('button'));
		expect(dispatchActionCreator).toHaveBeenCalledWith(props.actionCreator, expect.anything(), {
			action: props,
		});
	});
});

describe('ActionButton.mergeProps', () => {
	it('should merge props', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'boo' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
	});
});
