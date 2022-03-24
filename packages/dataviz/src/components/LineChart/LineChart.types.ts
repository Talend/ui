import { LineProps, XAxisProps, YAxisProps, LegendProps } from 'recharts';

export type LineChartEntry = {
	xLabel: string;
	[key: string]: any;
};

export type LineOptions = {
	key: string;
	color: string;
	tooltipLabel?: string;
	legendLabel?: string;
	axis?: 'left' | 'right';
	rechartsOptions?: LineProps;
};

export type LineChartOptions = {
	width?: string,
	height?: string,
	margin?: {
		top: number,
		right: number,
		bottom: number,
		left: number,
	}
	tooltip?: {
		custom?: boolean,
		contentStyle?: any,
		formatter?: any,
	}
	legend?: {
		custom?: boolean
		rechartsOptions: LegendProps
	}
	xAxisOptions?: {
		rechartsOptions: XAxisProps;
	},
	leftYAxisOptions?: {
		hideUnitInAxis?: boolean;
		rechartsOptions: YAxisProps;
	}
	rightYAxisOptions?: {
		hideUnitInAxis?: boolean;
		rechartsOptions: YAxisProps;
	}
	showGridLines?: boolean;
};
