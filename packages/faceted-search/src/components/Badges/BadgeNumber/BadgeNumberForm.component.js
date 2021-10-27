import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Action } from '@talend/react-components/lib/Actions';
import { getTheme } from '@talend/react-components/lib/theme';
import { Rich } from '@talend/react-components';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

import cssModule from './BadgeNumber.scss';

const theme = getTheme(cssModule);

const BadgeNumberForm = ({ id, onChange, onSubmit, value, feature, t }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const onChangeText = event => onChange(event, event.target.value);

	return (
		<form className={theme('tc-badge-number-form')} id={`${id}-number`} onSubmit={onSubmit}>
			<Rich.Layout.Body id={`${id}-badge-body`} className={theme('tc-badge-number-form-body')}>
				<input
					id={`${id}-input`}
					autoFocus // eslint-disable-line jsx-a11y/no-autofocus
					className="form-control"
					placeholder={t('TYPE_HERE', { defaultValue: 'Type here' })}
					onChange={onChangeText}
					type="number"
					value={value}
				/>
			</Rich.Layout.Body>
			<Rich.Layout.Footer id={`${id}-badge-footer`}>
				<Action
					type="submit"
					data-feature={applyDataFeature}
					label={t('APPLY', { defaultValue: 'Apply' })}
					bsStyle="info"
				/>
			</Rich.Layout.Footer>
		</form>
	);
};

BadgeNumberForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeNumberForm };
