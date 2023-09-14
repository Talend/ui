import { CommonSchemaSampled } from '../CommonDataViewer.types';

export const mockDonutsSchema: CommonSchemaSampled = {
	name: 'Record_8_5312720653861358315',
	type: 'record',
	namespace: 'org.talend.sdk.component.schema.generated',
	fields: [
		{
			name: 'id',
			type: [
				'null',
				{
					type: 'string',
					dqType: 'ST2 INTS',
					dqTypeId: 'ST2 INTS',
					dqNativeType: 'INTEGER',
					isForced: false,
					isNativeForced: false,
				},
			],
		},
		{
			name: 'type',
			type: [
				'null',
				{
					type: 'string',
					dqType: '',
					dqTypeId: '',
					dqNativeType: 'STRING',
					isForced: false,
					isNativeForced: false,
				},
			],
		},
		{
			name: 'name',
			type: [
				'null',
				{
					type: 'string',
					dqType: '',
					dqTypeId: '',
					dqNativeType: 'STRING',
					isForced: false,
					isNativeForced: false,
				},
			],
		},
		{
			name: 'ppu',
			type: [
				'null',
				{
					type: 'double',
					dqType: 'GPS',
					dqTypeId: 'doubles',
					dqNativeType: 'DOUBLE',
					isForced: false,
					isNativeForced: false,
				},
			],
		},
		{
			name: 'batter',
			type: [
				'null',
				{
					type: 'array',
					items: [
						'null',
						{
							type: 'record',
							namespace: 'org.talend.sdk.component.schema.generated',
							fields: [
								{
									name: 'id',
									type: [
										'null',
										{
											type: 'string',
											dqType: 'ST2 INTS',
											dqTypeId: 'ST2 INTS',
											dqNativeType: 'INTEGER',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
								{
									name: 'type',
									type: [
										'null',
										{
											type: 'string',
											dqType: '',
											dqTypeId: '',
											dqNativeType: 'STRING',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
							],
							'talend.fields.order': 'id,type',
						},
					],
				},
			],
		},
		{
			name: 'labels',
			type: [
				'null',
				{
					type: 'array',
					items: [
						'null',
						{
							type: 'string',
							dqType: '',
							dqTypeId: '',
							dqNativeType: 'STRING',
							isForced: false,
							isNativeForced: false,
						},
					],
				},
			],
		},
		{
			name: 'categories',
			type: [
				'null',
				{
					type: 'array',
					items: [
						'null',
						{
							type: 'long',
							dqType: 'ST2 INTS',
							dqTypeId: 'ST2 INTS',
							dqNativeType: 'INTEGER',
							isForced: false,
							isNativeForced: false,
						},
					],
				},
			],
		},
		{
			name: 'topping',
			type: [
				'null',
				{
					type: 'array',
					items: [
						'null',
						{
							type: 'record',
							namespace: 'org.talend.sdk.component.schema.generated',
							fields: [
								{
									name: 'id',
									type: [
										'null',
										{
											type: 'string',
											dqType: 'ST2 INTS',
											dqTypeId: 'ST2 INTS',
											dqNativeType: 'INTEGER',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
								{
									name: 'type',
									type: [
										'null',
										{
											type: 'string',
											dqType: '',
											dqTypeId: '',
											dqNativeType: 'STRING',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
							],
							'talend.fields.order': 'id,type',
						},
					],
				},
			],
		},
	],
	'talend.fields.order': 'id,type,name,ppu,batter,labels,categories,topping',
};
