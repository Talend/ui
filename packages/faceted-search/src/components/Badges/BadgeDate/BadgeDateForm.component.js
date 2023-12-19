import { useMemo } from 'react';

import { startOfDay } from 'date-fns/startOfDay';
import PropTypes from 'prop-types';

import { Action, DatePicker, getTheme, Rich } from '@talend/react-components';

import { getApplyDataFeature, getDataAttributesFrom } from '../../../helpers/usage.helpers';

import cssModule from './BadgeDate.module.scss';

const theme = getTheme(cssModule);

const BadgeDateForm = ({ id, onChange, onSubmit, value, feature, t, dateFormat, ...rest }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);

	return (
		<form className={theme('tc-badge-date-form')} id={`${id}-date-`} onSubmit={onSubmit}>
			<Rich.Layout.Body id={`${id}-badge-body`} className={theme('tc-badge-date-form-body')}>
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
					<div className={theme('tc-badge-date-form-input-container')}>
						<label className={theme('tc-badge-date-form-label')} htmlFor={`${id}-date-input`}>
							{t('SELECT_A_DATE', 'Select a date')}
						</label>
						<DatePicker.Input
							id={`${id}-date-input`}
							className="form-control"
							placeholder={t('TYPE_HERE', { defaultValue: 'Type here' })}
						/>
					</div>
					<div className={theme('tc-badge-date-form-picker-container')}>
						<DatePicker.Picker />
					</div>
					<Action
						className={theme('tc-badge-date-form-submit')}
						data-feature={applyDataFeature}
						type="submit"
						label={t('APPLY', { defaultValue: 'Apply' })}
						bsStyle="info"
						{...getDataAttributesFrom(rest)}
					/>
				</DatePicker.Manager>
			</Rich.Layout.Body>
		</form>
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
