import Content from './Content.component';
import VirtualizedList from './VirtualizedList.component';

import { ActionsColumn } from './CellActions';
import { BadgeColumn } from './CellBadge';
import { CheckboxColumn } from './CellCheckbox';
import { DatetimeColumn } from './CellDatetime';
import { TextIconColumn } from './CellTextIcon';
import { TitleColumn } from './CellTitle';
import { BooleanColumn } from './CellBoolean';
import { LabelColumn } from './CellLabel';
import { IconTextColumn } from './CellIconText';
import * as gridrow from './utils/gridrow';

export { cellDictionary, headerDictionary } from './utils/dictionary';
export * from './utils/constants';

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

VirtualizedList.gridrow = gridrow;

export default VirtualizedList;
