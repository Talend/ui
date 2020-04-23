import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import Text from '@talend/react-forms/lib/UIForm/fields/Text';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

import cssModule from './BadgeNumber.scss';

const theme = getTheme(cssModule);

const BadgeNumberForm = ({ id, onChange, onSubmit, value, feature, t }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const onChangeText = (event, entity) => {
		onChange(event, entity.value);
	};

	const schema = {
		autoFocus: true,
		disabled: false,
		type: 'number',
		placeholder: t('TYPE_HERE', { defaultValue: 'Type here' }),
	};

	return (
		<form className={theme('tc-badge-number-form')} id={`${id}-number`} onSubmit={onSubmit}>
			<RichLayout.Body id={`${id}-badge-body`} className={theme('tc-badge-number-form-body')}>
				<Text
					id={`${id}-input`}
					onChange={onChangeText}
					onFinish={() => {}}
					schema={schema}
					value={value}
				/>
			</RichLayout.Body>
			<RichLayout.Footer id={`${id}-badge-footer`}>
				<Action
					type="submit"
					data-feature={applyDataFeature}
					label={t('APPLY', { defaultValue: 'Apply' })}
					bsStyle="info"
				/>
			</RichLayout.Footer>
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
