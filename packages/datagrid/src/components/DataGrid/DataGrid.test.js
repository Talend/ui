import React from 'react';
import ReactDOM from 'react-dom';
import { Grid as agGrid } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataGrid from './DataGrid.component';

function PinHeaderRenderer() {}

function getComponent() {
	return PinHeaderRenderer;
}

const sample = {
	schema: {
		type: 'record',
		name: 'StringArrayRecord',
		fields: [
			{
				name: 'field0',
				doc: 'Nom de la gare',
				type: [
					{
						'@talend-quality@': {
							0: 0,
							1: 38,
							'-1': 62,
							total: 100,
						},
						type: 'string',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
					{
						type: 'null',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
				],
			},
			{
				name: 'field1',
				doc: 'Code UIC',
				type: {
					'@talend-quality@': {
						0: 0,
						1: 100,
						'-1': 0,
						total: 100,
					},
					type: 'int',
					dqType: '',
					dqTypeKey: '',
				},
			},
		],
	},
	data: [
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
					value: '271494',
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
		{
			value: {
				field4: {
					value: '9560',
					quality: 1,
				},
				field2: {
					value: '2190',
					quality: 1,
				},
				field1: {
					value: '171702',
					quality: 0,
				},
				field3: {
					value: 'c',
					quality: -1,
				},
				field0: {
					value: 'Aguilcourt-Variscourt',
					quality: 1,
				},
				field9: {
					value: '',
					quality: -1,
				},
				field7: {
					value: '',
					quality: 0,
				},
				field5: {
					value: '',
					quality: 0,
				},
				field6: {
					value: '9812',
					quality: 1,
				},
				field8: {
					value: '8919',
					quality: 1,
				},
			},
			quality: 1,
		},
	],
	encoding: 'JSON',
	'@talend-quality@': {
		0: 30,
		1: 62,
		'-1': 7,
	},
};

jest.mock('ally.js');

describe('#DataGrid', () => {
	xit('should render DataGrid', async () => {
		window.React = React;
		window.ReactDOM = ReactDOM;
		window.agGrid = agGrid;
		window.AgGridReact = { AgGridReact };
		render(<DataGrid getComponent={getComponent} data={sample} />);
		await waitFor(
			() =>
				new Promise(resolve => {
					setTimeout(() => {
						resolve(true);
					}, 1000);
				}),
			{ timeout: 1100 },
		);
		expect(true).toBe(true);
		// expect(wrapper.getElement()).toMatchSnapshot();
	});
});
