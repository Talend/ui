import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import { Action } from '../../../Actions';
import theme from './TreeHeader.scss';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

/**
 * A simple header customizable with collapse and expand all buttons.
 */
export function TreeHeader({ title, otherActions, onClickCollapseAll, onClickExpandAll, t }) {
	return (
		<div className={classNames(theme['tc-tree-header'], 'tc-tree-header')}>
			{title}
			<div className={classNames(theme['tc-tree-header-actions'], 'tc-tree-header-actions')}>
				{onClickCollapseAll && (
					<Action
						className={classNames(
							theme['tc-tree-header-actions-icon'],
							'tc-tree-header-actions-icon',
						)}
						icon="talend-minus-circle"
						id="CollapseAllRecords"
						tooltipLabel={t('RECORDS_HEADER_LABEL_CLOSE_ALL', {
							defaultValue: 'Close all',
						})}
						onClick={onClickCollapseAll}
						link
						hideLabel
					/>
				)}
				{onClickExpandAll && (
					<Action
						className={classNames(
							theme['tc-tree-header-actions-icon'],
							'tc-tree-header-actions-icon',
						)}
						icon="talend-table"
						id="ExpandAllRecords"
						tooltipLabel={t('RECORDS_HEADER_LABEL_EXPAND_ALL', {
							defaultValue: 'Expand all',
						})}
						onClick={onClickExpandAll}
						hideLabel
						link
					/>
				)}
			</div>
			{otherActions && otherActions()}
		</div>
	);
}

TreeHeader.defaultProps = {
	t: getDefaultT(),
};

TreeHeader.propTypes = {
	onClickCollapseAll: PropTypes.func,
	onClickExpandAll: PropTypes.func,
	otherActions: PropTypes.func,
	t: PropTypes.func,
	title: PropTypes.string.isRequired,
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(TreeHeader);
