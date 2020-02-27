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
		operators: ['contains', 'equals', 'notEquals', 'match a regexp'],
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
