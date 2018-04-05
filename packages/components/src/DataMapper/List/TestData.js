import RowLabel from './RowLabel';
import MandatoryField from './MandatoryField';

export const element1 = {
	id: 'elem_1',
	name: 'element 1',
	type: 'string',
	description: 'bla bla bla',
  mandatory: false,
};

export const element2 = {
	id: 'elem_2',
	name: 'element 2',
	type: 'string',
	description: 'This element is mandatory',
  mandatory: true,
};

export const KEYS = {
  NAME: 'name',
  TYPE: 'type',
  DESC: 'desc',
};

export const dataKeys = [KEYS.NAME, KEYS.TYPE, KEYS.DESC];

export const classNameProvider = {
  get(element, key) {
    if (element && key) {
			return `classname-of-(${element.id},${key})`;
		} else if (element) {
			return `classname-of-(${element.id})`;
		}
		return `classname-of-list`;
  },
  onDragOver(status) {
  },
};

export const rowDataGetter = {
  getId(element) {
    return element.id;
  },
  getData(element, key) {
		switch (key) {
			case KEYS.NAME:
				return {
					value: element.name,
					mandatory: element.mandatory,
				};
			case KEYS.TYPE:
				return element.type;
			case KEYS.DESC:
				return element.description;
			default:
				return `No data available for ${key}`;
		}
	},
};

export const rowRenderers = {
  getComponent(key) {
		switch (key) {
			case KEYS.NAME:
				return MandatoryField;
			default:
				return RowLabel;
		}
	},
};
