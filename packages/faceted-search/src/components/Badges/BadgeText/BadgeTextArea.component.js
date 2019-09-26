import React from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import TextArea from '@talend/react-forms/lib/UIForm/fields/TextArea';
import { getTheme } from '@talend/react-components/lib/theme';

import Tooltip from '../../../../../components/Tooltip';

import cssModule from './BadgeText.scss';

const theme = getTheme(cssModule);

const BadgeTextArea = ({ id, onChange, onSubmit, value, t }) => {
	const onChangeTextArea = (event, entity) => {
		onChange(event, entity.value);
	};

	const schema = {
		autoFocus: true,
		disabled: false,
		placeholder: t('TYPE_HERE', { defaultValue: 'Type here' }),
	};

	return (
		<form className={theme('tc-badge-text-form')} id={`${id}-text-area`} onSubmit={onSubmit}>
			<Tooltip.Body id={id} className={theme('tc-badge-text-form-body')}>
				<TextArea
					id={`${id}-area`}
					onChange={onChangeTextArea}
					onFinish={() => {}}
					schema={schema}
					value={value}
				/>
			</Tooltip.Body>
			<Tooltip.Footer id={id}>
				<Action
					type="submit"
					label={t('APPLY', { defaultValue: 'Apply' })}
					bsStyle="info"
				/>
			</Tooltip.Footer>
		</form>
	);
};

BadgeTextArea.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	t: PropTypes.func.isRequired,
};

export { BadgeTextArea };
