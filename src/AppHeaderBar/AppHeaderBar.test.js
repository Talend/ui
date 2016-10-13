import React from 'react';
import { shallow } from 'enzyme';
import AppHeaderBar from './AppHeaderBar.component';

describe('AppHeaderBar', () => {
	it('should call brand link callback on click', () => {
		// given
		const brandClick = jest.fn();
		const props = {
			app: 'Example App Name',
			brandLink: {
				onClick: brandClick,
			},
		};
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = shallow(appBar);
		appBarInstance.find('NavbarBrand').find('a').simulate('click');

		// then
		expect(brandClick).toBeCalled();
	});
});
