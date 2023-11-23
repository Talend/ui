import { EnumerationMode } from '../Enumeration.types';

export interface EnumerationItemProps {
	isToAnimate: boolean;
	mode: EnumerationMode;
	onEdit: (value: string) => void;
	onRemove?: (values: string[]) => void;
	selectedItems: string[];
	setSelectedItems: (selectedItems: string[]) => void;
	value: string;
}
