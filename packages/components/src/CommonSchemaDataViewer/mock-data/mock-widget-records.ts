import { HierarchicalSample, QualityStatus } from '../CommonDataViewer.types';

export const mockWidgetRecords: HierarchicalSample = [
	{
		fields: [
			{
				name: 'widget',
				fields: [
					{
						name: 'debug',
						value: 'on',
						quality: { aggregated: QualityStatus.Valid, dqType: QualityStatus.Valid, dqRules: [] },
					},
					{
						name: 'window',
						fields: [
							{
								name: 'title',
								value: 'Sample Konfabulator Widget',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'name',
								value: 'main_window',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'width',
								value: '500',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'height',
								value: '500',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						name: 'image',
						fields: [
							{
								name: 'src',
								value: 'Images/Sun.png',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'name',
								value: 'sun1',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'hOffset',
								value: '250',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'vOffset',
								value: '250',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'alignment',
								value: 'center',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
						],
					},
					{
						name: 'text',
						fields: [
							{
								name: 'data',
								value: 'Click Here',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'size',
								value: '36',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'style',
								value: 'bold',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'name',
								value: 'text1',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'hOffset',
								value: '250',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'vOffset',
								value: '100',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'alignment',
								value: 'center',
								quality: {
									aggregated: QualityStatus.Valid,
									dqType: QualityStatus.Valid,
									dqRules: [],
								},
							},
							{
								name: 'onMouseUp',
								value: 'sun1.opacity = (sun1.opacity / 100) * 90;',
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
