export const emptySchema = {
	id: 'empty_schema',
	name: 'Empty schema',
	elements: [],
};

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
	description: 'The birthday of the customer (optional)',
	mandatory: false,
};

export const element4 = {
	id: 'elem_4',
	name: 'Address',
	type: 'address',
	description: 'The address of the customer (mandatory)',
	mandatory: true,
};

export const schema1 = {
	id: '5df4g6ds4df564s',
	name: 'Customer info',
	elements: [element1, element2, element3, element4],
};

export const element5 = {
	id: 'elem_5',
	name: 'Name',
	type: 'string',
	description: 'The name of the client',
	mandatory: true,
};

export const element6 = {
	id: 'elem_6',
	name: 'Role',
	type: 'string',
	description: 'The role of the client',
	mandatory: false,
};

export const element7 = {
	id: 'elem_7',
	name: 'Birthday',
	type: 'date',
	description: 'The birthday of the client',
	mandatory: false,
};

export const element8 = {
	id: 'elem_8',
	name: 'Address',
	type: 'address',
	description: 'The address of the client',
	mandatory: true,
};

export const schema2 = {
	id: '1bf1dbw1d81w51',
	name: 'Client data',
	elements: [element5, element6, element7, element8],
};

export const mapping = [
	{
		source: element2,
		target: element5,
	},
	{
		source: element4,
		target: element8,
	},
];

export const Columns = {
	NAME: {
		id: 'name-col-id',
		key: 'name',
		label: 'Name',
	},
	TYPE: {
		id: 'type-col-id',
		key: 'type',
		label: 'Type',
	},
	DESC: {
		id: 'desc-col-id',
		key: 'description',
		label: 'Description',
	},
	MANDATORY: {
		id: 'mand-col-id',
		key: 'mandatory',
		label: '',
	},
};
