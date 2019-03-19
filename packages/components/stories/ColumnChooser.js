import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
// import { I18nextProvider } from 'react-i18next';
import { IconsProvider } from '../src/index';

import { ColumnChooser } from '../src/List/Toolbar/ColumnChooserButton';
// import i18n, { LanguageSwitcher } from './config/i18n';

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
		label: 'Modified',
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
			<ColumnChooser columns={columns} id="default-column-chooser" submit={action('submit')} />
		</div>
	))
	.add('Total customization', () => (
		<div>
			<h1>Column chooser tooltip</h1>
			<p>Custom elements</p>
			<IconsProvider defaultIcons={icons} />
			<ColumnChooser columns={columns} id="default-column-chooser" submit={action('submit')}>
				<ColumnChooser.Header>
					<ColumnChooser.Header.Title value="Hello world" />
					<button style={{ marginLeft: '200px' }}>My Button</button>
				</ColumnChooser.Header>
				<ColumnChooser.Body>
					{hookColumns => (
						<React.Fragment>
							<div>Some special stuff</div>
							{hookColumns.map((column, index) => (
								<ColumnChooser.Body.RowRenderer>
									<ColumnChooser.Body.RowRenderer.Visibility
										index={index}
										value={column.hidden}
										locked={column.locked}
									/>
									<span style={{ paddingLeft: '20px' }}>More data</span>
									<ColumnChooser.Body.RowRenderer.Label label={column.label} />
									<span style={{ paddingRight: '20px ' }}>Icon</span>
									<button
										style={{ marginLeft: '20px', display: 'flex', height: '50%' }}
										onClick={action('my custom action')}
									>
										Action
									</button>
								</ColumnChooser.Body.RowRenderer>
							))}
							<p>
								<button style={{ width: '100%' }}>A new action for all columns</button>
							</p>
						</React.Fragment>
					)}
				</ColumnChooser.Body>
				<ColumnChooser.Footer />
			</ColumnChooser>
		</div>
	));
