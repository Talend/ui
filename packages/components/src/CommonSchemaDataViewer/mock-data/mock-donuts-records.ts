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
				value: 'Cinnamon Roll',
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
				],
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
				value: 'Jelly Filled',
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
				value: 'Old-Fashioned',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'ppu',
				value: '0.6',
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
				value: 'Glazed Twist',
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
				value: 'Strawberry Filled',
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
				value: 'Cream Filled',
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
				value: 'Raspberry Filled',
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
				value: 'Pumpkin Spice',
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
				],
			},
		],
	},
	{
		fields: [
			{
				name: 'id',
				value: '0011',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Double Chocolate',
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
				],
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
				value: '0012',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'type',
				value: 'donut',
				quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
			},
			{
				name: 'name',
				value: 'Apple Crisp',
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
];
