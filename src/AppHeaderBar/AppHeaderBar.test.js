import React from 'react';
import renderer from 'react-test-renderer';
import AppHeaderBar from './AppHeaderBar.component';

jest.mock('react-dom');

describe('AppHeaderBar', () => {
	it('should render its name', () => {
		const appheaderbar = renderer.create(
			<AppHeaderBar name="Hello world" />
		).toJSON();
		expect(appheaderbar).toMatchSnapshot();
	});
});
