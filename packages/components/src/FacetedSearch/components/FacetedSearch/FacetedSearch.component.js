import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { FACETED_MODE } from '../../FacetedSearch.constants';
import { FacetedToolbar } from '../FacetedToolbar';
import { FacetedManager } from '../FacetedManager';
import controlled from '../../../../controlled';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

// eslint-disable-next-line import/prefer-default-export
export const FacetedSearch = ({ children, error, facetedMode, id, inProgress, setFacetedMode }) => {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const isControlled = controlled('FacetedSearch', facetedMode, setFacetedMode);
	const [facetedModeState, setFacetedModeState] = useState(FACETED_MODE.BASIC);
	const facetedId = `${id}-faceted`;
	const mode = isControlled ? facetedMode : facetedModeState;
	const setMode = isControlled ? setFacetedMode : setFacetedModeState;
	return (
		<FacetedManager error={error} id={facetedId} inProgress={inProgress} t={t}>
			<FacetedToolbar id={id} facetedMode={mode} onChangeFacetedMode={setMode} t={t}>
				{children(mode)}
			</FacetedToolbar>
		</FacetedManager>
	);
};

FacetedSearch.propTypes = {
	children: PropTypes.func.isRequired,
	error: PropTypes.string,
	facetedMode: PropTypes.string,
	id: PropTypes.string.isRequired,
	inProgress: PropTypes.bool,
	setFacetedMode: PropTypes.func,
};
