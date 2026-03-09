/* eslint-disable react/prop-types */

/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { date as dateUtils } from '@talend/utils';

import getDefaultT from '../../translate';
import { CellDatetimeComponent, computeValue } from './CellDatetime.component';

vi.mock('date-fns/formatDistanceToNow', () => ({
	__esModule: true,
	default: vi.fn(() => 'about 1 month ago'),
	formatDistanceToNow: vi.fn(() => 'about 1 month ago'),
}));
vi.mock('date-fns/format', () => ({
	__esModule: true,
	default: vi.fn(() => '2016-09-22 09:00:00'),
	format: vi.fn(() => '2016-09-22 09:00:00'),
}));

vi.mock('../../TooltipTrigger', () => ({
	default: props => (
		<div
			data-testid="TooltipTrigger"
			aria-label={props.label}
			data-placement={props.tooltipPlacement}
		>
			{props.children}
		</div>
	),
}));

vi.mock('@talend/utils', async () => {
	const actualUtils = await vi.importActual('@talend/utils');

	return {
		...actualUtils,
		date: {
			...actualUtils.date,
			formatToTimeZone: vi.fn(() => '2016-09-22 09:00:00'),
		},
	};
});

describe('CellDatetime', () => {
	afterAll(() => {
		vi.unmock('date-fns/formatDistanceToNow');
		vi.unmock('date-fns/format');
	});

	afterEach(() => {
		vi.clearAllMocks();
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
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText(/ago$/)).toBeVisible();
		expect(screen.getByTestId('TooltipTrigger')).toHaveAttribute('aria-label');
	});

	it('should render CellDatetime with no date', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		render(<CellDatetimeComponent columnData={columnData} />);
		// then
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
		const t = vi.fn();
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
	});

	it('should render CellDatetime with tooltip in ago mode', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		render(<CellDatetimeComponent cellData={1474495200000} columnData={columnData} />);
		// then
		expect(screen.getByTestId('TooltipTrigger')).toHaveAttribute('aria-label');
	});

	it('should format with timezone', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
			timeZone: 'Pacific/Niue',
			sourceTimeZone: 'Europe/Paris',
		};
		const t = vi.fn();

		const cellData = 1474495200000;
		const expectedStrDate = '2016-09-22 09:00:00';
		const computedStrOffset = computeValue(cellData, columnData, t);

		// then
		expect(computedStrOffset).toEqual(expectedStrDate);
		expect(dateUtils.formatToTimeZone).toHaveBeenCalledWith(
			new Date(cellData),
			columnData.pattern,
			{
				timeZone: columnData.timeZone,
				sourceTimeZone: columnData.sourceTimeZone,
				locale: expect.anything(),
			},
		);
	});
});
