import { SampleArray } from '../CommonDataViewer.types';

export type RecordArrayProps = {
	array: SampleArray;
	path: string[];
};

export function RecordArray({ array, path }: RecordArrayProps) {
	return <div>{array.name}</div>;
}
