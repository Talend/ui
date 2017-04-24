import VirtualizedList from './VirtualizedList.component';
import CellActionsRenderer, { cellType as cellActionsType } from './CellActions';
import CellTitleRenderer, { cellType as cellTitleType } from './CellTitle';

export const cellDictionnary = {
	[cellActionsType]: CellActionsRenderer,
	[cellTitleType]: CellTitleRenderer,
};

export default VirtualizedList;
