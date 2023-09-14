import { HierarchicalSample, QualityStatus } from '../CommonDataViewer.types';

export const mockEmployeesRecords: HierarchicalSample = [
	{
		fields: [
			{
				name: 'employees',
				items: [
					{
						fields: [
							{
								name: 'name',
								fields: [
									{
										name: 'firstName',
										value: 'John',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
									{
										name: 'lastName',
										value: 'Doe',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
								],
							},
							{
								name: 'country',
								value: 'Sweden',
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
								name: 'name',
								fields: [
									{
										name: 'firstName',
										value: 'Anna',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
									{
										name: 'lastName',
										value: 'Smith',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
								],
							},
							{
								name: 'country',
								value: 'France',
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
								name: 'name',
								fields: [
									{
										name: 'firstName',
										value: 'Peter',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
									{
										name: 'lastName',
										value: 'Jones',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
								],
							},
							{
								name: 'country',
								value: 'NA',
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
				name: 'vehicles',
				items: [
					{
						fields: [
							{
								name: 'type',
								value: 'car',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'model',
								value: 'Honda Civic',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'insurance',
								fields: [
									{
										name: 'company',
										value: 'ABC Insurance',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
									{
										name: 'policy_num',
										value: '12345',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
								],
							},
							{
								name: 'maintenance',
								items: [
									{
										fields: [
											{
												name: 'date',
												value: '07-17-2017',
												quality: {
													aggregated: QualityStatus.Valid,
													dqType: QualityStatus.Valid,
													dqRules: [],
												},
											},
											{
												name: 'desc',
												value: 'oil change',
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
												name: 'date',
												value: '01-03-2018',
												quality: {
													aggregated: QualityStatus.Valid,
													dqType: QualityStatus.Valid,
													dqRules: [],
												},
											},
											{
												name: 'desc',
												value: 'new tires',
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
								name: 'type',
								value: 'truck',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'model',
								value: 'Dodge Ram',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'insurance',
								fields: [
									{
										name: 'company',
										value: 'ABC Insurance',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
									{
										name: 'policy_num',
										value: '12345',
										quality: {
											aggregated: QualityStatus.Valid,
											dqType: QualityStatus.Valid,
											dqRules: [],
										},
									},
								],
							},
							{
								name: 'maintenance',
								items: [
									{
										fields: [
											{
												name: 'date',
												value: '08-27-2017',
												quality: {
													aggregated: QualityStatus.Valid,
													dqType: QualityStatus.Valid,
													dqRules: [],
												},
											},
											{
												name: 'desc',
												value: 'new tires',
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
												name: 'date',
												value: '01-08-2018',
												quality: {
													aggregated: QualityStatus.Valid,
													dqType: QualityStatus.Valid,
													dqRules: [],
												},
											},
											{
												name: 'desc',
												value: 'oil change',
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
				],
			},
			{
				name: 'country',
				items: [
					{
						fields: [
							{
								name: 'code',
								value: 'FR',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'label',
								value: 'France',
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
								name: 'code',
								value: 'DE',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'label',
								value: 'Germany',
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
