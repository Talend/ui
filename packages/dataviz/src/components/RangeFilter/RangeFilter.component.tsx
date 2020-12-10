import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import startOfDay from 'date-fns/startOfDay';
import { Slider } from '@talend/react-components';
import styles from './RangeFilter.component.scss';
import DateInputField from './input-fields/DateInputField.component';
import NumberInputField from './input-fields/NumberInputField.component';
import { formatDate, formatNumber, getFractionDigits } from '../../formatters/formatters';
import { DataType, Range } from '../../types';

export interface RangeFilterProps {
	id?: string;
	range: Range;
	dataType: DataType;
	limits: Range;
	onSliderChange: (range: Range) => void;
	/** Called when slider handle is released + on input field blur */
	onAfterChange: (range: Range) => void;
}

function getMarks(
	dataType: DataType,
	limits: Range,
	precision: number,
): { [tick in number]: ReactNode } {
	const ticksNumber =
		dataType === DataType.DATE || (limits.max < 1e10 && limits.max > 1e-10) ? 5 : 3;

	const result: { [tick in number]: ReactNode } = {};
	for (let i = 0; i < ticksNumber; i += 1) {
		const tickValue = limits.min + (i * (limits.max - limits.min)) / (ticksNumber - 1);
		// Position: _ - - - _
		const position = { 0: 'bottom-left', [ticksNumber - 1]: 'bottom-right' }[i] || 'top';
		result[tickValue] = (
			<span
				className={classNames(
					styles['range-filter__slider-mark'],
					styles[`range-filter__slider-mark--${position}`],
				)}
			>
				{DataType.DATE === dataType ? formatDate(tickValue) : formatNumber(tickValue, precision)}
			</span>
		);
	}
	return result;
}

const DataTypeHandlers = {
	[DataType.DATE]: {
		InputField: DateInputField,
		formatter: (value: number) => startOfDay(value).getTime(),
	},
	[DataType.NUMBER]: {
		InputField: NumberInputField,
		formatter: (value: number) => value,
	},
};

function RangeFilter({
	range,
	dataType,
	limits,
	onSliderChange,
	onAfterChange,
}: RangeFilterProps): JSX.Element {
	const { t } = useTranslation();

	const precision = Math.max(getFractionDigits(limits.min), getFractionDigits(limits.max));
	const marks = useMemo(() => getMarks(dataType, limits, precision), [limits, dataType, precision]);
	const dataTypeHandler = DataTypeHandlers[dataType];

	// Prevent onAfterChange to be triggered twice
	let onAfterChangedCalled = false;


	return (
		<div className={styles['range-filter']}>
			<div className={styles['range-filter__slider']}>
				<Slider
					// rc-slider is really picky..
					step={Number(`1e-${precision + 2}`).toFixed(precision + 2)}
					onChange={([min, max]: [number, number]) =>
						onSliderChange({
							min: dataTypeHandler.formatter(min),
							max: dataTypeHandler.formatter(max),
						})
					}
					onAfterChange={([min, max]: [number, number]) => {
						if (!onAfterChangedCalled) {
							onAfterChangedCalled = true;
							onAfterChange({
								min,
								max,
							});
						}
					}}
					min={limits.min}
					max={limits.max}
					value={[range.min, range.max]}
					allowCross={false}
					hideTooltip
					marks={marks}
				/>
			</div>
			<form className={styles['range-filter__input-container']}>
				<label className={styles['range-filter__label']}>
					<span className={styles['range-filter__label-text']}>{t('MIN', 'Min')}</span>
					<dataTypeHandler.InputField
						value={range.min}
						onChange={value =>
							onAfterChange({
								min: Math.min(Math.max(value, limits.min), range.max),
								max: range.max,
							})
						}
					/>
				</label>
				<label className={styles['range-filter__label']}>
					<span className={styles['range-filter__label-text']}>{t('MAX', 'Max')}</span>
					<dataTypeHandler.InputField
						value={range.max}
						onChange={value =>
							onAfterChange({
								min: range.min,
								max: Math.max(range.min, Math.min(value, limits.max)),
							})
						}
					/>
				</label>
			</form>
		</div>
	);
}

export default RangeFilter;
