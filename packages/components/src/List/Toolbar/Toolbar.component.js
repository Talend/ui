import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';

import SelectDisplayMode from './SelectDisplayMode';
import FilterBar from '../../FilterBar';
import ActionBar from '../../ActionBar';
import DisplayModeToggle from './DisplayModeToggle';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import '../../translate';
import Inject from '../../Inject';

function adaptActionsIds(actions, parentId) {
	return (
		actions &&
		actions.map(action => {
			if (action.id) {
				return {
					...action,
					id: `${parentId}-actions-${action.id}`,
				};
			}
			return action;
		})
	);
}

function adaptLeftAndRightActions(actions, parentId) {
	return (
		actions && {
			left: adaptActionsIds(actions.left, parentId),
		}
	);
}

/**
 * @param {string} id the id of Toolbar
 * @param {object} actionBar the ActionBar properties
 * @param {object} selectAllCheckbox the select all checkbox props
 * @param {object} display the SelectDisplayMode properties
 * @param {object} sort the SelectSortBy properties
 * @param {object} pagination the Pagination properties
 * @param {object} filter the Filter properties
 * @param {function} t the translate function
 * @example
 <Toolbar id="my-toolbar"></Toolbar>
 */
function Toolbar({
	id,
	actionBar,
	display,
	filter,
	t,
	getComponent,
	components,
}) {
	const Renderer = Inject.getAll(getComponent, {
		ActionBar,
		FilterBar,
	});
	const injected = Inject.all(getComponent, components);
	let actionBarProps = actionBar;
	if (id && actionBar) {
		const { actions, multiSelectActions } = actionBar;
		actionBarProps = {
			...actionBar,
			getComponent,
			actions: adaptLeftAndRightActions(actions, id),
			multiSelectActions: adaptLeftAndRightActions(multiSelectActions, id),
		};
	}
	const displayModeId = id && `${id}-display-mode`;

	return (
		<div className="tc-list-toolbar">
			{injected('before-actionbar')}
			{actionBar && (
				<Renderer.ActionBar {...actionBarProps}>
					<ActionBar.Content right className="action-groups">
						{injected('before-filter')}
						{filter && (
							<Renderer.FilterBar
								id={id && `${id}-filter`}
								{...filter}
								t={t}
								navbar
								className="separated"
							/>
						)}
						{injected('after-filter')}
						{injected('before-displaymode')}
						{display && <DisplayModeToggle id={displayModeId} {...display} t={t} />}
						{injected('after-displaymode')}
					</ActionBar.Content>
				</Renderer.ActionBar>
			)}
			{injected('after-actionbar')}
		</div>
	);
}

Toolbar.propTypes = {
	id: PropTypes.string,
	actionBar: PropTypes.shape(ActionBar.propTypes),
	display: PropTypes.shape(omit(SelectDisplayMode.propTypes, 't')),
	filter: PropTypes.shape(omit(FilterBar.propTypes, 't')),
	t: PropTypes.func.isRequired,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

Toolbar.defaultProps = {};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
