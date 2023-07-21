import { render } from '@testing-library/react';
import { ActionFile } from '@talend/react-components/lib/Actions';
import cmf, { mock } from '@talend/react-cmf';

import Connected, { mapStateToProps, mergeProps, ContainerActionFile } from './ActionFile.connect';

jest.unmock('@talend/design-system');

describe('Connected ActionFile', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
	it('should connect ActionFile', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionFile.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionFile);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state, {});
		expect(typeof props).toBe('object');
	});
	it('should render', () => {
		const context = mock.store.context();

		const { container } = render(
			<App {...context}>
				<ActionFile id="42" actionId="menu:article" onChange={jest.fn()} />
			</App>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});

describe('ActionFile.mergeProps', () => {
	it('should merge props', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'boo' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
	});
});
