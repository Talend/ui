import React from 'react';
import PropTypes from 'prop-types';
import { ActionIconToggle } from '@talend/react-components/lib/Actions';
import Skeleton from '@talend/react-components/lib/Skeleton';
import { getTheme } from '@talend/react-components/lib/theme';
import { useTranslation } from 'react-i18next';

import facetedSearchIconTheme from './FacetedSearchIcon.scss';
import { I18N_DOMAIN_FACETED_SEARCH, USAGE_TRACKING_TAGS } from '../../constants';

const theme = getTheme(facetedSearchIconTheme);

// eslint-disable-next-line import/prefer-default-export
export function FacetedSearchIcon({ active, tick, loading, onClick }) {
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
	const dataFeature = active ? USAGE_TRACKING_TAGS.COLLAPSE : USAGE_TRACKING_TAGS.EXPAND;

	if (loading) {
		return <Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.large} />;
	}

	return (
		<ActionIconToggle
			active={active}
			tick={tick}
			className={theme('faceted-search-icon')}
			icon="talend-search"
			label={t('SHOW_FACETED_SEARCH', {
				defaultValue: 'Show faceted search',
			})}
			loading={loading}
			onClick={event => onClick(event)}
			data-feature={dataFeature}
		/>
	);
}

FacetedSearchIcon.propTypes = {
	active: PropTypes.bool,
	tick: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};
