import Content from './Content.component';
import VirtualizedList from './VirtualizedList.component';
import { cellDictionary, headerDictionary } from './utils/dictionary';

import { ActionsColumn } from './CellActions';
import { BadgeColumn } from './CellBadge';
import { CheckboxColumn } from './CellCheckbox';
import { DatetimeColumn } from './CellDatetime';
import { TextIconColumn } from './CellTextIcon';
import { TitleColumn } from './CellTitle';
import { BooleanColumn } from './CellBoolean';
import { LabelColumn } from './CellLabel';
import { IconTextColumn } from './CellIconText';
import HeaderResizable from './HeaderResizable';
import RowCollapsiblePanel from './RowCollapsiblePanel';

import { listTypes, SORT_BY, SELECTION_MODE } from './utils/constants';
import * as rowUtils from './utils/gridrow';

// For compatibility
VirtualizedList.Content = Content;

VirtualizedList.Actions = ActionsColumn;
VirtualizedList.Badge = BadgeColumn;
VirtualizedList.Checkbox = CheckboxColumn;
VirtualizedList.Datetime = DatetimeColumn;
VirtualizedList.Text = Content;
VirtualizedList.TextIcon = TextIconColumn;
VirtualizedList.Title = TitleColumn;
VirtualizedList.Boolean = BooleanColumn;
VirtualizedList.Label = LabelColumn;
VirtualizedList.IconText = IconTextColumn;
VirtualizedList.RowCollapsiblePanel = RowCollapsiblePanel;
VirtualizedList.HeaderResizable = HeaderResizable;
VirtualizedList.cellDictionary = cellDictionary;
VirtualizedList.headerDictionary = headerDictionary;

VirtualizedList.rowUtils = rowUtils;

VirtualizedList.LIST_TYPES = listTypes;
VirtualizedList.SORT_BY = SORT_BY;
VirtualizedList.SELECTION_MODE = SELECTION_MODE;

export default VirtualizedList;

// TODO 6.0: remove those exports, they are attached to
export { cellDictionary, headerDictionary };
export * from './utils/constants';
