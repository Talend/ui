import { BrowserRouter, Link } from 'react-router-dom';

import { action as sbAction } from '@storybook/addon-actions';

import {
	EmptyState,
	EmptyStateLarge,
	EmptyStateMedium,
	EmptyStateSmall,
	StackHorizontal,
} from '../';

export default {
	component: EmptyStateLarge,
	title: 'Feedback/EmptyState',
};

export const Large = () => (
	<EmptyStateLarge
		title="No preparations yet"
		description="Add a preparation to clean, format, and transform data prior to processing."
		action={{
			children: 'Create a dataset',
			onClick: () => sbAction('clicked'),
			icon: 'plus',
			actionType: 'button',
		}}
		link={{ href: 'https://talend.com' }}
	/>
);

export const LargeWithLinkButton = () => (
	<BrowserRouter>
		<EmptyStateLarge
			title="No preparations yet"
			description="Add a preparation to clean, format, and transform data prior to processing."
			action={{
				children: 'Create a preparation',
				icon: 'plus',
				actionType: 'link',
				as: <Link to="/preparation/new" />,
				'data-feature': 'Preparation empty state clicked',
			}}
			link={{ href: 'https://talend.com' }}
		/>
	</BrowserRouter>
);

export const MediumWithAction = ({ illustration, title, description, link, action }: any) => {
	return (
		<EmptyStateMedium
			illustration={illustration}
			title={title}
			description={description}
			link={link}
			action={action}
		/>
	);
};

MediumWithAction.argTypes = {
	illustration: {
		control: {
			type: 'select',
			options: [
				'ACTIVITY',
				'CHART',
				'CHECKLIST',
				'DEFAULT',
				'FLASK',
				'LIGHTBULB',
				'MESSAGE',
				'PLUG',
				'ROCKET',
				'SEARCH',
				'SETTINGS',
				'USER',
				'WARNING',
			],
		},
		defaultValue: 'DEFAULT',
		description: 'Define the illustration',
	},
	title: {
		control: { type: 'text' },
		defaultValue: 'No dataset yet',
	},
	description: {
		control: { type: 'text' },
		defaultValue: 'Add a preparation to clean, format, and transform data prior to processing.',
	},
	link: {
		control: { type: 'object' },
		defaultValue: { href: 'https://talend.com', 'data-feature': 'Feature name' },
		description: 'Optional for Large and Medium, unavailable for Small',
	},
	action: {
		control: { type: 'object' },
		defaultValue: {
			children: 'Create a dataset',
			onClick: () => sbAction('clicked'),
			icon: 'plus',
			actionType: 'button',
		},
	},
};

export const Small = () => <EmptyStateSmall title="Create a preparation first" />;

export const Demo = () => (
	<StackHorizontal gap="XS" align="center" justify="spaceBetween">
		<EmptyStateLarge
			title="This space is empty"
			description="Any additional data here"
			action={{
				children: 'Action',
				onClick: () => sbAction('clicked'),
				actionType: 'button',
			}}
			link={{ href: 'https://talend.com' }}
		/>
		<EmptyStateMedium
			title="This space is empty"
			description="Any additional data here"
			link={{ href: 'https://talend.com' }}
		/>
		<EmptyStateSmall title="This space is empty" />
	</StackHorizontal>
);

export const Usage = (args: EmptyStateProps) => {
	switch (args.variant) {
		case 'L': {
			const { ...rest } = args;
			return <EmptyState {...rest} />;
		}

		case 'M': {
			const { ...rest } = args;
			return <EmptyState {...rest} />;
		}

		case 'S': {
			const { variant, title } = args;
			return <EmptyState variant={variant} title={title} />;
		}

		default: {
			return <></>;
		}
	}
};

Usage.argTypes = {
	variant: {
		control: { type: 'select', options: ['L', 'M', 'S'] },
		defaultValue: 'L',
		description:
			'Used for `<EmptyState>`. Use `<EmptyStateLarge>`, `<EmptyStateMedium>` and `<EmptyStateSmall>` instead',
	},
	title: {
		control: { type: 'text' },
		defaultValue: 'Title copy',
		description: 'Mandatory across variants',
	},
	description: {
		control: { type: 'text' },
		defaultValue: 'Description copy',
		description: 'Mandatory for Large and Medium, unavailable for Small',
	},
	link: {
		control: { type: 'object' },
		defaultValue: { href: 'https://talend.com', 'data-feature': 'Feature name' },
		description: 'Optional for Large and Medium, unavailable for Small',
	},
	action: {
		control: { type: 'object' },
		defaultValue: {
			children: 'Action',
			onClick: () => {},
			actionType: 'button',
			'data-feature': 'Feature name',
		},
		description: 'Optional for Large and Medium. Unavailable for Small',
	},
	illustration: {
		table: {
			disable: true,
		},
	},
};
