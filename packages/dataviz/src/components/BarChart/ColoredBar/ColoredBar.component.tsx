import React from 'react';
import { Customized, Rectangle, RectangleProps } from 'recharts';
import { FormatValue } from '@talend/react-components';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from './ColoredBar.component.scss';

export enum ChartStyle {
	VALUE = 'value',
	PATTERN = 'pattern',
}

type BarRenderProps = RectangleProps & {
	index?: number;
	focusedBarIndex: number | null;
	barType: 'primary' | 'secondary';
	chartStyle: ChartStyle;
};
function ColoredBar({
	height,
	width,
	y,
	index,
	barType,
	focusedBarIndex,
	chartStyle,
	...props
}: BarRenderProps) {
	const MIN_BAR_SIZE = 3;
	const correctedHeight = !height ? 0 : Math.max(MIN_BAR_SIZE, height);
	return (
		<Rectangle
			{...props}
			className={classNames(
				styles[`colored-bar--${chartStyle}`],
				{
					[styles['colored-bar--hover']]: focusedBarIndex === index,
				},
				styles[`colored-bar__${barType}-bar`],
			)}
			width={!width ? 0 : Math.max(MIN_BAR_SIZE, width)}
			height={correctedHeight}
			y={!(height && y) ? y : y - (correctedHeight - height)}
		/>
	);
}

type ColorBarLabelProps = any & {
	chartStyle: ChartStyle;
};
function ColoredBarLabel({ focusedBarIndex, payload, chartStyle, ...props }: ColorBarLabelProps) {
	const { t } = useTranslation();
	return (
		<Customized
			component={() => (
				<foreignObject
					className={styles['colored-bar__label-container']}
					x={props.x}
					y={props.y - 10}
					height={20}
					width="100%"
				>
					<FormatValue
						className={classNames(
							styles[`colored-bar--${chartStyle}`],
							{
								[styles['colored-bar--hover']]: focusedBarIndex === payload.index,
							},
							styles['colored-bar__label'],
						)}
						value={payload?.value || t('EMPTY', 'Empty')}
						t={t}
					/>
				</foreignObject>
			)}
		/>
	);
}

export default Object.assign(ColoredBar, { Label: ColoredBarLabel });
