import TableRenderer from './SchemaRenderers/TableRenderer';
import SchemaConfiguration, { inputColumns, outputColumns } from './SchemaConfiguration';
import * as Constants from '../Constants';

export default class TableConfiguration extends SchemaConfiguration {
	getRenderer(side) {
		return TableRenderer;
	}

	getColumns(side) {
		switch (side) {
			case Constants.MappingSide.INPUT:
				return inputColumns;
			case Constants.MappingSide.OUTPUT:
				return outputColumns;
			default:
				return [];
		}
	}

	withHeader(side) {
		return false;
	}
}
