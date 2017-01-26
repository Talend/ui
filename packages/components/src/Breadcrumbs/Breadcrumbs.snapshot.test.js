import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumbs from './Breadcrumbs.component';

jest.mock('react-dom');

describe('Breadcrumbs', () => {
	const items = [
		{ text: 'Text A' },
		{ text: 'Text B' },
		{ text: 'Text C' },
		{ text: 'Text D' },
	];

	it('should render items with ellipsis and 3 visible items by default', () => {
		const breadcrumbs = renderer.create(
			<Breadcrumbs items={items} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});

	it('should do nothing if items property is empty', () => {
		const breadcrumbs = renderer.create(
			<Breadcrumbs items={null} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});

	it('should render small list of items without ellipsis', () => {
		const customItems = [
			{ text: 'Text A', title: 'Text tile A' },
			{ text: 'Text B', title: 'Text tile B' },
			{ text: 'Text C' },
		];
		const breadcrumbs = renderer.create(
			<Breadcrumbs items={customItems} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});

	it('should render list of items without ellipsis when set enough max items to display', () => {
		const customItems = [
			{ text: 'Text A' },
			{ text: 'Text B' },
			{ text: 'Text C' },
			{ text: 'Text D' },
			{ text: 'Text E' },
		];
		const breadcrumbs = renderer.create(
			<Breadcrumbs items={customItems} maxItems={5} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});

	it('should render dropdown containing 3 items', () => {
		const customItems = [
			{ text: 'Text A' },
			{ text: 'Text B' },
			{ text: 'Text C' },
			{ text: 'Text D' },
			{ text: 'Text E' },
		];
		const breadcrumbs = renderer.create(
			<Breadcrumbs items={customItems} maxItems={2} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});

	it('should not render dropdown because all items are shown', () => {
		const customItems = [
			{ text: 'Text A' },
			{ text: 'Text B' },
			{ text: 'Text C' },
			{ text: 'Text D' },
			{ text: 'Text E' },
		];
		const breadcrumbs = renderer.create(
			<Breadcrumbs items={customItems} maxItems={customItems.length} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});

	it('should render items ids when provided', () => {
		const breadcrumbs = renderer.create(
			<Breadcrumbs id="my-breadcrumb" items={items} />
		).toJSON();
		expect(breadcrumbs).toMatchSnapshot();
	});
});
