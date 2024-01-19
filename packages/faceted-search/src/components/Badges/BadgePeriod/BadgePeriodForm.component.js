import { useCallback, useEffect, useMemo, useState } from 'react';

import { subDays } from 'date-fns';
import PropTypes from 'prop-types';

import {
	ButtonPrimary,
	ButtonTertiary,
	Form,
	InlineMessageDestructive,
	SizedIcon,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';
import { InputDateTimeRangePicker } from '@talend/react-components/lib/DateTimePickers';

import { getDataAttributesFrom } from '../../../helpers/usage.helpers';

function getPeriodOptions(t) {
	return [
		{
			id: 'LAST_24_HOURS',
			value: 'lastDay',
			label: t('LAST_24_HOURS', { defaultValue: 'Last 24 hours' }),
		},
		{
			id: 'LAST_3_DAYS',
			value: 'last3days',
			label: t('LAST_3_DAYS', { defaultValue: 'Last 3 days' }),
		},
		{
			id: 'LAST_WEEK',
			value: 'last7days',
			label: t('LAST_WEEK', { defaultValue: 'Last 7 days' }),
		},
		{
			id: 'LAST_MONTH',
			value: 'last30days',
			label: t('LAST_MONTH', { defaultValue: 'Last 30 days' }),
		},
		{
			id: 'CUSTOM',
			value: 'custom',
			label: t('CUSTOM', { defaultValue: 'Custom' }),
			checked: false,
		},
	];
}

const BadgePeriodForm = ({ id, onChange, onSubmit, t, value, ...rest }) => {
	const [isCustom, setCustom] = useState(value.id === 'CUSTOM');
	const badgePeriodFormId = `${id}-period-form`;
	const goBack = () => setCustom(false);
	const [dirty, setDirty] = useState(false);
	const initialStartDateTime = useMemo(() => subDays(new Date(), 1), []);
	const initialEndDateTime = useMemo(() => new Date(), []);

	const resetRange = useCallback(() => {
		onChange(null, {
			id: 'CUSTOM',
			startDateTime: initialStartDateTime,
			endDateTime: initialEndDateTime,
			errorMessage: null,
		});
	}, [onChange, initialStartDateTime, initialEndDateTime]);

	const onSelectOption = useCallback(
		(rowItem, event) => {
			if (rowItem.id === 'CUSTOM') {
				setCustom(true);
				onChange(event, {
					id: 'CUSTOM',
					startDateTime: initialStartDateTime,
					endDateTime: initialEndDateTime,
					errorMessage: null,
				});
			} else {
				onChange(event, rowItem);
				setDirty(true);
			}
		},
		[onChange, setDirty, initialStartDateTime, initialEndDateTime],
	);

	useEffect(() => {
		if (dirty) {
			onSubmit();
			setDirty(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dirty]);
	return (
		<Form id={`${badgePeriodFormId}-form`} onSubmit={onSubmit}>
			{!isCustom && (
				<StackVertical gap="0" align="normal">
					{getPeriodOptions(t).map(rowItem => {
						return (
							<ButtonTertiary
								key={rowItem.id}
								onClick={event => onSelectOption(rowItem, event)}
								data-testid={`badge-period-form-item-${rowItem.id}`}
								data-test={`badge-period-form-item-${rowItem.id}`}
							>
								{rowItem.id === 'CUSTOM' ? (
									<StackHorizontal gap="0" align="center" justify="spaceBetween">
										<span>{rowItem.label}</span>
										<SizedIcon name="chevron-right" size="M" />
									</StackHorizontal>
								) : (
									<span>{rowItem.label}</span>
								)}
							</ButtonTertiary>
						);
					})}
				</StackVertical>
			)}
			{isCustom && (
				<>
					<div>
						<ButtonTertiary
							data-testid="badge-period-form-custom-button"
							icon="chevron-left"
							onClick={goBack}
							{...getDataAttributesFrom(rest)}
						>
							{t('CUSTOM', { defaultValue: 'Custom' })}
						</ButtonTertiary>
					</div>
					<InputDateTimeRangePicker
						id={`${badgePeriodFormId}-date-time-range-picker`}
						startDateTime={value?.startDateTime || initialStartDateTime}
						endDateTime={value?.endDateTime || initialEndDateTime}
						onChange={(event, range) => {
							onChange(event, { ...range, id: 'CUSTOM' });
						}}
					/>
					{value?.errorMessage && <InlineMessageDestructive description={value.errorMessage} />}
					<Form.Buttons>
						<ButtonTertiary
							id="reset-button"
							disabled={rest.isLoading}
							onClick={resetRange}
							{...getDataAttributesFrom(rest)}
						>
							{t('RESET', { defaultValue: 'Reset' })}
						</ButtonTertiary>
						<ButtonPrimary
							id="apply-button"
							type="submit"
							disabled={rest.isLoading || !!value?.errorMessage}
							{...getDataAttributesFrom(rest)}
						>
							{t('APPLY', { defaultValue: 'Apply' })}
						</ButtonPrimary>
					</Form.Buttons>
				</>
			)}
		</Form>
	);
};

BadgePeriodForm.propTypes = {
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.object,
	t: PropTypes.func.isRequired,
};

export { BadgePeriodForm };
