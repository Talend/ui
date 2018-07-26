import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/';
import serializer from '../src/components/DatasetSerializer';
import sample from './sample.json';
import sample2 from './sample2.json';
import sample3 from './sample3.json';

function forceRedrawRows(props, oldProps) {
	return props.rowData[0].loading !== oldProps.rowData[0].loading;
}

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
					<div>
						<input type="button" value="changestatus" onClick={this.changeState} />
						Number of fields : {currentSample.schema.fields.length}
						<IconsProvider />
						<div style={{ height: '200px' }}>
							<DataGrid
								data={currentSample}
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
	.add('dynamic change data', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.changeState = this.changeState.bind(this);
				const datagridSample = Object.assign({}, sample);
				datagridSample.data = [
					{
						value: {},
						loading: true,
					},
				];
				this.state = { sample: datagridSample };
			}

			changeState() {
				const datagridSample = Object.assign({}, this.state.sample);
				datagridSample.data[0] = sample.data[0];

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
							forceRedrawRows={forceRedrawRows}
						/>
					</div>
				);
			}
		}
		return <WithLayout />;
	});
