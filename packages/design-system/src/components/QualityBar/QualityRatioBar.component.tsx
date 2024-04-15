import type { MouseEvent } from 'react';

import classNames from 'classnames';

import { RatioBarLine } from '../RatioBar';
import { EnrichedQualityType, QualityType } from './QualityBar.types';

import styles from './QualityRatioBar.module.scss';

type SpecificQualityBarProps = {
	percentage: number;
	value: number;
	getDataFeature?: (type: EnrichedQualityType) => string;
	onClick?: (e: MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
	tooltipLabel?: string;
};

type QualityRatioBarProps = SpecificQualityBarProps & {
	type: EnrichedQualityType;
};

const QualityRatioBar = ({ onClick, type, getDataFeature, ...props }: QualityRatioBarProps) => {
	const specificProps = {
		className: classNames(styles['quality-ratio-bar'], styles[`quality-ratio-bar--${type}`]),
		onClick: onClick ? (e: MouseEvent<HTMLElement>) => onClick(e, { type }) : undefined,
		dataFeature: getDataFeature ? getDataFeature(type) : null,
		dataTestId: `quality-bar-${type}`,
	};

	return <RatioBarLine {...props} {...specificProps} />;
};

export const QualityInvalidLine = ({ percentage, value, ...rest }: SpecificQualityBarProps) => (
	<QualityRatioBar percentage={percentage} value={value} type={QualityType.INVALID} {...rest} />
);

export const QualityValidLine = ({ percentage, value, ...rest }: SpecificQualityBarProps) => (
	<QualityRatioBar percentage={percentage} value={value} type={QualityType.VALID} {...rest} />
);

export const QualityEmptyLine = ({ percentage, value, ...rest }: SpecificQualityBarProps) => (
	<QualityRatioBar percentage={percentage} value={value} type={QualityType.EMPTY} {...rest} />
);

export const QualityNotApplicableLine = ({
	percentage,
	value,
	...rest
}: SpecificQualityBarProps) => (
	<QualityRatioBar percentage={percentage} value={value} type={QualityType.NA} {...rest} />
);

export const QualityPlaceholderLine = (props: Omit<SpecificQualityBarProps, 'onClick'>) => (
	<QualityRatioBar {...props} type="placeholder" />
);
