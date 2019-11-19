import React from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import TextArea from '@talend/react-forms/lib/UIForm/fields/TextArea';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';

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
			<RichLayout.Body id={id} className={theme('tc-badge-text-form-body')}>
				<TextArea
					id={`${id}-area`}
					onChange={onChangeTextArea}
					onFinish={() => {}}
					schema={schema}
					value={value}
				/>
			</RichLayout.Body>
			<RichLayout.Footer id={id}>
				<Action type="submit" label={t('APPLY', { defaultValue: 'Apply' })} bsStyle="info" />
			</RichLayout.Footer>
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

// eslint-disable-next-line import/prefer-default-export
export { BadgeTextArea };
