export type LineChartEntry = {
	xLabel: any;
	[key: string]: any;
};

export type LineOptions = {
	key: string;
	color: string;
	tooltipLabel?: string;
	legendLabel?: string;
	axis?: 'left' | 'right';
	dashed?: boolean;
	tooltipFormatter?: (value: any) => string;
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
		formatter?: (value: any) => string;
		tooltipFormatter?: (value: any) => string;
	},
	leftYAxisOptions?: {
		type?: 'number' | 'category';
		domain?: any[];
		unit?: string | number
		hideUnitInAxis?: boolean;
		formatter?: (value: any) => string;
	}
	rightYAxisOptions?: {
		hide: boolean;
		type?: 'number' | 'category';
		domain?: any[];
		unit?: string | number
		hideUnitInAxis?: boolean;
		formatter?: (value: any) => string;
	}
	showGridLines?: boolean;
};
