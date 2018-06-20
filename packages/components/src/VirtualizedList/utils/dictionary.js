import RowLarge, { rowType as rowLargeType } from '../RowLarge';

import CellActionsRenderer, { cellType as cellActionsType } from '../CellActions';
import CellCheckboxRenderer, { cellType as cellCheckboxType } from '../CellCheckbox';
import CellTitleRenderer, { cellType as cellTitleType } from '../CellTitle';
import CellBadgeRenderer, { cellType as cellBadgeType } from '../CellBadge';
import CellDatetimeRenderer, { cellType as cellDatetimeType } from '../CellDatetime';
import CellTextIconRenderer, { cellType as cellTextType } from '../CellTextIcon';
import HeaderIconRenderer, { headerType as headerIconType } from '../HeaderIcon';

/** Cell renderers dictionary */
export const cellDictionary = {
	[cellActionsType]: CellActionsRenderer,
	[cellCheckboxType]: CellCheckboxRenderer,
	[cellTitleType]: CellTitleRenderer,
	[cellBadgeType]: CellBadgeRenderer,
	[cellTextType]: CellTextIconRenderer,
	[cellDatetimeType]: CellDatetimeRenderer,
};

/** Row renderers dictionary */
export const rowDictionary = {
	[rowLargeType]: RowLarge,
};

export const headerDictionary = {
	[headerIconType]: HeaderIconRenderer,
};
