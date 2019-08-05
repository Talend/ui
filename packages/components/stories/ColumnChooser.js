import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import { IconsProvider } from '../src/index';
import { ColumnChooser } from '../src/List/Toolbar/ColumnChooserButton';

const icons = {
	'talend-locked': talendIcons['talend-locked'],
};

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
	{ key: 'icon', label: 'Icon', hidden: true, order: 5 },
];

storiesOf('Column Chooser', module)
	.add('Default', () => (
		<div>
			<h1>Column chooser tooltip</h1>
			<p>Default mode with minimal props</p>
			<IconsProvider defaultIcons={icons} />
			<ColumnChooser
				columns={columns}
				nbLockedLeftItems={2}
				id="default-column-chooser"
				submit={action('submit')}
			/>
		</div>
	))
	.add('Customize Column Chooser', () => (
		<div>
			<h1>Column chooser tooltip</h1>
			<p>You can provide and compose some of the column chooser part.</p>
			<IconsProvider defaultIcons={icons} />
			<ColumnChooser columns={columns} id="default-column-chooser" submit={action('submit')}>
				<ColumnChooser.Header>
					<span>Hello world</span>
					<button style={{ marginLeft: '200px' }}>My Button</button>
				</ColumnChooser.Header>
				<ColumnChooser.Body>
					{myBodyColumns =>
						myBodyColumns.map(column => (
							<div>
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
			</ColumnChooser>
		</div>
	));
