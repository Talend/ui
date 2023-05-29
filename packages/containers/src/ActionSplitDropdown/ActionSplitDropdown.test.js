import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import cmf, { mock } from '@talend/react-cmf';
import Connected, {
	mapStateToProps,
	ContainerActionSplitDropdown,
} from './ActionSplitDropdown.connect';

jest.unmock('@talend/design-system');

describe('Connect(CMF(Container(ActionSplitDropdown)))', () => {
	it('should connect ActionSplitDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionSplitDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionSplitDropdown);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
		const actionId = 'menu:article';
		const actionIds = ['menu:items'];
		const props = mapStateToProps(state, { actionId, actionIds });
		expect(typeof props).toBe('object');
		expect(props).toMatchObject({
			name: 'My article',
			payload: {},
			items: [{ name: 'my items' }],
		});
	});
});

describe('Container(ActionSplitDropdown)', () => {
	let App;
	beforeEach(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
	it('should render', () => {
		const context = mock.store.context();
		const { container } = render(
			<App {...context}>
				<ContainerActionSplitDropdown label="extra" actionIds={['menu:article']} />
			</App>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
