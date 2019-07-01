import React from 'react';
import { shallow } from 'enzyme';
import { BreadcrumbsComponent } from './Breadcrumbs.component';

jest.mock('react-dom');

describe('Breadcrumbs', () => {
	it('should do nothing if items property is empty', () => {
		const breadcrumbs = shallow(<BreadcrumbsComponent items={undefined} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should render all items without a dropdown menu if default max items is not reached', () => {
		const items = [
			{ text: 'Text A', title: 'Go to Page Text A' },
			{ text: 'Text B', title: 'Go to Page Text B' },
			{ text: 'Text C', title: 'Go to Page Text C' },
			{ text: 'Text D', title: 'Go to Page Text D' },
		];
		const breadcrumbs = shallow(<BreadcrumbsComponent items={items} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should render items with a dropdown menu if default max items is reached', () => {
		const items = [
			{ text: 'Text A', title: 'Go to Page Text A' },
			{ text: 'Text B', title: 'Go to Page Text B' },
			{ text: 'Text C', title: 'Go to Page Text C' },
			{ text: 'Text D', title: 'Go to Page Text D' },
			{ text: 'Text E', title: 'Go to Page Text E' },
		];

		const breadcrumbs = shallow(<BreadcrumbsComponent items={items} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});
});
