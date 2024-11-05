/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';

import { DateRangeContext } from '../Context';
import Input from './Input.component';

jest.mock('react-debounce-input', () => {
	return props => <input data-testid="debounce" data-props={JSON.stringify(props)} {...props} />;
});

jest.mock('../../shared/InputSizer', () => {
	return props => (
		<div data-testid="InputSizer" data-props={JSON.stringify(props)}>
			{props.children(300)}
		</div>
	);
});

describe('Date.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			inputManagement: {
				placeholder: 'YYYY-MM-DD',
			},
		};
		const props = {
			onFocus: jest.fn(),
			onChange: jest.fn(),
			label: 'start date',
			date: {
				value: new Date(2019, 9, 11),
				textInput: '2019-10-11',
			},
		};

		// when
		render(
			<DateRangeContext.Provider value={managerValue}>
				<Input {...props} />
			</DateRangeContext.Provider>,
		);

		// then
		const input = screen.getByTestId('debounce');
		expect(input).toHaveAttribute('autocomplete', 'off');
		expect(input).toHaveAttribute('debouncetimeout', '300');
		expect(input).toHaveAttribute('placeholder', 'YYYY-MM-DD');
		expect(input).toHaveValue('2019-10-11');
		expect(input).toHaveStyle('width: 300px;');
	});
});
