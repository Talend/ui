
export const element1 = {
	id: 'elem_1',
	name: 'Firstname',
	type: 'string',
	description: 'The firstname of the customer (optional)',
	mandatory: false,
};

export const element2 = {
	id: 'elem_2',
	name: 'Lastname',
	type: 'string',
	description: 'The lastname of the customer (mandatory)',
	mandatory: true,
};

export const element3 = {
	id: 'elem_3',
	name: 'Birthday',
	type: 'date',
	description: 'Thje birthday of the customer (optional)',
	mandatory: false,
};

export const element4 = {
	id: 'elem_4',
	name: 'Address',
	type: 'address',
	description: 'The address of the customer (mandatory)',
	mandatory: true,
};

export const schema = {
	id: '5df4g6ds4df564s',
	name: 'Customer info',
	elements: [element1, element2, element3, element4],
};
