import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cmf, { mock } from '@talend/react-cmf';

import Connected, {
	mapStateToProps,
	ContainerActionDropdown,
	mergeProps,
} from './ActionDropdown.connect';

jest.unmock('@talend/design-system');

describe('Connect(CMF(Container(ActionDropdown)))', () => {
	const state = {
		cmf: {
			settings: {
				actions: {
					foo: { id: 'foo', label: 'Foo!', actionIds: ['foosub1', 'foosub2'] },
					foosub1: { id: 'foosub1', label: 'sub 1' },
					foosub2: { id: 'foosub2', label: 'sub 2' },
					bar: { id: 'bar', label: 'Bar!' },
				},
			},
		},
	};
	it('should connect ActionDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionDropdown);
	});
	it('should mapStateToProps', () => {
		expect(mapStateToProps(state)).toEqual({});
	});
	it('should mapStateToProps with inner actionIds in actionId', () => {
		const props = mapStateToProps(state, { actionId: 'foo' });
		expect(typeof props).toBe('object');
		expect(props.label).toBe('Foo!');
		expect(props.items.length).toBe(2);
		expect(props.items[0].label).toBe('sub 1');
		expect(props.items[1].label).toBe('sub 2');
	});
	it('should mapStateToProps with actionIds', () => {
		const props = mapStateToProps(state, { actionIds: ['foosub1', 'foosub2'] });
		expect(props.items[0].label).toBe('sub 1');
		expect(props.items[1].label).toBe('sub 2');
	});
	it('should mapStateToProps with actionId', () => {
		const props = mapStateToProps(state, { actionId: 'bar' });
		expect(props.label).toBe('Bar!');
	});
	it('should mergeProps', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'owned' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
	});
	it('should return props with no actionId', () => {
		const props = mergeProps({ actionId: 'foo' });
		expect(props.actionId).toBe(undefined);
	});
	it('should return props with no actionIds', () => {
		const props = mergeProps({ actionIds: 'foo' });
		expect(props.actionId).toBe(undefined);
	});
});

describe('Container(ActionDropdown)', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
	it('should render', () => {
		const { container } = render(
			<App {...mock.store.context()}>
				<ContainerActionDropdown id="foo" label="foo" />
			</App>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render with items', async () => {
		const context = mock.store.context();
		const items = [{ label: 'Foo', onClick: jest.fn() }];
		render(
			<App {...context}>
				<ContainerActionDropdown id="extra" label="foo" items={items} />
			</App>,
		);
		await userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('menuitem')).toHaveTextContent('Foo');
	});
});
