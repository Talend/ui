import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { I18N } from '../../../../../app/constants';

import { FacetedSearchProvider } from '../context/facetedSearch.context';

const FacetedManager = ({ children, id, inProgress, error }) => {
	const { t } = useTranslation(I18N.DATASET_NAME_SPACE);
	const contextValue = useMemo(() => ({ id, inProgress, error, t }), [error, id, inProgress, t]);

	return <FacetedSearchProvider value={contextValue}>{children}</FacetedSearchProvider>;
};

FacetedManager.propTypes = {
	children: PropTypes.oneOfType(PropTypes.element, PropTypes.arrayOf(PropTypes.element)),
	id: PropTypes.string.isRequired,
	inProgress: PropTypes.bool,
	error: PropTypes.string,
};

export { FacetedManager };
