import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import SidePanel from './SidePanel.container';

jest.mock('react-talend-components');
jest.mock('react-dom');

describe('SidePanel', () => {
	it('should render', () => {
		const sidepanel = renderer.create(
			<Provider>
				<SidePanel />
			</Provider>,
		).toJSON();
		expect(sidepanel).toMatchSnapshot();
	});
	it('should render provided actions as string', () => {
		const actions = ['menu:article', 'menu:demo'];

		const sidepanel = renderer.create(
			<Provider>
				<SidePanel actions={actions} />
			</Provider>,
		).toJSON();
		expect(sidepanel).toMatchSnapshot();
	});
});
