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
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['contains', 'equals', 'notEquals'],
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
