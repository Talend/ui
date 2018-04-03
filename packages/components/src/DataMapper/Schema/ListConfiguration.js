import ListRenderer from './SchemaRenderers/ListRenderer';
import SchemaConfiguration, { inputColumns, outputColumns } from './SchemaConfiguration';
import * as Constants from '../Constants';

export default class ListConfiguration extends SchemaConfiguration {

  getRenderer(side) {
    return ListRenderer;
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
