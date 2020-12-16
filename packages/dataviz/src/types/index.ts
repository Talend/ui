export type Range = {
	min: number;
	max: number;
	excludeMax?: boolean;
};

export enum DataType {
	DATE = 'DATE',
	NUMBER = 'NUMBER',
}
