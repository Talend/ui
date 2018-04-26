import SimpleListRenderer from './SchemaRenderers/SimpleListRenderer';
import ListRenderer from './SchemaRenderers/ListRenderer';
import SchemaConfiguration, { inputColumns, outputColumns } from './SchemaConfiguration';
import * as Constants from '../Constants';

export default class SimpleListConfiguration extends SchemaConfiguration {

  getRenderer(side) {
    switch (side) {
      case Constants.MappingSide.INPUT:
        return SimpleListRenderer;
      case Constants.MappingSide.OUTPUT:
        return ListRenderer;
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
