/* eslint-disable react/prop-types */

/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';

import { date as dateUtils } from '@talend/utils';

import getLocale from '../../i18n/DateFnsLocale/locale';
import getDefaultT from '../../translate';
import { CellDatetimeComponent, computeValue } from './CellDatetime.component';

jest.mock('../../i18n/DateFnsLocale/locale');

jest.mock('date-fns/formatDistanceToNow', () => ({
	__esModule: true,
	default: jest.fn(() => 'about 1 month ago'),
}));
jest.mock('date-fns/format', () => ({
	__esModule: true,
	default: jest.fn(() => '2016-09-22 09:00:00'),
}));

jest.mock('../../TooltipTrigger', () => props => (
	<div
		data-testid="TooltipTrigger"
		aria-label={props.label}
		data-placement={props.tooltipPlacement}
	>
		{props.children}
	</div>
));

jest.mock('@talend/utils', () => {
	const actualUtils = jest.requireActual('@talend/utils');

	return {
		...actualUtils,
		date: {
			...actualUtils.date,
			formatToTimeZone: jest.fn(() => '2016-09-22 09:00:00'),
		},
	};
});

describe('CellDatetime', () => {
	beforeAll(() => {
		getLocale.mockImplementation(() => 'getLocale');
	});

	afterAll(() => {
		jest.unmock('../../i18n/DateFnsLocale/locale');
		jest.unmock('date-fns/formatDistanceToNow');
		jest.unmock('date-fns/format');
	});

	it('should render CellDatetime', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const { container } = render(
			<CellDatetimeComponent cellData={1474495200000} columnData={columnData} />,
		);
		// then
		expect(distanceInWordsToNow).toHaveBeenCalledWith(1474495200000, {
			addSuffix: true,
			locale: 'getLocale',
		});
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('about 1 month ago')).toBeVisible();
		expect(screen.getByTestId('TooltipTrigger')).toHaveAttribute(
			'aria-label',
			'2016-09-22 09:00:00',
		);
	});

	it('should render CellDatetime with no date', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		render(<CellDatetimeComponent columnData={columnData} />);
		// then
		expect(distanceInWordsToNow).toHaveBeenCalled();
		expect(format).toHaveBeenCalled();
		expect(document.querySelector('.cell-datetime-container')).toBeEmptyDOMElement();
	});

	it('should render CellDatetime with invalid date', () => {
		// when
		const columnData = {
			mode: 'format',
		};

		const cellData = 'not parsable date';

		render(<CellDatetimeComponent cellData={cellData} columnData={columnData} />);
		// then
		expect(document.querySelector('.cell-datetime-container')).toHaveTextContent(
			'not parsable date',
		);
	});

	it('should format with "ago"', () => {
		// when
		const columnData = {
			mode: 'ago',
		};
		const cellData = 1474495200000;
		const strDate = computeValue(cellData, columnData, getDefaultT());

		// then
		expect(strDate).toEqual(expect.stringContaining('ago'));
	});

	it('should format according to the pattern', () => {
		// when
		const t = jest.fn();
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
		};
		const cellData = 1474495200000 + 3600 * 11 * 1000;
		const timezoneOffset = new Date(cellData).getTimezoneOffset();
		const cellDataWithOffset = cellData + timezoneOffset * 60 * 1000;

		const expectedStrDate = '2016-09-22 09:00:00';
		const computedStrOffset = computeValue(cellDataWithOffset, columnData, t);
		// then
		expect(computedStrOffset).toEqual(expectedStrDate);
		expect(format).toHaveBeenCalledWith(cellDataWithOffset, columnData.pattern, {
			locale: getLocale(t),
		});
	});

	it('should render CellDatetime with tooltip in ago mode', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		render(<CellDatetimeComponent cellData={1474495200000} columnData={columnData} />);
		// then
		expect(screen.getByTestId('TooltipTrigger')).toHaveAttribute(
			'aria-label',
			'2016-09-22 09:00:00',
		);
	});

	it('should format with timezone', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
			timeZone: 'Pacific/Niue',
		};
		const t = jest.fn();

		const cellData = 1474495200000;
		computeValue(cellData, columnData, t);

		// then
		expect(dateUtils.formatToTimeZone).toHaveBeenCalledWith(cellData, columnData.pattern, {
			timeZone: columnData.timeZone,
			locale: getLocale(t),
		});
	});
});
