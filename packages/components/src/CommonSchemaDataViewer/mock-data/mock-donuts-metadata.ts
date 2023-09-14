import { FieldMetadata } from '../CommonDataViewer.types';

export const mockDonutsMetadata: FieldMetadata[] = [
	{
		path: 'id',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'INTEGER',
			semanticType: '64d34b3a2e74387aa4cc148f',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 10, invalid: 0, empty: 0, total: 10 },
			type: { valid: 10, invalid: 0, empty: 0, total: 10 },
			dqRules: [],
		},
		matchings: [{ id: '64d34b3a2e74387aa4cc148f', name: 'ST2 INTS', score: 100.0 }],
	},
	{
		path: 'batter.id',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'INTEGER',
			semanticType: '64d34b3a2e74387aa4cc148f',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 0, invalid: 0, empty: 0, total: 0 },
			type: { valid: 0, invalid: 0, empty: 0, total: 0 },
			dqRules: [],
		},
		matchings: [
			{ id: '64d34b3a2e74387aa4cc148f', name: 'ST2 INTS', score: 100.0 },
			{ id: '6478462f3a07a94c71a604cd', name: 'doubles', score: 100.0 },
		],
	},
	{
		path: 'topping.id',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'INTEGER',
			semanticType: '64d34b3a2e74387aa4cc148f',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 0, invalid: 0, empty: 0, total: 0 },
			type: { valid: 0, invalid: 0, empty: 0, total: 0 },
			dqRules: [],
		},
		matchings: [
			{ id: '64d34b3a2e74387aa4cc148f', name: 'ST2 INTS', score: 100.0 },
			{ id: '6478462f3a07a94c71a604cd', name: 'doubles', score: 100.0 },
		],
	},
	{
		path: 'type',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'STRING',
			semanticType: '',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 10, invalid: 0, empty: 0, total: 10 },
			type: { valid: 10, invalid: 0, empty: 0, total: 10 },
			dqRules: [],
		},
		matchings: [],
	},
	{
		path: 'batter.type',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'STRING',
			semanticType: '',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 0, invalid: 0, empty: 0, total: 0 },
			type: { valid: 0, invalid: 0, empty: 0, total: 0 },
			dqRules: [],
		},
		matchings: [],
	},
	{
		path: 'topping.type',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'STRING',
			semanticType: '',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 0, invalid: 0, empty: 0, total: 0 },
			type: { valid: 0, invalid: 0, empty: 0, total: 0 },
			dqRules: [],
		},
		matchings: [],
	},
	{
		path: 'name',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'STRING',
			semanticType: '',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 10, invalid: 0, empty: 0, total: 10 },
			type: { valid: 10, invalid: 0, empty: 0, total: 10 },
			dqRules: [],
		},
		matchings: [],
	},
	{
		path: 'ppu',
		description: '',
		type: {
			originalType: 'double',
			status: 'NOT_FORCED',
			primitiveType: 'DOUBLE',
			semanticType: '',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 10, invalid: 0, empty: 0, total: 10 },
			type: { valid: 10, invalid: 0, empty: 0, total: 10 },
			dqRules: [],
		},
		matchings: [{ id: '6478462f3a07a94c71a604cd', name: 'doubles', score: 100.0 }],
	},
	{
		path: 'labels',
		description: '',
		type: {
			originalType: 'string',
			status: 'NOT_FORCED',
			primitiveType: 'STRING',
			semanticType: '',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 0, invalid: 0, empty: 0, total: 0 },
			type: { valid: 0, invalid: 0, empty: 0, total: 0 },
			dqRules: [],
		},
		matchings: [],
	},
	{
		path: 'categories',
		description: '',
		type: {
			originalType: 'long',
			status: 'NOT_FORCED',
			primitiveType: 'INTEGER',
			semanticType: '64d34b3a2e74387aa4cc148f',
		},
		dqRules: [],
		qualities: {
			aggregated: { valid: 0, invalid: 0, empty: 0, total: 0 },
			type: { valid: 0, invalid: 0, empty: 0, total: 0 },
			dqRules: [],
		},
		matchings: [
			{ id: '64d34b3a2e74387aa4cc148f', name: 'ST2 INTS', score: 100.0 },
			{ id: '6478462f3a07a94c71a604cd', name: 'doubles', score: 100.0 },
		],
	},
];
