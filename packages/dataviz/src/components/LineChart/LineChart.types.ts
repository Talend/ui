import { LineProps, XAxisProps, YAxisProps, LegendProps } from "recharts";

export type LineChartEntry = {
	xLabel: string;
	[key: string]: any;
};

export type LineOptions = {
	key: string;
	color: string;
	tooltipLabel?: string;
	axis?: "left" | "right";
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
		constentStyle?: any,
		formatter?: any,
	}
	legend?: {
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
