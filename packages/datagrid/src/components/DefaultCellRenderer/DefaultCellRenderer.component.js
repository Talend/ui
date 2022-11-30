import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { SkeletonParagraph } from '@talend/design-system';

import { AVRO_TYPES } from '../../constants/avro-type.constant';
import AvroRenderer from './AvroRenderer.component';
import DefaultCellQualityIndicator from './DefaultCellQualityIndicator.component';

import theme from './DefaultCell.module.scss';

function DefaultCellRenderer({ value, data, ...rest }) {
	return (
		<div aria-label={value?.value} className={classNames(theme['td-cell'], 'td-cell')}>
			{data.loaded === false ? (
				<SkeletonParagraph size="M" />
			) : (
				<>
					<DefaultCellQualityIndicator value={value} />
					<AvroRenderer value={value.value} {...rest} />
				</>
			)}
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

export default DefaultCellRenderer;
