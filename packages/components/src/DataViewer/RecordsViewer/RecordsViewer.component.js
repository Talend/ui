import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import theme from './RecordsViewer.scss';
import { Tree } from '../Core';
import { VirtualizedTree } from '../Virtualized';
import { TreeHeader } from '../Headers';
import RecordsCellRenderer from './CellRenderer';
import getDefaultT from '../../translate';

export class RecordsViewer extends React.Component {
	static propTypes = {
		onCollapseAll: PropTypes.func.isRequired,
		onVerticalScroll: PropTypes.func,
		paddingOffset: PropTypes.number,
		t: PropTypes.func,
		virtualized: PropTypes.bool,
		displayHeader: PropTypes.bool,
	};

	static defaultProps = {
		virtualized: true,
		t: getDefaultT(),
		displayHeader: true,
	};

	renderCellRenderer = args => <RecordsCellRenderer {...this.props} {...args} />;

	render() {
		const { onCollapseAll, onVerticalScroll, t, virtualized, displayHeader, ...props } = this.props;
		return (
			<div className={classNames(theme['tc-records-viewer'], 'tc-records-viewer')}>
				{displayHeader && (
					<TreeHeader
						title={t('RECORDS_HEADER_TITLE', { defaultValue: 'Records' })}
						onClickCollapseAll={onCollapseAll}
					/>
				)}
				{virtualized ? (
					<VirtualizedTree
						cellRenderer={this.renderCellRenderer}
						cellMeasurerClassName={classNames(
							theme['tc-records-viewer-tree-border'],
							'tc-records-viewer-tree-border',
						)}
						className={classNames(theme['tc-records-viewer-tree'], 'tc-records-viewer-tree')}
						onVerticalScroll={onVerticalScroll}
						paddingOffset={props.paddingOffset}
						rowCount={get(props, 'value', []).length}
					/>
				) : (
					<Tree {...props} jsonpath="$" level={0} />
				)}
			</div>
		);
	}
}

export default RecordsViewer;
