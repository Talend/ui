import RowLarge, { rowType as rowLargeType } from '../RowLarge';
import RowCollapsiblePanel, { rowType as rowCollapsiblePanelType } from '../RowCollapsiblePanel';

import CellActionsRenderer, { cellType as cellActionsType } from '../CellActions';
import CellCheckboxRenderer, { cellType as cellCheckboxType } from '../CellCheckbox';
import CellTitleRenderer, { cellType as cellTitleType } from '../CellTitle';
import CellBadgeRenderer, { cellType as cellBadgeType } from '../CellBadge';
import CellLabelRenderer, { cellType as cellLabelType } from '../CellLabel';
import CellDatetimeRenderer, { cellType as cellDatetimeType } from '../CellDatetime';
import CellTextIconRenderer, { cellType as cellTextType } from '../CellTextIcon';
import CellMappedDataRenderer, { cellType as cellMappedDataType } from '../CellMappedData';
import HeaderIconRenderer, { headerType as headerIconType } from '../HeaderIcon';
import HeaderResizable, { headerType as headerResizableType } from '../HeaderResizable';

/** Cell renderers dictionary */
export const cellDictionary = {
	[cellActionsType]: CellActionsRenderer,
	[cellCheckboxType]: CellCheckboxRenderer,
	[cellTitleType]: CellTitleRenderer,
	[cellBadgeType]: CellBadgeRenderer,
	[cellLabelType]: CellLabelRenderer,
	[cellTextType]: CellTextIconRenderer,
	[cellDatetimeType]: CellDatetimeRenderer,
	[cellMappedDataType]: CellMappedDataRenderer,
};

/** Row renderers dictionary */
export const rowDictionary = {
	[rowLargeType]: RowLarge,
	[rowCollapsiblePanelType]: RowCollapsiblePanel,
};

export const headerDictionary = {
	[headerIconType]: HeaderIconRenderer,
	[headerResizableType]: HeaderResizable,
};
