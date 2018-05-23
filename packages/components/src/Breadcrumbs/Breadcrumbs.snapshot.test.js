import React from 'react';
import { shallow } from 'enzyme';
import { BreadcrumbsComponent } from './Breadcrumbs.component';

jest.mock('react-dom');

describe('Breadcrumbs', () => {
	const items = [
		{ text: 'Text A', title: 'Go to Page Text A' },
		{ text: 'Text B', title: 'Go to Page Text B' },
		{ text: 'Text C', title: 'Go to Page Text C' },
		{ text: 'Text D', title: 'Go to Page Text D' },
	];

	it('should render items with ellipsis and 3 visible items by default', () => {
		const breadcrumbs = shallow(<BreadcrumbsComponent items={items} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should do nothing if items property is empty', () => {
		const breadcrumbs = shallow(<BreadcrumbsComponent items={undefined} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should render small list of items without ellipsis', () => {
		const customItems = [
			{ text: 'Text A', title: 'Text tile A' },
			{ text: 'Text B', title: 'Text tile B' },
			{ text: 'Text C' },
		];
		const breadcrumbs = shallow(<BreadcrumbsComponent items={customItems} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should render list of items without ellipsis when set enough max items to display', () => {
		const customItems = [
			{ text: 'Text A' },
			{ text: 'Text B' },
			{ text: 'Text C' },
			{ text: 'Text D' },
			{ text: 'Text E' },
		];
		const breadcrumbs = shallow(<BreadcrumbsComponent items={customItems} maxItems={5} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should render dropdown containing 3 items', () => {
		const customItems = [
			{ text: 'Text A' },
			{ text: 'Text B' },
			{ text: 'Text C' },
			{ text: 'Text D' },
			{ text: 'Text E' },
		];
		const breadcrumbs = shallow(<BreadcrumbsComponent items={customItems} maxItems={2} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should not render dropdown because all items are shown', () => {
		const customItems = [
			{ text: 'Text A' },
			{ text: 'Text B' },
			{ text: 'Text C' },
			{ text: 'Text D' },
			{ text: 'Text E' },
		];
		const breadcrumbs = shallow(
			<BreadcrumbsComponent items={customItems} maxItems={customItems.length} />,
		);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});

	it('should render items ids when provided', () => {
		const breadcrumbs = shallow(<BreadcrumbsComponent id="my-breadcrumb" items={items} />);
		expect(breadcrumbs.getElement()).toMatchSnapshot();
	});
});
