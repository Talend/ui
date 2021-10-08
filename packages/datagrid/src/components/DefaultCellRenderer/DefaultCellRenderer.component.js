import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Skeleton } from '@talend/react-components';

import { AVRO_TYPES } from '../../constants';
import DATAGRID_PROPTYPES from '../DataGrid/DataGrid.proptypes';

import QualityIndicator from './QualityIndicator.component';
import AvroRenderer from './AvroRenderer.component';
import theme from './DefaultCell.scss';

export const CELL_RENDERER_COMPONENT = 'cellRenderer';

function convertValue(value) {
	if (!value.toJS) {
		return value;
	}

	return value.toJS();
}

function DefaultCellRenderer({ avroRenderer, colDef, value, getComponent, data }) {
	let content;

	const plainValue = convertValue(value);

	if (data.loaded === false) {
		content = <Skeleton key="1" />;
	} else {
		content = [
			<QualityIndicator key="2" qualityIndex={plainValue.quality} />,
			<AvroRenderer
				key="3"
				colDef={colDef}
				data={plainValue}
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

DefaultCellRenderer.defaultProps = {
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

DefaultCellRenderer.theme = theme;

export default DefaultCellRenderer;
