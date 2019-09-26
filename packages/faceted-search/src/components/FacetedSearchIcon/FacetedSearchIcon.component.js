import React from 'react';
import PropTypes from 'prop-types';
import { ActionIconToggle } from '@talend/react-components';
import { getTheme } from '@talend/react-components/lib/theme';
import facetedSearchIconTheme from './FacetedSearchIcon.scss';
import i18n from '../../../../i18n';

const theme = getTheme(facetedSearchIconTheme);

export function FacetedSearchIcon({ active, onClick }) {
	return (
		<ActionIconToggle
			active={active}
			className={theme('faceted-search-icon')}
			icon="talend-filter"
			label={i18n.t('dataset-app:FACETED_SEARCH_SHOW_FACETED', {
				defaultValue: 'Show faceted search',
			})}
			onClick={event => onClick(event)}
		/>
	);
}

FacetedSearchIcon.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};
