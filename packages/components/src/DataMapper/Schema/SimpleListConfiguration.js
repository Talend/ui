import SimpleListRenderer from './SchemaRenderers/SimpleListRenderer';
import SchemaConfiguration, { inputColumns, outputColumns } from './SchemaConfiguration';
import * as Constants from '../Constants';

export default class SimpleListConfiguration extends SchemaConfiguration {

  getRenderer(side) {
    switch (side) {
      case Constants.MappingSide.INPUT:
        return SimpleListRenderer;
      case Constants.MappingSide.OUTPUT:
        return SimpleListRenderer;
      default:
        return null;
    }
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
