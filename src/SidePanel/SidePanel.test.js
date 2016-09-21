import React from 'react';
import renderer from 'react-test-renderer';
import stubContext from 'react-stub-context';
import SidePanel from './SidePanel.component';

jest.mock('react-dom');

describe('SidePanel', () => {
	it('should render provided actions', () => {
		const actions = [{
			id: 'test',
			name: 'test',
			type: 'TEST_ACTION',
		}];
		const TestSidePanel = stubContext(SidePanel, {
			router: {},
			store: {
				getState() {
					return { cmf: {} };
				},
			},
			registry: {},
		});
		const sidepanel = renderer.create(
			<TestSidePanel actions={actions} />
		).toJSON();
		expect(sidepanel).toMatchSnapshot();
	});
});
