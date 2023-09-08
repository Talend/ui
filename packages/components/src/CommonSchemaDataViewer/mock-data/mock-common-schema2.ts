import { CommonSchemaSampled } from '../CommonDataViewer.types';

export const mockSchema2: CommonSchemaSampled = {
	name: 'Record_1_8691391710641590162',
	type: 'record',
	namespace: 'org.talend.sdk.component.schema.generated',
	fields: [
		{
			name: 'widget',
			type: [
				'null',
				{
					type: 'record',
					namespace: 'org.talend.sdk.component.schema.generated',
					fields: [
						{
							name: 'text',
							type: [
								'null',
								{
									type: 'record',
									namespace: 'org.talend.sdk.component.schema.generated',
									fields: [
										{
											name: 'data',
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
											name: 'size',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
										{
											name: 'style',
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
											name: 'hOffset',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
										{
											name: 'vOffset',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
										{
											name: 'alignment',
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
										{
											name: 'onMouseUp',
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
									'talend.fields.order': 'data,size,style,name,hOffset,vOffset,alignment,onMouseUp',
								},
							],
						},
						{
							name: 'image',
							type: [
								'null',
								{
									type: 'record',
									namespace: 'org.talend.sdk.component.schema.generated',
									fields: [
										{
											name: 'src',
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
											name: 'hOffset',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
										{
											name: 'vOffset',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
										{
											name: 'alignment',
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
									'talend.fields.order': 'src,name,hOffset,vOffset,alignment',
								},
							],
						},
						{
							name: 'window',
							type: [
								'null',
								{
									type: 'record',
									namespace: 'org.talend.sdk.component.schema.generated',
									fields: [
										{
											name: 'title',
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
											name: 'width',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
										{
											name: 'height',
											type: [
												'null',
												{
													type: 'long',
													dqType: '',
													dqTypeId: '',
													dqNativeType: 'INTEGER',
													isForced: false,
													isNativeForced: false,
												},
											],
										},
									],
									'talend.fields.order': 'title,name,width,height',
								},
							],
						},
						{
							name: 'debug',
							type: [
								'null',
								{
									type: 'string',
									dqType: 'CA Province Territory Code',
									dqTypeId: 'CA_PROVINCE_TERRITORY_CODE',
									dqNativeType: 'STRING',
									isForced: false,
									isNativeForced: false,
								},
							],
						},
					],
					'talend.fields.order': 'debug,window,image,text',
				},
			],
		},
	],
	'talend.fields.order': 'widget',
};
