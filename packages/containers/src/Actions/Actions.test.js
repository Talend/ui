import { render } from '@testing-library/react';
import cmf, { mock } from '@talend/react-cmf';
import Action from '../Action';

import Actions from './Actions.connect';

jest.unmock('@talend/design-system');

describe('Actions', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {
				Action,
			},
		});
		App = config.App;
	});
	it('should render', () => {
		const { container } = render(
			<App {...mock.store.context()}>
				<Actions actionIds={['menu:demo']} />,
			</App>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
