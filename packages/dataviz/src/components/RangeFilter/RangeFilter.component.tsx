import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Slider } from '@talend/react-components';
import styles from './RangeFilter.component.scss';
import { Range } from '../../types';
import { I18N_DOMAIN_DATAVIZ } from '../../constants';
import { RangeHandler, Ticks } from './handlers/range-handler.types';

export type RangeFilterProps = RangeHandler & {
	id?: string;
	range: Range;
	limits: Range;
	onSliderChange: (range: Range) => void;
	/** Called when slider handle is released + on input field blur */
	onAfterChange: (range: Range) => void;
};

function getMarks(ticks: Ticks): { [tick: number]: ReactNode } {
	const marks: { [k: number]: ReactNode } = {};

	Object.entries(ticks)
		.map(([value, label]) => [+value, label])
		.sort((a, b) => a[0] - b[0])
		.forEach(([value, label], i, arr) => {
			// Position: _ - - - _
			const position = { 0: 'bottom-left', [arr.length - 1]: 'bottom-right' }[i] || 'top';
			marks[value] = (
				<span
					className={classNames(
						styles['range-filter__slider-mark'],
						styles[`range-filter__slider-mark--${position}`],
					)}
				>
					{label}
				</span>
			);
		});
	return marks;
}

function RangeFilter({
	id,
	range,
	limits,
	getMinValue = v => v,
	getMaxValue = v => v,
	getStep = () => 1,
	inputField: InputField,
	onSliderChange,
	onAfterChange,
	getTicks,
}: RangeFilterProps): JSX.Element {
	const { t } = useTranslation(I18N_DOMAIN_DATAVIZ);

	const marks = useMemo(() => getMarks(getTicks(limits)), [limits, getTicks]);

	// Prevent onAfterChange to be triggered twice
	let onAfterChangedCalled = false;

	return (
		<div className={styles['range-filter']}>
			<div className={styles['range-filter__slider']}>
				<Slider
					step={getStep(limits)}
					onChange={([min, max]: [number, number]) =>
						onSliderChange({
							min: getMinValue(min),
							max: getMaxValue(max),
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
			<form className={styles['range-filter__form']}>
				<div className={styles['range-filter__input-container']}>
					<label className={styles['range-filter__label']} htmlFor={`${id}-range-filter-min-input`}>
						{t('MIN', 'Min')}
					</label>
					<InputField
						id={`${id}-range-filter-min-input`}
						value={range.min}
						onChange={(value: number) =>
							onAfterChange({
								// Tricky one: we want the corrected value (i.e. day start) to stay between limits
								min: Math.min(Math.max(getMinValue(value), limits.min), range.max),
								max: range.max,
							})
						}
					/>
				</div>
				<div className={styles['range-filter__input-container']}>
					<label className={styles['range-filter__label']} htmlFor={`${id}-range-filter-max-input`}>
						{t('MAX', 'Max')}
					</label>
					<InputField
						id={`${id}-range-filter-max-input`}
						value={range.max}
						onChange={value =>
							onAfterChange({
								min: range.min,
								// Tricky one: we want the corrected value (i.e. day end) to stay between limits
								max: Math.max(range.min, Math.min(getMaxValue(value), limits.max)),
							})
						}
					/>
				</div>
			</form>
		</div>
	);
}

export default RangeFilter;
