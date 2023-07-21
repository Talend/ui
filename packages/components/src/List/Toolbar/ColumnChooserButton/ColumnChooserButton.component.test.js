import { screen, render } from '@testing-library/react';
import ColumnChooserButton from './ColumnChooserButton.component';

jest.unmock('@talend/design-system');

const columns = [
	{ hidden: undefined, label: 'col1', locked: true, order: 1 },
	{ hidden: undefined, label: 'col2', locked: true, order: 2 },
	{ hidden: undefined, label: 'col3', order: 3 },
	{ hidden: undefined, label: 'col4', order: 4 },
	{ hidden: true, label: 'col5', order: 5 },
	{ hidden: undefined, label: 'col6', order: 6 },
];

describe('ColumnChooserButton', () => {
	it('should render the button', () => {
		// given
		const props = {
			id: 'my-wrapper-id',
			columns,
			submit: jest.fn(),
		};
		// when
		render(<ColumnChooserButton {...props} />);

		// then
		const btn = screen.getByRole('button');
		const icon = btn.querySelector('svg');
		expect(btn).toBeVisible();
		expect(btn).toHaveAttribute('id', 'my-wrapper-id-button');
		expect(icon).toHaveAttribute('name', 'talend-column-chooser');
	});
});
