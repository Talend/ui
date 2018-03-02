
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
		source: 'city',
		target: 'city',
	},
	{
		source: 'zip',
		target: 'code',
	},
];
