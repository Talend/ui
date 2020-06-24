import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FACETED_MODE, I18N_DOMAIN_FACETED_SEARCH } from '../../constants';
import { FacetedToolbar } from '../FacetedToolbar';
import { FacetedManager } from '../FacetedManager';
import { controlled } from '../../controlled';

const FacetedSearch = ({ children, error, facetedMode, id, inProgress, setFacetedMode }) => {
	console.warn(
		'WARNING ABOUT FACETED SEARCH: The faceted search stills in development, so it could have some breaking change during this phase. The component will not follow the ui release process',
	);

	const isControlled = controlled('FacetedSearch', facetedMode, setFacetedMode);
	const [facetedModeState, setFacetedModeState] = useState(FACETED_MODE.BASIC);
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
	const facetedId = `${id}-faceted`;
	const mode = isControlled ? facetedMode : facetedModeState;
	const setMode = isControlled ? setFacetedMode : setFacetedModeState;
	return (
		<FacetedManager error={error} id={facetedId} inProgress={inProgress} t={t}>
			{typeof children === 'function' ? (
				<FacetedToolbar id={id} facetedMode={mode} onChangeFacetedMode={setMode} t={t}>
					{children(mode)}
				</FacetedToolbar>
			) : (
				children
			)}
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

// eslint-disable-next-line import/prefer-default-export
export { FacetedSearch };
