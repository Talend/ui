import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Action } from '@talend/react-components/lib/Actions';
import { getTheme } from '@talend/react-components/lib/theme';
import { Rich } from '@talend/react-components';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

import cssModule from './BadgeText.scss';

const theme = getTheme(cssModule);

const BadgeTextForm = ({ id, onChange, onSubmit, value, feature, t }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);

	const onChangeText = event => {
		onChange(event, event.target.value);
	};

	return (
		<form className={theme('tc-badge-text-form')} id={`${id}-text-area`} onSubmit={onSubmit}>
			<Rich.Layout.Body id={id} className={theme('tc-badge-text-form-body')}>
				<input
					id={`${id}-text`}
					autoFocus
					className="form-control"
					onChange={onChangeText}
					placeholder={t('TYPE_HERE', { defaultValue: 'Type here' })}
					type="text"
					value={value}
				/>
			</Rich.Layout.Body>
			<Rich.Layout.Footer id={id}>
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

BadgeTextForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeTextForm };
