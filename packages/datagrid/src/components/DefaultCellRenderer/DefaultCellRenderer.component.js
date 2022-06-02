import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SkeletonParagraph } from '@talend/design-system';

import { AVRO_TYPES } from '../../constants';

import QualityIndicator from './QualityIndicator.component';
import AvroRenderer from './AvroRenderer.component';
import theme from './DefaultCell.scss';

function convertValue(value) {
	if (!value.toJS) {
		return value;
	}

	return value.toJS();
}

function DefaultCellRenderer({ avroRenderer, colDef, value, data }) {
	let content;

	const plainValue = convertValue(value);

	if (data.loaded === false) {
		content = <SkeletonParagraph size="M" />;
	} else {
		content = [
			<QualityIndicator key="2" qualityIndex={plainValue.quality} />,
			<AvroRenderer key="3" colDef={colDef} data={plainValue} avroRenderer={avroRenderer} />,
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
	avroRenderer: PropTypes.object,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(AVRO_TYPES),
			}),
		}),
	}),
	value: PropTypes.object,
	data: PropTypes.object,
};

DefaultCellRenderer.theme = theme;

export default DefaultCellRenderer;
