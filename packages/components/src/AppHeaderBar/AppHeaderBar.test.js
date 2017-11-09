import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import AppHeaderBar from './AppHeaderBar.component';

faker.seed(42);
describe('AppHeaderBar', () => {
	it('should call brand link callback on click', () => {
		// given
		const brandClick = jest.fn();
		const props = {
			app: faker.random.word(),
			brandLink: {
				onClick: brandClick,
			},
		};
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = shallow(appBar);
		appBarInstance.find('NavbarBrand').find('Button').simulate('click');

		// then
		expect(brandClick).toBeCalled();
	});
});
