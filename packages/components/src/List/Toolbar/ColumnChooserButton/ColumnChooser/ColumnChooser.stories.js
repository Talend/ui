import { action } from '@storybook/addon-actions';
import ColumnChooser from './ColumnChooser.component';
import { Card } from '@talend/design-system';

const columns = [
	{ key: 'id', label: 'Id', order: 1 },
	{ key: 'name', label: 'Name', order: 2 },
	{ key: 'author', label: 'Author', order: 3 },
	{ key: 'created', label: 'Created', order: 6 },
	{
		key: 'modified',
		label: 'Very long name long name long name long name long name',
		order: 4,
		header: 'icon',
		data: { iconName: 'talend-scheduler' },
	},
	{ key: 'icon', label: 'Icon', hidden: true, order: 5, locked: true },
];

const defaultProps = {
	columnsFromList: columns,
	nbLockedLeftItems: 2,
	id: 'default-column-chooser',
	onSubmit: action('submit'),
};

export default {
	title: 'Data/List/Column Chooser',
	render: props => (
		<ColumnChooser
			{...{
				...defaultProps,
				...props,
			}}
		/>
	),
	decorators: [
		(Story, { parameters }) => (
			<div>
				<h1>{parameters?.title}</h1>
				<p>{parameters?.description}</p>
				<div style={{ width: '50rem', height: '50rem' }}>
					<Card>
						<Story />
					</Card>
				</div>
			</div>
		),
	],
};

export const Default = {
	parameters: {
		title: 'Column chooser tooltip',
		description: 'Default mode with minimal props',
	},
};

export const CustomizeColumnChooser = {
	parameters: {
		title: 'Column chooser tooltip',
		description: 'You can provide and compose some of the column chooser part.',
	},
	args: {
		children: (
			<>
				<ColumnChooser.Header>
					<span>Hello world</span>
					<button style={{ marginLeft: '200px' }}>My Button</button>
				</ColumnChooser.Header>
				<ColumnChooser.Body>
					{myBodyColumns =>
						myBodyColumns.map(column => (
							<div key={column.label}>
								<ColumnChooser.Body.Row>
									<ColumnChooser.Body.Row.Label label={column.label} />
									<button
										style={{ marginLeft: '20px', display: 'flex', height: '50%' }}
										onClick={action('my custom action')}
									>
										Action
									</button>
								</ColumnChooser.Body.Row>
							</div>
						))
					}
				</ColumnChooser.Body>
				<ColumnChooser.Footer />
			</>
		),
	},
};
