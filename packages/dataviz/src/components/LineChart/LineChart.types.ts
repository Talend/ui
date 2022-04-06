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
	dashed?: boolean;
};

export type LineChartOptions = {
	width?: string | number,
	height?: string | number,
	margin?: {
		top: number,
		right: number,
		bottom: number,
		left: number,
	},
	hideTooltip?: boolean;
	legend?: {
		hide?: boolean,
		verticalAlign: 'top' | 'bottom',
		horizontalAlign: 'left' | 'center' | 'right',
	}
	xAxisOptions?: {
		interval: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
		horizontalOffset: number;
	},
	leftYAxisOptions?: {
		type?: 'number' | 'category';
		domain?: any[];
		unit?: string | number
		hideUnitInAxis?: boolean;
	}
	rightYAxisOptions?: {
		hide: boolean;
		type?: 'number' | 'category';
		domain?: any[];
		unit?: string | number
		hideUnitInAxis?: boolean;
	}
	showGridLines?: boolean;
};
