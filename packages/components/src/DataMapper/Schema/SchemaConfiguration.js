
const NAME = 'name';
const TYPE = 'type';
const DESCRIPTION = 'description';
const MANDATORY = 'mandatory';

const inputColumns = [ TYPE, NAME ];

const outputColumns = [ NAME, TYPE, DESC ];

export default class SchemaConfiguration {

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

	getClassNameProvider(side) {

	}

	getRowRenderer(side) {

	}

	getHeaderRenderer(side) {

	}

}
