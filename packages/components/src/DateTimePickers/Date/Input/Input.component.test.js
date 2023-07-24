/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';

import { DateContext } from '../Context';
import Input from './Input.component';

jest.mock('react-debounce-input', () => props => (
	<div data-testid="DebounceInput" data-props={JSON.stringify(props)}></div>
));
jest.mock('../../shared/InputSizer', () => ({ children, ...props }) => (
	<div data-testid="InputSizer" data-props={JSON.stringify(props)}>
		{children(300)}
	</div>
));

describe('Date.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			value: {
				textInput: '2007-01-02',
			},
			inputManagement: {
				placeholder: 'YYYY-MM-DD',
			},
		};

		// when
		render(
			<DateContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" minWidth={200} />
			</DateContext.Provider>,
		);

		// then
		expect(screen.getByTestId('InputSizer')).toBeVisible();
		expect(screen.getByTestId('DebounceInput')).toBeVisible();
		const props = JSON.parse(screen.getByTestId('DebounceInput').dataset.props);
		expect(props).toEqual({
			autoComplete: 'off',
			className: 'form-control',
			debounceTimeout: 300,
			type: 'text',
			value: '2007-01-02',
			style: { width: 300 },
			'aria-labelledby': 'labelId',
			placeholder: 'YYYY-MM-DD',
		});
		expect(JSON.parse(screen.getByTestId('InputSizer').dataset.props)).toEqual({
			inputText: 'YYYY-MM-DD',
			minWidth: 200,
		});
	});
});
