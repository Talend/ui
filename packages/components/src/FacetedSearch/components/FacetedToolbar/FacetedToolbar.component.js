import React from 'react';
import PropTypes from 'prop-types';
import Action from '../../../Actions/Action';
import { getTheme } from '../../../theme';

import { FACETED_MODE } from '../../FacetedSearch.constants';
import cssModule from './FacetedToolbar.scss';

const theme = getTheme(cssModule);

const SwitchFacetedMode = ({ facetedMode, id, onClickAdvanced, onClickClassic, t }) => (
	<div className={theme('tc-faceted-toolbar-buttons')}>
		<Action
			onClick={onClickAdvanced}
			label={t('FACETED_SEARCH_ADVANCED', { defaultValue: 'Advanced' })}
			id={`${id}-avd-action`}
			className={theme('tc-faceted-toolbar-buttons-advanced', {
				'tc-button-selected': facetedMode === FACETED_MODE.ADVANCED,
			})}
		/>
		<Action
			onClick={onClickClassic}
			label={t('FACETED_SEARCH_BASIC', { defaultValue: 'Basic' })}
			id={`${id}-basic-action`}
			className={theme('tc-faceted-toolbar-buttons-basic', {
				'tc-button-selected': facetedMode === FACETED_MODE.BASIC,
			})}
		/>
	</div>
);

SwitchFacetedMode.propTypes = {
	facetedMode: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onClickAdvanced: PropTypes.func.isRequired,
	onClickClassic: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

const FacetedToolbar = ({ children, facetedMode, id, onChangeFacetedMode, t }) => {
	const displayClassic = () => {
		onChangeFacetedMode(FACETED_MODE.BASIC);
	};
	const displayAdvanced = () => {
		onChangeFacetedMode(FACETED_MODE.ADVANCED);
	};

	return (
		<div id={`${id}-toolbar`} className={theme('tc-faceted-toolbar')}>
			{children}
			<SwitchFacetedMode
				id={id}
				facetedMode={facetedMode}
				onClickAdvanced={displayAdvanced}
				onClickClassic={displayClassic}
				t={t}
			/>
		</div>
	);
};

FacetedToolbar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	facetedMode: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChangeFacetedMode: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { FacetedToolbar };
