import { render, screen } from '@testing-library/react';
import OneColumn from './OneColumn.component';

describe('OneColumn', () => {
	it('should render', () => {
		//given
		const tabs = {
			id: 'my-tabs',
			items: [
				{
					id: 'tab-bar-action-1',
					key: '1',
					label: 'Tab1',
				},
				{
					id: 'tab-bar-action-2',
					key: '2',
					label: 'Tab2',
				},
			],
			onSelect: jest.fn(),
			selectedKey: '2',
		};

		const { container } = render(
			<OneColumn tabs={tabs}>
				<span>children</span>
			</OneColumn>,
		);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('children')).toBeVisible();
		expect(screen.getByText('Tab1')).toBeVisible();
	});
});
