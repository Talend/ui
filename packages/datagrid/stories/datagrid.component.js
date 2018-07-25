import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/';
import serializer from '../src/components/DatasetSerializer';
import sample from './sample.json';
import sample2 from './sample2.json';
import sample3 from './sample3.json';

sample.data[0].value.field0.value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
psum	 	 `;

sample.data[1].value.field0.value = `loreum lo
very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value`;

sample.data[2].value.field0.value =
	'very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value';

storiesOf('Component Datagrid')
	.addDecorator(checkA11y)
	.add('default', () => (
		<div style={{ height: '100vh' }}>
			<IconsProvider />
			<DataGrid
				data={sample}
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
				overlayNoRowsTemplate="Custom message"
				onFocusedCell={event => console.log(event)}
				onFocusedColumn={event => console.log(event)}
				onVerticalScroll={event => console.log(event)}
				rowSelection="multiple"
			/>
		</div>
	))
	.add('loading', () => (
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
					<div style={{ height: '100vh' }}>
						<input type="button" value="changestatus" onClick={this.changeState} />
						Number of fields : {currentSample.schema.fields.length}
						<IconsProvider />
						<DataGrid
							data={currentSample}
							onFocusedCell={event => console.log(event)}
							onFocusedColumn={event => console.log(event)}
							onVerticalScroll={event => console.log(event)}
							rowSelection="multiple"
						/>
					</div>
				);
			}
		}
		return <WithLayout />;
	})
	.add('dynamic add data', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.changeState = this.changeState.bind(this);
				const datagridSample = Object.assign({}, sample);
				datagridSample.data = [
					{
						value: {
							field2: {
								value: '95716',
								quality: 1,
							},
							field8: {
								value: '10771660',
								quality: 0,
							},
							field5: {
								value: '33929307',
								quality: -1,
							},
							field4: {
								value: '10748798',
								quality: 1,
							},
							field7: {
								value: '11030795',
								quality: 1,
							},
							field3: {
								value: '',
								quality: 1,
							},
							field1: {
								value: ' 271494',
								quality: 1,
							},
							field0: {
								value: 'Aéroport Charles de Gaulle 2 TGV',
								quality: 1,
							},
							field9: {
								value: '10880464',
								quality: 1,
							},
							field6: {
								value: '10920487',
								quality: 1,
							},
						},
						quality: 1,
					},
				];
				this.state = { sample: datagridSample };
			}

			changeState() {
				const datagridSample = Object.assign({}, this.state.sample);
				datagridSample.data = datagridSample.data.concat([
					{
						value: {
							field2: {
								value: 'new',
								quality: 1,
							},
							field8: {
								value: 'new',
								quality: 0,
							},
							field5: {
								value: 'new',
								quality: -1,
							},
							field4: {
								value: 'new',
								quality: 1,
							},
							field7: {
								value: 'new',
								quality: 1,
							},
							field3: {
								value: '',
								quality: 1,
							},
							field1: {
								value: 'new',
								quality: 1,
							},
							field0: {
								value: 'Aéroport Charles de Gaulle 2 TGV-1',
								quality: 1,
							},
							field9: {
								value: 'new',
								quality: 1,
							},
							field6: {
								value: 'new',
								quality: 1,
							},
						},
						quality: 1,
					},
				]);

				this.setState({
					sample: datagridSample,
				});
			}

			render() {
				return (
					<div style={{ height: '100vh' }}>
						<input type="button" value="changestatus" onClick={this.changeState} />
						Number of data : {this.state.sample.data.length}
						<IconsProvider />
						<DataGrid
							data={this.state.sample}
							rowData={serializer.getRowData(this.state.sample)}
							rowSelection="multiple"
						/>
					</div>
				);
			}
		}
		return <WithLayout />;
	});
