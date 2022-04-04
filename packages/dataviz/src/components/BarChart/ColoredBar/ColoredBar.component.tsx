import React from 'react';
import { Customized, Rectangle, RectangleProps } from 'recharts';
import { FormatValue } from '@talend/react-components';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from './ColoredBar.component.scss';
import { ChartStyle } from '../../../types';

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
	...rest
}: BarRenderProps) {
	const MIN_BAR_SIZE = 3;
	const correctedHeight = !height ? 0 : Math.max(MIN_BAR_SIZE, height);
	const props: RectangleProps = {
		x: rest.x,
		y: !(height && y) ? y : y - (correctedHeight - height),
		width: !width ? 0 : Math.max(MIN_BAR_SIZE, width),
		height: correctedHeight,
	};
	return (
		<Rectangle
			x={props.x}
			y={props.y}
			width={props.width}
			height={props.height}
			className={classNames(
				styles[`colored-bar--${chartStyle}`],
				{
					[styles['colored-bar--hover']]: focusedBarIndex === index,
				},
				styles[`colored-bar__${barType}-bar`],
			)}
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
