export const Filters = {
	WITH: true,
	WITHOUT: false,
};

export const element1 = {
	id: 'elem_1',
	name: 'Firstname',
	type: 'string',
	description: 'bla bla bla',
	mandatory: false,
};

export const element2 = {
	id: 'elem_2',
	name: 'Lastname',
	type: 'string',
	description: 'bla bla bla',
	mandatory: true,
};

export const element3 = {
	id: 'elem_3',
	name: 'Birthday',
	type: 'date',
	description: 'bla bla bla',
	mandatory: false,
};

export const element4 = {
	id: 'elem_4',
	name: 'Address',
	type: 'address',
	description: 'bla bla bla',
	mandatory: true,
};

export const schema = {
	id: '5df4g6ds4df564s',
	name: 'schema',
	elements: [element1, element2, element3, element4],
};
