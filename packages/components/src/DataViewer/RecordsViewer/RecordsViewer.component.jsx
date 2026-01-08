import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import theme from './RecordsViewer.module.css';
import { Tree } from '../Core';
import { VirtualizedTree } from '../Virtualized';
import { TreeHeader } from '../Headers';
import RecordsCellRenderer from './CellRenderer';
import getDefaultT from '../../translate';

export class RecordsViewer extends Component {
	static propTypes = {
		onCollapseAll: PropTypes.func.isRequired,
		onVerticalScroll: PropTypes.func,
		paddingOffset: PropTypes.number,
		t: PropTypes.func,
		virtualized: PropTypes.bool,
		displayHeader: PropTypes.bool,
		disableHeight: PropTypes.bool,
	};

	static defaultProps = {
		disableHeight: false,
		virtualized: true,
		t: getDefaultT(),
		displayHeader: true,
	};

	renderCellRenderer = args => <RecordsCellRenderer {...this.props} {...args} />;

	render() {
		const {
			onCollapseAll,
			onVerticalScroll,
			t,
			virtualized,
			displayHeader,
			disableHeight,
			...props
		} = this.props;
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
						disableHeight={disableHeight}
					/>
				) : (
					<Tree {...props} jsonpath="$" level={0} />
				)}
			</div>
		);
	}
}

export default RecordsViewer;
