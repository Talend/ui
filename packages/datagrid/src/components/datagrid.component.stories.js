import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconsProvider } from '@talend/react-components';

import DataGrid from './';
import DynamicDataGrid from '../../stories/DynamicDataGrid.component';
import FasterDatagrid from '../../stories/FasterDatagrid.component';
import ImmutableDataGrid from '../../stories/ImmutableDatagrid.component';
import sample from '../../stories/sample.json';
import sample2 from '../../stories/sample2.json';
import sample3 from '../../stories/sample3.json';
import sampleWithoutQuality from '../../stories/sampleWithoutQuality.json';
import getComponent from '../../stories/getComponent';

sample.data[0].value.field0.value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
psum	 	 `;

sample.data[1].value.field0.value = `loreum lo
very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value`;

sample.data[2].value.field0.value =
	'very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value';

storiesOf('Data/Datagrid/Datagrid', module)
	.add('default', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
				getComponent={getComponent}
				onFocusedCell={action('onFocusedCell')}
				onFocusedColumn={action('onFocusedColumn')}
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
				onFocusedCell={action('onFocusedCell')}
				onFocusedColumn={action('onFocusedColumn')}
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
				onFocusedCell={action('onFocusedCell')}
				onFocusedColumn={action('onFocusedColumn')}
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
				onFocusedCell={action('onFocusedCell')}
				onFocusedColumn={action('onFocusedColumn')}
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
				onFocusedCell={action('onFocusedCell')}
				onFocusedColumn={action('onFocusedColumn')}
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
				onFocusedCell={action('onFocusedCell')}
				onFocusedColumn={action('onFocusedColumn')}
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
								onFocusedCell={action('onFocusedCell')}
								onFocusedColumn={action('onFocusedColumn')}
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
