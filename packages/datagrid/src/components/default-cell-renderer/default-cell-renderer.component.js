import React from 'react';
import classNames from 'classnames';

import QualityIndicator from './quality-indicator.component';
import AvroRenderer from './avro-renderer.component';
import theme from './default-cell.scss';

export const CELL_RENDERER_COMPONENT = 'cellRenderer';

export default function DefaultCellRenderer({ avroRenderer, colDef, value, getComponent }) {
	return (
		<div className={classNames(theme['td-cell'], 'td-cell')}>
			{value.quality <= 0 && <QualityIndicator tooltip="Incorrect value" value={value.quality} />}
			<AvroRenderer
				colDef={colDef}
				data={value}
				avroRenderer={avroRenderer}
				getComponent={getComponent}
			/>
		</div>
	);
}
