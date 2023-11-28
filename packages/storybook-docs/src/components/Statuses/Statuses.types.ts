export enum StatusValue {
	OK = 'ok',
	KO = 'ko',
	WIP = 'wip',
	DEPRECATED = 'deprecated',
	NA = 'na',
	UNKNOWN = '❔', // This one is the default value, not designed to be used
}

export enum StatusType {
	figma = 'figma',
	storybook = 'storybook',
	react = 'react',
	i18n = 'i18n',
}

export type Statuses = Record<
	StatusType,
	{
		status?: StatusValue;
		link?: string;
	}
>;
