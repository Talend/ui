import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';

import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import FilterBar from '../../FilterBar';
import Label from './Label';
import ActionBar from '../../ActionBar';
import ColumnChooser from './ColumnChooser';

import theme from './Toolbar.scss';
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
			right: adaptActionsIds(actions.right, parentId),
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
	actionBar,
	columnChooser,
	components,
	display,
	filter,
	getComponent,
	id,
	pagination,
	selectAllCheckbox,
	sort,
	t,
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
	const hasToolbarItem = selectAllCheckbox || display || sort || pagination || filter;

	return (
		<div className="tc-list-toolbar">
			{injected('before-actionbar')}
			{actionBar && <Renderer.ActionBar {...actionBarProps} />}
			{injected('after-actionbar')}
			{injected('before-navbar')}
			{hasToolbarItem && (
				<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
					<ColumnChooser id={`${id}-column-chooser`} {...columnChooser}>
						{({
							columnChooserId,
							columns,
							handlerColumnChooser,
							onChangeOrderColumn,
							onChangeVisibilityColumn,
							onClickModify,
							reset,
						}) => (
							<ColumnChooser.Button
								id={columnChooserId}
								label="column-chooser-button"
								overlay={
									<ColumnChooser.Content
										columns={columns}
										handlerColumnChooser={handlerColumnChooser}
										id={columnChooserId}
										onChangeOrderColumn={onChangeOrderColumn}
										onChangeVisibilityColumn={onChangeVisibilityColumn}
										onClickModify={onClickModify}
										onExit={reset}
									/>
								}
							/>
						)}
					</ColumnChooser>
					{injected('before-selectall')}
					{selectAllCheckbox && <SelectAll {...selectAllCheckbox} t={t} />}
					{injected('after-selectall')}
					{injected('before-displaymode')}
					{display && (
						<Label
							text={t('LIST_TOOLBAR_DISPLAY', { defaultValue: 'Display:' })}
							htmlFor={displayModeId}
						/>
					)}
					{display && <SelectDisplayMode id={displayModeId} {...display} t={t} />}
					{injected('after-displaymode')}
					{injected('before-sort')}
					{sort && (
						<Label
							text={t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}
							htmlFor={id && `${id}-sort-by`}
						/>
					)}
					{sort && <SelectSortBy id={id && `${id}-sort`} {...sort} t={t} />}
					{injected('after-sort')}
					{injected('before-pagination')}
					{pagination && (
						<Label
							text={t('LIST_TOOLBAR_PAGINATION_SHOW', { defaultValue: 'Show:' })}
							htmlFor={id && `${id}-pagination-size`}
						/>
					)}
					{pagination && <Pagination id={id && `${id}-pagination`} {...pagination} t={t} />}
					{injected('after-pagination')}
					{injected('before-filter')}
					{filter && (
						<Renderer.FilterBar
							id={id && `${id}-filter`}
							{...filter}
							t={t}
							navbar
							className="navbar-right"
						/>
					)}
					{injected('after-filter')}
				</Navbar>
			)}
			{injected('after-navbar')}
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
	pagination: PropTypes.shape(Pagination.propTypes),
	filter: PropTypes.shape(omit(FilterBar.propTypes, 't')),
	t: PropTypes.func.isRequired,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

Toolbar.defaultProps = {};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
