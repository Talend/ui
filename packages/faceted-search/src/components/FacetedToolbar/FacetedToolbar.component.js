import React from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import { getTheme } from '@talend/react-components/lib/theme';

import { FACETED_MODE } from '../../constants';
import cssModule from './FacetedToolbar.scss';

const theme = getTheme(cssModule);

const SwitchFacetedMode = ({ facetedMode, id, onChange, t }) => (
	<div className={theme('tc-faceted-toolbar-buttons')}>
		<Action
			onClick={() => {
				onChange(FACETED_MODE.BASIC);
			}}
			label={t('FACETED_SEARCH_BASIC', { defaultValue: 'Basic' })}
			id={`${id}-basic-action`}
			className={theme('tc-faceted-toolbar-buttons-basic', {
				'tc-button-selected': facetedMode === FACETED_MODE.BASIC,
			})}
		/>
		<Action
			onClick={() => {
				onChange(FACETED_MODE.ADVANCED);
			}}
			label={t('FACETED_SEARCH_ADVANCED', { defaultValue: 'Advanced' })}
			id={`${id}-avd-action`}
			className={theme('tc-faceted-toolbar-buttons-advanced', {
				'tc-button-selected': facetedMode === FACETED_MODE.ADVANCED,
			})}
		/>
	</div>
);

SwitchFacetedMode.propTypes = {
	facetedMode: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
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
