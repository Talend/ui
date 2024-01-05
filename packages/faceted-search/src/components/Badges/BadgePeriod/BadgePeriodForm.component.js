import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { subDays } from 'date-fns';
import PropTypes from 'prop-types';

import {
	ButtonIcon,
	ButtonPrimary,
	ButtonTertiary,
	DropdownButton,
	InlineMessageDestructive,
	SizedIcon,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';
import { InputDateTimeRangePicker } from '@talend/react-components/lib/DateTimePickers';
import Rich from '@talend/react-components/lib/Rich';
import { getTheme } from '@talend/react-components/lib/theme';

import { getDataAttributesFrom } from '../../../helpers/usage.helpers';

import cssModule from './BadgePeriod.module.scss';

const theme = getTheme(cssModule);

function getPeriodOptions(t) {
	return [
		{
			id: 'LAST_24_HOURS',
			value: 'lastDay',
			label: t('LAST_24_HOURS', { defaultValue: 'Last 24 hours' }),
			checked: false,
		},
		{
			id: 'LAST_3_DAYS',
			value: 'last3days',
			label: t('LAST_3_DAYS', { defaultValue: 'Last 3 days' }),
			checked: false,
		},
		{
			id: 'LAST_WEEK',
			value: 'last7days',
			label: t('LAST_WEEK', { defaultValue: 'Last 7 days' }),
			checked: false,
		},
		{
			id: 'LAST_MONTH',
			value: 'last30days',
			label: t('LAST_MONTH', { defaultValue: 'Last 30 days' }),
			checked: false,
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
	const initialStartDateTime = subDays(new Date(), 1);
	const initialEndDateTime = new Date();

	const resetRange = () => {
		onChange(null, {
			startDateTime: initialStartDateTime,
			endDateTime: initialEndDateTime,
			errorMessage: null,
		});
	};

	useEffect(() => {
		if (dirty) {
			onSubmit();
			setDirty(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dirty]);
	return (
		<form
			className={classNames(theme('fs-badge-period-form'), { 'period-options-form': !isCustom })}
			id={`${badgePeriodFormId}-form`}
			onSubmit={onSubmit}
		>
			<Rich.Layout.Body id={badgePeriodFormId} className={theme('fs-badge-period-form-body')}>
				{isCustom && (
					<StackHorizontal align="center" margin={{ top: '0', bottom: 'XS' }}>
						<ButtonIcon
							data-testid="badge-period-form-custom-button"
							icon="chevron-left"
							onClick={goBack}
							{...getDataAttributesFrom(rest)}
						/>
						<span>{t('CUSTOM', { defaultValue: 'Custom' })}</span>
					</StackHorizontal>
				)}
				{!isCustom
					? getPeriodOptions(t).map(rowItem => {
							return (
								<DropdownButton
									key={rowItem.id}
									onClick={event => {
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
									}}
									data-testid={`badge-period-form-item-${rowItem.id}`}
									data-test={`badge-period-form-item-${rowItem.id}`}
								>
									{rowItem.id === 'CUSTOM' ? (
										<StackHorizontal align="center" justify="spaceBetween">
											<span>{rowItem.label}</span>
											<SizedIcon name="chevron-right" size="M" />
										</StackHorizontal>
									) : (
										<span>{rowItem.label}</span>
									)}
								</DropdownButton>
							);
					  })
					: null}
				{isCustom ? (
					<StackVertical align="flexStart" justify="center" margin={{ top: '0', left: 'S' }}>
						<InputDateTimeRangePicker
							id={`${badgePeriodFormId}-date-time-range-picker`}
							startDateTime={value?.startDateTime || initialStartDateTime}
							endDateTime={value?.endDateTime || initialEndDateTime}
							onChange={(event, range) => {
								onChange(event, { ...range, id: 'CUSTOM' });
							}}
						/>
						{value?.errorMessage && <InlineMessageDestructive description={value.errorMessage} />}
					</StackVertical>
				) : null}
			</Rich.Layout.Body>
			{isCustom && (
				<Rich.Layout.Footer id={id}>
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
				</Rich.Layout.Footer>
			)}
		</form>
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
