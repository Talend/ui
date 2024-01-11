import { useMemo } from 'react';

import { startOfDay } from 'date-fns/startOfDay';
import PropTypes from 'prop-types';

import { ButtonPrimary, Form } from '@talend/design-system';
import { DatePicker } from '@talend/react-components';

import { getApplyDataFeature, getDataAttributesFrom } from '../../../helpers/usage.helpers';

import styles from './BadgeDate.module.scss';

const BadgeDateForm = ({ id, onChange, onSubmit, value, feature, t, dateFormat, ...rest }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);

	return (
		<Form id={`${id}-date-`} onSubmit={onSubmit}>
			<DatePicker.Manager
				id={`${id}-date-picker-manager`}
				value={value}
				dateFormat={dateFormat}
				onChange={(event, data) => {
					if (!data.errors.length) {
						onChange(event, startOfDay(data.date).getTime());
					}
				}}
			>
				<div>
					<label htmlFor={`${id}-date-input`}>{t('SELECT_A_DATE', 'Select a date')}</label>
					<DatePicker.Input
						id={`${id}-date-input`}
						placeholder={t('TYPE_HERE', { defaultValue: 'Type here' })}
					/>
				</div>
				<div className={styles['tc-badge-date-form-picker-container']}>
					<DatePicker.Picker />
				</div>
			</DatePicker.Manager>
			<Form.Buttons>
				<ButtonPrimary
					data-feature={applyDataFeature}
					type="submit"
					{...getDataAttributesFrom(rest)}
				>
					{t('APPLY', { defaultValue: 'Apply' })}
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

BadgeDateForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.number,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	dateFormat: PropTypes.string,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeDateForm };
