import get from 'lodash/get';
import { defaultTableCellDataGetter } from 'react-virtualized';

export default function cellDataGetter(info) {
	const selector = get(info, 'columnData.selector');
	if (selector) {
		return get(info.rowData, selector);
	}
	return defaultTableCellDataGetter(info);
}
