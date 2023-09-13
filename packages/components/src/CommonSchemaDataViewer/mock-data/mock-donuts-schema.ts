import { CommonSchemaSampled } from '../CommonDataViewer.types';

export const mockDonutsSchema: CommonSchemaSampled = {
	name: 'Record_6_n_1048095076742141837',
	type: 'record',
	namespace: 'org.talend.sdk.component.schema.generated',
	fields: [
		{
			name: 'id',
			type: [
				'null',
				{
					type: 'string',
					dqType: 'Year',
					dqTypeId: 'Year',
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
					dqType: '',
					dqTypeId: '',
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
											dqType: 'Year',
											dqTypeId: 'Year',
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
											dqType: 'Year',
											dqTypeId: 'Year',
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
	'talend.fields.order': 'id,type,name,ppu,batter,topping',
};
