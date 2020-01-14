import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_FACETED_SEARCH } from '../../constants';
import { FacetedSearchProvider } from '../context/facetedSearch.context';

const FacetedManager = ({ children, id, inProgress, error }) => {
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
	const contextValue = {
		error,
		id,
		inProgress,
		t,
	};
	return <FacetedSearchProvider value={contextValue}>{children}</FacetedSearchProvider>;
};

FacetedManager.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	id: PropTypes.string.isRequired,
	inProgress: PropTypes.bool,
	error: PropTypes.string,
};

// eslint-disable-next-line import/prefer-default-export
export { FacetedManager };
