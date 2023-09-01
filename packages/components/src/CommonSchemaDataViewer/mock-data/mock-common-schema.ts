import { CommonSchemaSampled } from '../CommonDataViewer.types';

export const mockSchema: CommonSchemaSampled = {
	name: 'Record_3_n_2523327838463021400',
	type: 'record',
	namespace: 'org.talend.sdk.component.schema.generated',
	fields: [
		{
			name: 'employees',
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
									name: 'name',
									type: [
										'null',
										{
											type: 'record',
											namespace: 'org.talend.sdk.component.schema.generated',
											fields: [
												{
													name: 'firstName',
													type: [
														'null',
														{
															type: 'string',
															dqType: 'First Name',
															dqTypeId: 'FIRST_NAME',
															dqNativeType: 'STRING',
															isForced: false,
															isNativeForced: false,
														},
													],
												},
												{
													name: 'lastName',
													type: [
														'null',
														{
															type: 'string',
															dqType: 'Last Name',
															dqTypeId: 'LAST_NAME',
															dqNativeType: 'STRING',
															isForced: false,
															isNativeForced: false,
														},
													],
												},
											],
											'talend.fields.order': 'firstName,lastName',
										},
									],
								},
								{
									name: 'country',
									type: [
										'null',
										{
											type: 'string',
											dqType: 'Country',
											dqTypeId: 'COUNTRY',
											dqNativeType: 'STRING',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
							],
							'talend.fields.order': 'name,country',
						},
					],
				},
			],
		},
		{
			name: 'vehicles',
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
									name: 'insurance',
									type: [
										'null',
										{
											type: 'record',
											namespace: 'org.talend.sdk.component.schema.generated',
											fields: [
												{
													name: 'company',
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
													name: 'policy_num',
													type: [
														'null',
														{
															type: 'string',
															dqType: 'FR Postal Code',
															dqTypeId: 'FR_POSTAL_CODE',
															dqNativeType: 'INTEGER',
															isForced: false,
															isNativeForced: false,
														},
													],
												},
											],
											'talend.fields.order': 'company,policy_num',
										},
									],
								},
								{
									name: 'maintenance',
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
															name: 'date',
															type: [
																'null',
																{
																	type: 'string',
																	dqType: '',
																	dqTypeId: '',
																	dqNativeType: 'DATE',
																	isForced: false,
																	isNativeForced: false,
																},
															],
														},
														{
															name: 'desc',
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
													'talend.fields.order': 'date,desc',
												},
											],
										},
									],
								},
								{
									name: 'type',
									type: [
										'null',
										{
											type: 'string',
											dqType: 'Airport Code',
											dqTypeId: 'AIRPORT_CODE',
											dqNativeType: 'STRING',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
								{
									name: 'model',
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
							'talend.fields.order': 'type,model,insurance,maintenance',
						},
					],
				},
			],
		},
		{
			name: 'country',
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
									name: 'code',
									type: [
										'null',
										{
											type: 'string',
											dqType: 'Country Code ISO2',
											dqTypeId: 'COUNTRY_CODE_ISO2',
											dqNativeType: 'STRING',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
								{
									name: 'label',
									type: [
										'null',
										{
											type: 'string',
											dqType: 'Country',
											dqTypeId: 'COUNTRY',
											dqNativeType: 'STRING',
											isForced: false,
											isNativeForced: false,
										},
									],
								},
							],
							'talend.fields.order': 'code,label',
						},
					],
				},
			],
		},
	],
	'talend.fields.order': 'employees,vehicles,country',
};
