import React from 'react';
import PropTypes from 'prop-types';
import ActionIconToggle from '@talend/react-components/lib/Actions/ActionIconToggle';
import Skeleton from '@talend/react-components/lib/Skeleton';
import { getTheme } from '@talend/react-components/lib/theme';
import { useTranslation } from 'react-i18next';

import facetedSearchIconTheme from './FacetedSearchIcon.scss';
import { I18N_DOMAIN_FACETED_SEARCH } from '../../constants';

const theme = getTheme(facetedSearchIconTheme);

// eslint-disable-next-line import/prefer-default-export
export function FacetedSearchIcon({ active, loading, onClick }) {
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.large} />;
	}
	return (
		<ActionIconToggle
			active={active}
			className={theme('faceted-search-icon')}
			icon="talend-filter"
			label={t('SHOW_FACETED_SEARCH', {
				defaultValue: 'Show faceted search',
			})}
			loading={loading}
			onClick={event => onClick(event)}
		/>
	);
}

FacetedSearchIcon.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};
