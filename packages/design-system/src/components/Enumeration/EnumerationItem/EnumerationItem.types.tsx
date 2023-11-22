import { EnumerationMode } from '../Enumeration.types';

export interface EnumerationItemProps {
	isToAnimate: boolean;
	mode: EnumerationMode;
	onChange: (item: string) => void;
	onRemove?: (entries: string[]) => void;
	selectedItems: string[];
	setSelectedItems: (selectedItems: string[]) => void;
	value: string;
}
