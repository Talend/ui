import React from 'react';
import { action } from '@storybook/addon-actions';
import ColumnChooser from './ColumnChooser.component';
import { Card } from '@talend/design-system';
import PropTypes from '../../../../VirtualizedList/PropTypes';

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

function Layout({ children }) {
	return (
		<div style={{ width: '50rem', height: '50rem' }}>
			<Card>{children}</Card>
		</div>
	);
}

Layout.displayName = 'Layout';
Layout.propTypes = {
	children: PropTypes.any,
};

export default {
	title: 'Data/List/Column Chooser',
};

export const Default = () => (
	<div>
		<h1>Column chooser tooltip</h1>
		<p>Default mode with minimal props</p>
		<Layout>
			<ColumnChooser
				columnsFromList={columns}
				nbLockedLeftItems={2}
				id="default-column-chooser"
				onSubmit={action('submit')}
			/>
		</Layout>
	</div>
);

export const CustomizeColumnChooser = () => (
	<div>
		<h1>Column chooser tooltip</h1>
		<p>You can provide and compose some of the column chooser part.</p>

		<Layout>
			<ColumnChooser
				columnsFromList={columns}
				id="default-column-chooser"
				onSubmit={action('submit')}
			>
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
			</ColumnChooser>
		</Layout>
	</div>
);
