import get from 'lodash/get';

export default function cellDataGetter({ columnData, dataKey, rowData }) {
	if (typeof rowData.get === 'function') {
		return rowData.get(dataKey);
	}
	if (columnData && columnData.selector) {
		return get(rowData, columnData.selector);
	}
	return rowData[dataKey];
}
