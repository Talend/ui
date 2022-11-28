import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { SkeletonParagraph } from '@talend/design-system';
import * as RuleCore from '@talend/rule-core';

import { AVRO_TYPES } from '../../constants/avro-type.constant';
import AvroRenderer from './AvroRenderer.component';

import theme from './DefaultCell.module.scss';

const { QualityDetailsIndicator } = RuleCore.components;

function DefaultCellQualityIndicator({ value }) {
	const { t } = useTranslation();
	const { quality } = value;

	if (quality === 1) {
		return null;
	}

	const constraint =
		quality === -1
			? {
					constraintLabel: t(
						'INVALID_CELL_CONSTAINT_LABEL_INVALID',
						'The value does not comply with the column semantic type or rule',
					),
					constraintStatus: 'INVALID',
			  }
			: {
					constraintLabel: t('INVALID_CELL_CONSTAINT_LABEL_EMPTY', '@todo TBD The value is empty'),
					constraintStatus: 'EMPTY',
			  };

	return (
		<QualityDetailsIndicator
			placement="bottom"
			qualityIndex={quality}
			indicatorLabel="@todo TBD"
			invalidConstraint={[constraint]}
		/>
	);
}

DefaultCellQualityIndicator.propTypes = {
	value: PropTypes.shape({
		quality: PropTypes.oneOf([-1, 0, 1]),
	}),
};

function DefaultCellRenderer({ value, data, ...rest }) {
	return (
		<div aria-label={value?.value} className={classNames(theme['td-cell'], 'td-cell')}>
			{data.loaded === false ? (
				<SkeletonParagraph size="M" />
			) : (
				<>
					<QualityDetailsIndicator
						placement="bottom"
						qualityIndex={value.quality}
						indicatorLabel=""
						invalidConstraint={[
							{
								constraintLabel: 'string',
								constraintStatus: value.quality === 0 ? 'EMPTY' : 'INVALID',
							},
						]}
					/>
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
