import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from '@talend/react-components/lib/Actions/ActionButton';
import { getTheme } from '@talend/react-components/lib/theme';
import { USAGE_TRACKING_TAGS } from '../../constants';
import cssModule from './ClearBasicSearch.scss';

const theme = getTheme(cssModule);

export default function ClearBasicButton({ t, onClick, isDisabled }) {
	return (
		<div className={theme('tc-faceted-clear-basic')}>
			<ActionButton
				className={theme('tc-faceted-clear-basic-button')}
				tooltipLabel={t('FACETED_SEARCH_BASIC_CLEAR', { defaultValue: 'Remove all filters' })}
				data-feature={USAGE_TRACKING_TAGS.BASIC_CLEAR}
				icon="talend-trash"
				onClick={onClick}
				link
				label=""
				disabled={isDisabled}
			/>
		</div>
	);
}

ClearBasicButton.propTypes = {
	isDisabled: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};
