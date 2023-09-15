import { HierarchicalSample, QualityStatus } from '../CommonDataViewer.types';

export const mockDonutsRecords: HierarchicalSample = [
	{
		fields: [
			{
				name: 'id',
				value: '0001',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Cake',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.55',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Chocolate',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1003',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Blueberry',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1004',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: "Devil's Food",
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Cake', 'Chocolate', 'Blueberry', 'Tasty'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'None',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5005',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Sugar',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5007',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Powdered Sugar',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5006',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Chocolate with Sprinkles',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5003',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Chocolate',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5004',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Maple',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0002',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Jelly',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.75',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1003',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Blueberry',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Jelly', 'Blueberry', 'Sweet'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '9', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5005',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Sugar',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5008',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Strawberry Jelly',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0003',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Cinnamon',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.65',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1004',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: "Devil's Food",
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Cinnamon', "Devil's Food", 'Spicy'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '2', '3', '4'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5005',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Sugar',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5009',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Cinnamon Sugar',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0004',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Vanilla Sprinkle',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.7',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Chocolate',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Vanilla Sprinkle', 'Chocolate', 'Sweet'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '9', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5006',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Chocolate with Sprinkles',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0005',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Apple Fritter',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.8',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '1003',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Blueberry',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Apple Fritter', 'Blueberry', 'Fruit'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '9', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5005',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Sugar',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5010',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Apple Bits',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0006',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Peanut Butter',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.85',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Peanut Butter', 'Creamy', 'Nutty'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '13', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5011',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Peanut Butter Drizzle',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0007',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Raspberry Filled',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.7',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Raspberry Filled', 'Fruit', 'Sweet'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '13', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5008',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Raspberry Filling',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0008',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Lemon Twist',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.75',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Lemon Twist', 'Citrus', 'Tangy'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '13', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5012',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Lemon Zest',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0009',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Pistachio Delight',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.8',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Pistachio Delight', 'Nutty', 'Sweet'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '13', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5013',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Crushed Pistachios',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0010',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Coconut Cream',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.75',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'batter',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '1001',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Regular',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
			{
				name: 'labels',
				value: ['Coconut Cream', 'Coconut', 'Creamy'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'categories',
				value: ['1', '8', '9', '10'],
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'topping',
				items: [
					{
						fields: [
							{
								name: 'id',
								value: '5002',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Glazed',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						fields: [
							{
								name: 'id',
								value: '5014',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'type',
								value: 'Coconut Flakes',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
				],
			},
		],
	},
];
