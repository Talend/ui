export const badgeName = {
	properties: {
		attribute: 'name',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Name',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		isAvailableForQuickSearch: true,
		isAvailableForFacetList: true,
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['containsIgnoreCase', 'equals', 'notEquals', 'match a regexp'],
	},
};

export const badgeAll = {
	properties: {
		attribute: 'all',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'All',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		isAvailableForFacetList: false,
		badgePerFacet: '1',
		entitiesPerBadge: '1',
		operators: ['containsIgnoreCase'],
	},
};

export const badgeConnectionType = {
	properties: {
		attribute: 'connection.type',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Connection type',
		operator: {},
		operators: [],
		type: 'checkbox',
	},
	metadata: {
		badgePerFacet: '1',
		entitiesPerBadge: 'N',
		values: [
			{ id: 'amazon_s3', label: 'Amazon S3' },
			{ id: 'hdfs', label: 'HDFS' },
			{ id: 'kafka', label: 'Kafka' },
			{ id: 'localcon', label: 'Local connection' },
			{ id: 'salesforce', label: 'Salesforce' },
			{ id: 'aws_kinesis', label: 'AWS kinesis' },
		],
		operators: ['in'],
	},
};

export const badgePrice = {
	properties: {
		attribute: 'price',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Price',
		operator: {},
		operators: [],
		type: 'number',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: [
			'equals',
			'notEquals',
			'greaterThan',
			'greaterThanOrEquals',
			'lessThan',
			'lessThanOrEquals',
		],
	},
};

export const badgeValid = {
	properties: {
		attribute: 'valid',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Valid',
		operator: {},
		operators: [],
		type: 'slider',
		icon: {
			name: 'talend-pie-charts',
			class: 'valid',
		},
		unit: '%',
		defaultValue: 50,
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['equals', 'greaterThan', 'lessThan'],
	},
};

export const badgeEmpty = {
	properties: {
		attribute: 'empty',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Empty',
		operator: {},
		operators: [],
		type: 'slider',
		icon: {
			name: 'talend-pie-charts',
			class: 'empty',
		},
		unit: '%',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['equals', 'greaterThan', 'lessThan'],
	},
};

export const badgeInvalid = {
	properties: {
		attribute: 'invalid',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Invalid',
		operator: {},
		operators: [],
		type: 'slider',
		icon: {
			name: 'talend-pie-charts',
			class: 'invalid',
		},
		unit: '%',
		defaultValue: 50,
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['equals', 'greaterThan', 'lessThan'],
	},
};

export const badgeTags = {
	properties: {
		attribute: 'tags',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Tags',
		operator: {},
		operators: [],
		type: 'tags',
	},
	metadata: {
		badgePerFacet: '1',
		entitiesPerBadge: 'N',
		operators: ['in'],
	},
};

export const badgeWithVeryLongName = {
	properties: {
		attribute: 'price',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'helloverybeautifullworldhowareyouinthislovelydaythesunishiningandtheskyisbright?',
		operator: {},
		operators: [],
		type: 'number',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: [
			'equals',
			'notEquals',
			'greaterThan',
			'greaterThanOrEquals',
			'lessThan',
			'lessThanOrEquals',
		],
	},
};

export const badgeEnumWithLotOfValues = {
	properties: {
		attribute: 'connection.type',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Connection type',
		operator: {},
		operators: [],
		type: 'checkbox',
	},
	metadata: {
		badgePerFacet: '1',
		entitiesPerBadge: 'N',
		values: [
			{ id: 'amazon_s3', label: 'Amazon S3' },
			{ id: 'hdfs', label: 'HDFS' },
			{ id: 'kafka', label: 'Kafka' },
			{ id: 'localcon', label: 'Local connection' },
			{ id: 'salesforce', label: 'Salesforce' },
			{ id: 'aws_kinesis', label: 'AWS kinesis' },
			{ id: 'amazon_s3_low', label: 'Amazon S3 Low' },
			{ id: 'hdfs_low', label: 'HDFS Low' },
			{ id: 'kafka_low', label: 'Kafka Low' },
			{ id: 'localcon_low', label: 'Local connection Low' },
			{ id: 'salesforce_low', label: 'Salesforce Low' },
			{ id: 'aws_kinesis_low', label: 'AWS kinesis Low' },
			{ id: 'amazon_s3_high', label: 'Amazon S3 High' },
			{ id: 'hdfs_high', label: 'HDFS High' },
			{ id: 'kafka_high', label: 'Kafka High' },
			{ id: 'localcon_high', label: 'Local connection High' },
			{ id: 'salesforce_high', label: 'Salesforce High' },
			{ id: 'aws_kinesis_high', label: 'AWS kinesis High' },
			{ id: 'amazon_s3_classic', label: 'Amazon S3 Classic' },
			{ id: 'hdfs_classic', label: 'HDFS Classic' },
			{ id: 'kafka_classic', label: 'Kafka Classic' },
			{ id: 'localcon_classic', label: 'Local connection Classic' },
			{ id: 'salesforce_classic', label: 'Salesforce Classic' },
			{ id: 'aws_kinesis_classic', label: 'AWS kinesis Classic' },
		],
		operators: ['in'],
	},
};

export const badgeTextAsCustomAttribute = {
	properties: {
		attribute: 'target',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Target',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		category: 'Custom attributes',
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['containsIgnoreCase', 'equals', 'notEquals', 'match a regexp'],
	},
};

export const badgeEnumsAsCustomAttribute = {
	properties: {
		attribute: 'visibility',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Visibility',
		operator: {},
		operators: [],
		type: 'checkbox',
	},
	metadata: {
		badgePerFacet: '1',
		entitiesPerBadge: 'N',
		category: 'Custom attributes',
		values: [
			{ id: 'internal', label: 'Internal' },
			{ id: 'public', label: 'Public' },
		],
		operators: ['in'],
	},
};

export const badgeTextAsCategory = {
	properties: {
		attribute: 'owner',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Owner',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		category: 'Very long long long long long long category',
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['containsIgnoreCase', 'equals'],
	},
};

export const badgeEmptyLabel = {
	properties: {
		attribute: 'title',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: '',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['containsIgnoreCase', 'equals'],
	},
};

export const badgePriceAsCustomAttribute = {
	properties: {
		attribute: 'price',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Price',
		operator: {},
		operators: [],
		type: 'number',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		category: 'Custom attributes',
		operators: [
			'equals',
			'notEquals',
			'greaterThan',
			'greaterThanOrEquals',
			'lessThan',
			'lessThanOrEquals',
		],
	},
};
