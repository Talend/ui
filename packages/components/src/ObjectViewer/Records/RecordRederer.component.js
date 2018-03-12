import React from 'react';
import { CellMeasurer } from 'react-virtualized';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classNames from 'classnames';

import ObjectViewer from '../../ObjectViewer';
import theme from './RecordRederer.scss';

/**
 * Wrapper around ObjectViewer to trigger a React-Virtualized/CellMesurer#mesure() after update.
 * It allows CellMesurer to get the new size of the ObjectViewer and update the List cell height.
 */
class MesureObjectViewer extends React.Component {
	shouldComponentUpdate({ opened, data }) {
		// this is necessary to avoid an infinite call stack
		// componentDidUpdate --> measure --> List render --> componentDidUpdate --> ...
		return opened !== this.props.opened || data !== this.props.data;
	}

	componentDidUpdate() {
		// after data update or toggle update, the height has changed
		// triggers the CellMesurer to update height of this cell
		this.props.measure();
	}

	render() {
		return (
			<ObjectViewer {...omit(this.props, ['measure'])} />
		);
	}
}
MesureObjectViewer.propTypes = {
	data: PropTypes.object,
	measure: PropTypes.func,
	opened: PropTypes.arrayOf(PropTypes.string),
};

/**
 * Records cell object viewer renderer.
 */
export default function RecordRenderer({ index, key, parent, style }) {
	const datum = parent.props.data[index];
	const opened = parent.props.opened[index];
	const cache = parent.props.cache;
	const onToggle = parent.props.onRowItemToggle;
	return (
		<CellMeasurer
			cache={cache}
			columnIndex={0}
			key={key}
			parent={parent}
			rowIndex={index}
		>
			{({ measure }) => (
				// 'style' attribute required to position cell (within parent List)
				<div className={classNames(theme.row, 'tc-object-viewer-records-row')} style={style}>
					<MesureObjectViewer
						measure={measure}
						opened={opened}
						data={datum}
						onToggle={(event, options) => onToggle(index, options)}
					/>
				</div>
			)}
		</CellMeasurer>
	);
}
RecordRenderer.propTypes = {
	index: PropTypes.number.isRequired,
	key: PropTypes.any.isRequired,
	parent: PropTypes.element.isRequired,
	style: PropTypes.string.isRequired,
};
