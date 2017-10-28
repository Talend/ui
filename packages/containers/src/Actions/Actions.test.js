import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from '@talend/react-cmf/lib/mock';

import Actions from './Actions.connect';

jest.mock(
	'@talend/react-components',
	() => ({ Actions: props => (<div className="tc-actions" {...props} />) })
);

describe('Actions', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Actions actions={['menu:demo']} />
			</Provider>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
