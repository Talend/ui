import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/';
import DefaultRenderer from '../src/components/DefaultCellRenderer/DefaultRenderer.component';
import DefaultIntCellRenderer from '../src/components/DefaultIntCellRenderer';
import DefaultPinHeaderRenderer from '../src/components/DefaultPinHeaderRenderer';
import DefaultCellRenderer from '../src/components/DefaultCellRenderer';
import DefaultHeaderRenderer from '../src/components/DefaultHeaderRenderer';
import DynamicDataGrid from './DynamicDataGrid.component';
import FasterDatagrid from './FasterDatagrid.component';
import ImmutableDataGrid from './ImmutableDatagrid.component';
import sample from './sample.json';
import sample2 from './sample2.json';
import sample3 from './sample3.json';
import sampleWithoutQuality from './sampleWithoutQuality.json';

// eslint-disable-next-line import/prefer-default-export
export function getComponent(component) {
	switch (component) {
		case 'DefaultIntCellRenderer':
			return DefaultIntCellRenderer;
		case 'DefaultHeaderRenderer':
			return DefaultHeaderRenderer;
		case 'DefaultPinHeaderRenderer':
			return DefaultPinHeaderRenderer;
		case 'DefaultCellRenderer':
			return DefaultCellRenderer;
		case 'DefaultStringCellRenderer':
			return DefaultRenderer;
		default:
			return DefaultRenderer;
	}
}

sample.data[0].value.field0.value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
psum	 	 `;

sample.data[1].value.field0.value = `loreum lo
very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value`;

sample.data[2].value.field0.value =
	'very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value';

storiesOf('Component Datagrid', module)
	.add('default', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				getComponent={getComponent}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
				enableColResize={false}
			/>
		</div>
	))
	.add('without subtype', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				columnsConf={{ hideSubType: true }}
				data={sample}
				getComponent={getComponent}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
				enableColResize={false}
			/>
		</div>
	))
	.add('datagrid without quality', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sampleWithoutQuality}
				getComponent={getComponent}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
				enableColResize={false}
			/>
		</div>
	))
	.add('columns resizables', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				getComponent={getComponent}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	))
	.add('With start index to 1', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				getComponent={getComponent}
				startIndex={1}
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	))
	.add('no row specific message', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={[]}
				getComponent={getComponent}
				overlayNoRowsTemplate="Custom message"
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	))
	.add('loading datagrid', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid data={sample} loading />
		</div>
	))
	.add('loading cells', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid data={sample3} />
		</div>
	))
	.add('Dynamic change schema', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.changeState = this.changeState.bind(this);
				this.state = { firstSample: true };
			}

			changeState() {
				this.setState(prevState => ({
					firstSample: !prevState.firstSample,
				}));
			}

			render() {
				const currentSample = this.state.firstSample ? sample : sample2;
				return (
					<div>
						<input type="button" value="changestatus" onClick={this.changeState} />
						Number of fields : {currentSample.schema.fields.length}
						<IconsProvider />
						<div style={{ height: '200px' }}>
							<DataGrid
								data={currentSample}
								getComponent={getComponent}
								onFocusedCell={event => console.log(event)}
								onFocusedColumn={event => console.log(event)}
								onVerticalScroll={event => console.log(event)}
								rowSelection="multiple"
							/>
						</div>
					</div>
				);
			}
		}
		return <WithLayout />;
	})
	.add('@deprecated - dynamic change data with forceRedrawRows', () => (
		<DynamicDataGrid forceRedraw />
	))
	.add('dynamic change data', () => <DynamicDataGrid />)
	.add('faster datagrid', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<FasterDatagrid />
		</div>
	))
	.add('datagrid with immutable data', () => <ImmutableDataGrid />);
