export type LineChartEntry = {
	xLabel: string | number | Date;
	[key: string]: string | number | Date;
};

export type LineStatus = 'active' | 'inactive' | 'highlighted';

export type LineOptions = {
	key: string;
	color: string;
	tooltipLabel?: string;
	legendLabel?: string;
	axis?: 'left' | 'right';
	dashed?: boolean;
	tooltipFormatter?: (value: any) => string;
	status?: LineStatus;
};

export type LineChartOptions = {
	width?: string | number;
	height?: string | number;
	margin?: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	tooltip?: {
		hide?: boolean;
		showInnactives: boolean;
	};
	legend?: {
		hide?: boolean;
		verticalAlign?: 'top' | 'bottom';
		horizontalAlign?: 'left' | 'center' | 'right';
		showInactives?: boolean;
	};
	xAxisOptions?: {
		domain?: number[];
		clipDomain?: boolean;
		type?: 'number' | 'category';
		interval: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
		manualTicks?: Array<string | number>;
		horizontalOffset?: number;
		verticalOffset?: number;
		formatter?: (value: any) => string;
		tooltipFormatter?: (value: any) => string;
	};
	leftYAxisOptions?: {
		type?: 'number' | 'category';
		domain?: any[];
		unit?: string | number;
		hideUnitInAxis?: boolean;
		manualTicks?: Array<string | number>;
		horizontalOffset?: number;
		verticalOffset?: number;
		formatter?: (value: any) => string;
	};
	rightYAxisOptions?: {
		hide: boolean;
		type?: 'number' | 'category';
		domain?: any[];
		unit?: string | number;
		hideUnitInAxis?: boolean;
		manualTicks?: Array<string | number>;
		horizontalOffset?: number;
		verticalOffset?: number;
		formatter?: (value: any) => string;
	};
	showGridLines?: boolean;
};
