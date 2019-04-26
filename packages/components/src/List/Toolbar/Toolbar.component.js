import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';

import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import FilterBar from '../../FilterBar';
import Label from './Label';
import ActionBar from '../../ActionBar';
import DisplayModeToggle from './DisplayModeToggle';

import theme from './Toolbar.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import '../../translate';
import Inject from '../../Inject';
import SelectSortBy from './SelectSortBy/SelectSortBy.component';

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
	selectAllCheckbox,
	display,
	sort,
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
	const showSelectAll = selectAllCheckbox && display && display.mode === 'large';
	const showSort = sort && display && display.mode === 'large';

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
						{injected('before-sort')}
						{showSort && (
							<Label
								text={t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}
								htmlFor={id && `${id}-sort-by`}
							/>
						)}
						{showSort && (
							<SelectSortBy id={id && `${id}-sort`} {...sort} t={t} className="separated" />
						)}
						{injected('after-sort')}
						{injected('before-displaymode')}
						{display && <DisplayModeToggle id={displayModeId} {...display} t={t} />}
						{injected('after-displaymode')}
					</ActionBar.Content>
				</Renderer.ActionBar>
			)}
			{injected('after-actionbar')}
			{showSelectAll && <SelectAll {...selectAllCheckbox} t={t} />}
		</div>
	);
}

Toolbar.propTypes = {
	id: PropTypes.string,
	actionBar: PropTypes.shape(ActionBar.propTypes),
	selectAllCheckbox: PropTypes.shape(omit(SelectAll.propTypes, 't')),
	display: PropTypes.shape(omit(SelectDisplayMode.propTypes, 't')),
	sort: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			field: PropTypes.string,
			isDescending: PropTypes.bool,
			onChange: PropTypes.func.isRequired,
		}),
	]),
	filter: PropTypes.shape(omit(FilterBar.propTypes, 't')),
	t: PropTypes.func.isRequired,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

Toolbar.defaultProps = {};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
