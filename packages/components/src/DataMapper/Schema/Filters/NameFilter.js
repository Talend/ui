import Filter from './Filter';

export const ID = 'name-filter';

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
		return dataAccessor.getElementName(element).match(this.name);
	}
}
