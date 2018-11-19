import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Skeleton } from '@talend/react-components';

import { AVRO_TYPES } from '../../constants';
import DATAGRID_PROPTYPES from '../DataGrid/DataGrid.proptypes';

import QualityIndicator from './QualityIndicator.component';
import AvroRenderer from './AvroRenderer.component';
import theme from './DefaultCell.scss';
import { getAvroRenderer } from '../DataGrid/DataGrid.component';

export const CELL_RENDERER_COMPONENT = 'cellRenderer';

function DefaultCellRenderer2({ avroRenderer, colDef, value, getComponent, data }) {
	let content;

	// todo try with a refresh method
	console.log('DefaultCellRenderer', value);

	if (data.loading) {
		content = <Skeleton key="1" />;
	} else {
		content = [
			<QualityIndicator key="2" qualityIndex={value.quality} />,
			<AvroRenderer
				key="3"
				colDef={colDef}
				data={value}
				avroRenderer={avroRenderer}
				getComponent={getComponent}
			/>,
		];
	}

	return (
		<div aria-label={value.value} className={classNames(theme['td-cell'], 'td-cell')}>
			{content}
		</div>
	);
}

class DefaultCellRenderer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: this.props.data.loading,
		};
	}

	refresh(params) {
		console.log('refresh', params);
		if (params.data.loading !== this.state.loading) {
			this.setState({
				loading: params.data.loading,
			});
		}

		return false;
	}

	render() {
		const { avroRenderer, colDef, value, getComponent } = this.props;

		let content;

		// todo try with a refresh method
		console.log('DefaultCellRenderer', value);

		if (this.props.data.loading) {
			content = <Skeleton key="1" />;
		} else {
			content = [
				<QualityIndicator key="2" qualityIndex={value.quality} />,
				<AvroRenderer
					key="3"
					colDef={colDef}
					data={value}
					avroRenderer={avroRenderer}
					getComponent={getComponent}
				/>,
			];
		}

		return (
			<div aria-label={value.value} className={classNames(theme['td-cell'], 'td-cell')}>
				{content}
			</div>
		);
	}
}

DefaultCellRenderer.defaultProps = {
	avroRenderer: getAvroRenderer(),
	value: {},
	data: {},
};

DefaultCellRenderer.propTypes = {
	avroRenderer: DATAGRID_PROPTYPES.avroRenderer,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(AVRO_TYPES),
			}),
		}),
	}),
	value: PropTypes.object,
	data: PropTypes.object,
	getComponent: PropTypes.func,
};

export default DefaultCellRenderer;
