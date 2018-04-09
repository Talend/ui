import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Skeleton } from '@talend/react-components';

import DATAGRID_PROPTYPES from '../DataGrid/DataGrid.proptypes';

import QualityIndicator from './QualityIndicator.component';
import AvroRenderer from './AvroRenderer.component';
import theme from './DefaultCell.scss';

export const CELL_RENDERER_COMPONENT = 'cellRenderer';

export default function DefaultCellRenderer({ avroRenderer, colDef, value, getComponent, data }) {
	let content;

	if (data.loading) {
		content = <Skeleton />;
	} else {
		content = [
			<QualityIndicator qualityIndex={value.quality} />,
			<AvroRenderer
				colDef={colDef}
				data={value}
				avroRenderer={avroRenderer}
				getComponent={getComponent}
			/>,
		];
	}

	return <div className={classNames(theme['td-cell'], 'td-cell')}>{content}</div>;
}

DefaultCellRenderer.defaultProps = {
	value: {},
	data: {},
};

DefaultCellRenderer.propTypes = {
	avroRenderer: DATAGRID_PROPTYPES.avroRenderer,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(['boolean', 'date', 'int', 'string']),
			}),
		}),
	}),
	value: PropTypes.object,
	data: PropTypes.object,
	getComponent: PropTypes.func,
};
