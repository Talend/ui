import DefaultRenderer from './SchemaRenderers/DefaultRenderer';
import * as Constants from '../Constants';

export const inputColumns = [
  Constants.Schema.DATA_KEYS.TYPE,
	Constants.Schema.DATA_KEYS.NAME,
];

export const outputColumns = [
	Constants.Schema.DATA_KEYS.NAME,
  Constants.Schema.DATA_KEYS.TYPE,
	Constants.Schema.DATA_KEYS.DESC,
];

export default class SchemaConfiguration {

  getRenderer(side) {
    return DefaultRenderer;
  }

  getColumns(side) {
    return [];
  }

}
