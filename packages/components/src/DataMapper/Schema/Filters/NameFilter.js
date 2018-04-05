import Filter from './Filter';

export const ID = 'name-filter';

/**
 * A filter based on a name.
 */
export default class NameFilter extends Filter {
	constructor(active) {
		super(ID, active);
	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return name;
	}

	select(dataAccessor, schema, element) {
		const elemName = dataAccessor.getElementName(element);
		return elemName.match(this.name) || elemName.toLowerCase().match(this.name.toLowerCase());
	}
}
