import React from 'react';
import PropTypes from 'prop-types';
import Toggle from '@talend/react-components/lib/Toggle';
import { getTheme } from '@talend/react-components/lib/theme';

import { FACETED_MODE, USAGE_TRACKING_TAGS } from '../../constants';
import cssModule from './FacetedToolbar.scss';

const theme = getTheme(cssModule);

const SwitchFacetedMode = ({ facetedMode, onChange, t }) => {
	const values = [
		{
			value: FACETED_MODE.BASIC,
			label: t('FACETED_SEARCH_BASIC', { defaultValue: 'Basic' }),
			dataFeature: USAGE_TRACKING_TAGS.BASIC,
		},
		{
			value: FACETED_MODE.ADVANCED,
			label: t('FACETED_SEARCH_ADVANCED', { defaultValue: 'Advanced' }),
			dataFeature: USAGE_TRACKING_TAGS.ADVANCED,
		},
	];

	return (
		<form>
			<Toggle.Label values={values} value={facetedMode} onChange={onChange} />
		</form>
	);
};

SwitchFacetedMode.propTypes = {
	facetedMode: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

const FacetedToolbar = ({ children, facetedMode, id, onChangeFacetedMode, t }) => (
	<div id={`${id}-toolbar`} className={theme('tc-faceted-toolbar')}>
		{children}
		<SwitchFacetedMode id={id} facetedMode={facetedMode} onChange={onChangeFacetedMode} t={t} />
	</div>
);

FacetedToolbar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	facetedMode: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChangeFacetedMode: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { FacetedToolbar };
