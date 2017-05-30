import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from '@talend/react-cmf/lib/mock';

import Action from './Action.component';

jest.mock(
	'@talend/react-components',
	() => ({ Action: props => (<button className="tc-action" {...props} />) })
);

describe('Action', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(
			<Provider>
				<Action name="menu:article" />
			</Provider>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
