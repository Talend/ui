
export function createSchema(name, elementName, size) {
  let elements = [];
  for (let i = 0; i < size; i += 1) {
    elements = elements.concat(elementName + '_' + i);
  }
  const schema = {name, elements};
  console.log(schema);
  return schema;
};

export function createMapping(inputSchema, outputSchema, shuffle) {
  let mapping = [];
  if (shuffle) {

  } else {
    for (let i = 0; i < inputSchema.elements.length; i += 1) {
      mapping = mapping.concat(
        {
          source: inputSchema.elements[i],
          target: outputSchema.elements[i],
        });
    }
  }
  return mapping;
};

export const inputSchema1 = {
  name: 'user_info',
  elements: [
    'firstname',
    'lastname',
    'street',
    'zip',
    'city',
    'state',
    'birthday',
    'company',
  ],
};

export const inputSchema2 = {
  name: 'user_info_full',
  elements: [
    'firstname',
    'lastname',
    'street',
    'zip',
    'city',
    'state',
    'birthday',
    'company',
    'favorite_color',
    'favorite_number',
    'favorite_movie',
    'favorite_song',
    'favorite_video_game',
    'favorite_dessert',
    'favorite_country',
    'favorite_football_player',
    'favorite_writer',
  ],
};

export const outputSchema1 = {
  name: 'customer_data',
  elements: [
    'name',
    'city',
    'state',
    'company',
    'birthday',
    'age',
    'identifier',
    'code',
  ],
};

export const outputSchema2 = {
  name: 'customer_data_full',
  elements: [
    'name',
    'city',
    'state',
    'company',
    'birthday',
    'age',
    'identifier',
    'code',
    'favorite_color',
    'favorite_number',
    'favorite_movie',
    'favorite_song',
    'favorite_video_game',
    'favorite_dessert',
    'favorite_country',
    'favorite_football_player',
    'favorite_writer',
  ],
};

export const emptyMapping = [];

export const initialMapping = [
	{
		source: 'lastname',
		target: 'name',
	},
  {
		source: 'lastname',
		target: 'identifier',
	},
	{
		source: 'city',
		target: 'city',
	},
	{
		source: 'zip',
		target: 'code',
	},
];
