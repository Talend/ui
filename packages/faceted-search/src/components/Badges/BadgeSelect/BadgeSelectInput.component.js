import React from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
// import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';

// import cssModule from './BadgeText.scss';

// const theme = getTheme(cssModule);

const BadgeSelectInput = ({ id, onChange, onSubmit, value, t }) => {
	return (
		<form id={`${id}-select-input`} onSubmit={onSubmit}>
			<RichLayout.Body id={id}>Hello body</RichLayout.Body>
			<RichLayout.Footer id={id}>
				<Action type="submit" label={t('APPLY', { defaultValue: 'Apply' })} bsStyle="info" />
			</RichLayout.Footer>
		</form>
	);
};

BadgeSelectInput.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSelectInput };
