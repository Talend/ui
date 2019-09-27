import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_FACETED_SEARCH } from '../../constants';
import { operatorsDictionary } from '../../dictionary/operator.dictionary';
import { FacetedSearchProvider } from '../context/facetedSearch.context';
import { operatorsPropTypes } from '../facetedSearch.propTypes';

const FacetedManager = ({ children, id, inProgress, error, operatorsDefinitions }) => {
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
	const { addOperatorToDict, getOperatorsFromDict } = useMemo(
		() => operatorsDictionary(t, operatorsDefinitions),
		[operatorsDictionary, operatorsDefinitions],
	);
	const contextValue = {
		addOperatorToDict,
		error,
		getOperatorsFromDict,
		id,
		inProgress,
		t,
	};
	return <FacetedSearchProvider value={contextValue}>{children}</FacetedSearchProvider>;
};

FacetedManager.propTypes = {
	children: PropTypes.oneOfType(PropTypes.element, PropTypes.arrayOf(PropTypes.element)),
	id: PropTypes.string.isRequired,
	inProgress: PropTypes.bool,
	error: PropTypes.string,
	operatorsDefinitions: operatorsPropTypes,
};

// eslint-disable-next-line import/prefer-default-export
export { FacetedManager };
