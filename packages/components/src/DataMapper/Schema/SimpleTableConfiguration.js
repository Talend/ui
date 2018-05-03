import SimpleTableRenderer from './SchemaRenderers/SimpleTableRenderer';
import SchemaConfiguration, { inputColumns, outputColumns } from './SchemaConfiguration';
import * as Constants from '../Constants';

export default class SimpleTableConfiguration extends SchemaConfiguration {

  getRenderer(side) {
    return SimpleTableRenderer;
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
}
