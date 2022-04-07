import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@talend/design-system';
import { getTheme } from '@talend/react-components/lib/theme';

import { FACETED_MODE, USAGE_TRACKING_TAGS } from '../../constants';
import cssModule from './FacetedToolbar.scss';

const theme = getTheme(cssModule);

const SwitchFacetedMode = ({ facetedMode, onChange, t }) => (
	<Form>
		<Form.Switch
			label={t('FACETED_SEARCH_QUERY', 'Query')}
			onChange={() => onChange(facetedMode === FACETED_MODE.BASIC ? FACETED_MODE.ADVANCED : FACETED_MODE.BASIC)}
			dataFeature={facetedMode === FACETED_MODE.BASIC ? USAGE_TRACKING_TAGS.BASIC : USAGE_TRACKING_TAGS.ADVANCED}
		/>
	</Form>
);

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
