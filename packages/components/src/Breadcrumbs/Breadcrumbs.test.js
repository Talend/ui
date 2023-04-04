import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Breadcrumbs from './Breadcrumbs.component';

jest.unmock('@talend/design-system');
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
			render(<Breadcrumbs items={customItems} maxItems={5} />);
			expect(screen.getAllByRole('listitem')).toHaveLength(5);
			expect(screen.queryByText('Show breadcrumb links')).not.toBeInTheDocument();
		});

		it('should render a dropdown menu containing 4 items by setting maxItems at 2', () => {
			const customItems = [
				{ text: 'Text A' },
				{ text: 'Text B' },
				{ text: 'Text C' },
				{ text: 'Text D' },
				{ text: 'Text E' },
			];
			render(<Breadcrumbs items={customItems} maxItems={2} />);
			expect(screen.getAllByRole('listitem')).toHaveLength(2);
			expect(screen.getByLabelText('Show breadcrumb links')).toBeInTheDocument();
			expect(screen.getAllByRole('menuitem')).toHaveLength(4);
		});

		it('should compute id for each item when provided', () => {
			render(<Breadcrumbs id="my-breadcrumb" items={items} />);
			expect(screen.getByRole('list')).toBeInTheDocument(); // only 1
			const breadcrumbMenuItems = screen.getAllByRole('menuitem');
			expect(breadcrumbMenuItems).toHaveLength(2);
			breadcrumbMenuItems.forEach((breadcrumbMenuItem, index) => {
				expect(breadcrumbMenuItem).toHaveAttribute('id', `my-breadcrumb-item-${index + 1}`);
			});
			const breadcrumbItems = screen.getAllByRole('listitem');
			expect(breadcrumbItems).toHaveLength(4);
			breadcrumbItems.forEach((breadcrumbItem, index) => {
				expect(screen.getByText(items[index].text)).toHaveAttribute(
					'id',
					`my-breadcrumb-item-${index}`,
				);
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
			render(breadcrumbs);
			userEvent.click(screen.getByText(actions[clickedElementIndex].text));

			// then
			expect(onTextAClick).not.toBeCalled();
			expect(onTextBClick).toBeCalled();
			expect(onTextCClick).not.toBeCalled();

			const callArgs = onTextBClick.mock.calls[0];
			expect(callArgs[1]).toBe(actions[clickedElementIndex]);
		});
	});
});
