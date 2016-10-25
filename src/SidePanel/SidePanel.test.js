import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import SidePanel from './SidePanel.component';


jest.mock('react-dom');

describe('SidePanel', () => {
	it('should render provided actions', () => {
		const actions = ['menu:article', 'menu:demo'];

		const sidepanel = renderer.create(
			<Provider>
				<SidePanel actions={actions} />
			</Provider>
		).toJSON();
		expect(sidepanel).toMatchSnapshot();
	});
});
