import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@talend/react-bootstrap';
import Breadcrumbs from './Breadcrumbs.component';

describe('Breadcrumbs', () => {
	describe('render', () => {
		const items = [
			{ text: 'Text A', title: 'Go to Page Text A' },
			{ text: 'Text B', title: 'Go to Page Text B' },
			{ text: 'Text C', title: 'Go to Page Text C' },
			{ text: 'Text D', title: 'Go to Page Text D' },
			{ text: 'Text E', title: 'Go to Page Text E' },
		];

		it('should render all items without a dropdown menu when setting enough maxItems to display', () => {
			const customItems = [
				{ text: 'Text A' },
				{ text: 'Text B' },
				{ text: 'Text C' },
				{ text: 'Text D' },
				{ text: 'Text E' },
			];
			const breadcrumbs = mount(<Breadcrumbs items={customItems} maxItems={5} />);
			const breadcrumbMenu = breadcrumbs.find('.tc-breadcrumb-menu');
			expect(breadcrumbMenu).toHaveLength(0);
			const breadcrumbItems = breadcrumbs.find('.tc-breadcrumb-item');
			expect(breadcrumbItems).toHaveLength(5);
		});

		it('should render a dropdown menu containing 4 items by setting maxItems at 2', () => {
			const customItems = [
				{ text: 'Text A' },
				{ text: 'Text B' },
				{ text: 'Text C' },
				{ text: 'Text D' },
				{ text: 'Text E' },
			];
			const breadcrumbs = mount(<Breadcrumbs items={customItems} maxItems={2} />);
			const breadcrumbMenu = breadcrumbs.find('.tc-breadcrumb-menu');
			expect(breadcrumbMenu).toHaveLength(1);
			const breadcrumbMenuItems = breadcrumbMenu.find('a');
			expect(breadcrumbMenuItems).toHaveLength(4);
		});

		it('should compute id for each item when provided', () => {
			const breadcrumbs = mount(<Breadcrumbs id="my-breadcrumb" items={items} />);
			const breadcrumbMenu = breadcrumbs.find('.tc-breadcrumb-menu');
			expect(breadcrumbMenu).toHaveLength(1);
			const breadcrumbMenuItems = breadcrumbMenu.find('a');
			expect(breadcrumbMenuItems).toHaveLength(2);
			breadcrumbMenuItems.forEach((breadcrumbMenuItem, index) => {
				expect(breadcrumbMenuItem.find(`a[id="my-breadcrumb-item-${index + 1}"]`)).toHaveLength(1);
			});
			const breadcrumbItems = breadcrumbs.find('.tc-breadcrumb-item');
			expect(breadcrumbItems).toHaveLength(3);
			breadcrumbItems.forEach((breadcrumbItem, index) => {
				expect(
					breadcrumbItem.find(
						`span[id="my-breadcrumb-item-${
							index === 0 ? index : index + breadcrumbMenuItems.length
						}"]`,
					),
				).toHaveLength(1);
			});
		});
	});

	describe('interactions', () => {
		const onTextAClick = jest.fn();
		const onTextBClick = jest.fn();
		const onTextCClick = jest.fn();
		const actions = [
			{ text: 'Text A', onClick: onTextAClick },
			{ text: 'Text B', onClick: onTextBClick },
			{ text: 'Text C', onClick: onTextCClick },
		];

		it('should trigger action callback on item click', () => {
			// given
			const clickedElementIndex = 1;

			// when
			const breadcrumbs = <Breadcrumbs items={actions} />;
			const wrapper = mount(breadcrumbs);
			wrapper
				.find('.tc-breadcrumb')
				.find(Button)
				.at(clickedElementIndex)
				.simulate('click');

			// then
			expect(onTextAClick).not.toBeCalled();
			expect(onTextBClick).toBeCalled();
			expect(onTextCClick).not.toBeCalled();

			const callArgs = onTextBClick.mock.calls[0];
			expect(callArgs[1]).toBe(actions[clickedElementIndex]);
		});
	});
});
