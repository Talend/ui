import classNames from 'classnames';
import styles from './LineChart.module.scss';

const getLineIconBackground = (color: string, dashed: boolean) => {
	if (dashed) {
		return `repeating-linear-gradient(to right, ${color} 0, ${color} 7px,transparent 6px,transparent 9px)`;
	}
	return color;
};

export interface LineChartLineIconProps {
	color: string;
	dashed?: boolean;
}

export const LineIcon = ({ color, dashed = false }: LineChartLineIconProps) => {
	return (
		<div
			className={classNames(styles['line-chart-line-icon'])}
			style={{ background: getLineIconBackground(color, dashed) }}
		/>
	);
};
