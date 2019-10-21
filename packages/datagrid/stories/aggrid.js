import React from 'react';
import { storiesOf } from '@storybook/react';

import { AgGridReact } from 'ag-grid-react';
import generateAgGridData from './generateAgGridData';

storiesOf('AgGrid', module).add('default', () => (
	<div style={{ height: '100vh' }}>
		<button
			onClick={() =>
				(document.querySelector('.ag-body-viewport').scrollTop =
					document.querySelector('.ag-body-viewport').scrollHeight -
					document.querySelector('.ag-body-viewport').clientHeight)
			}
		>
			To bottom
		</button>
		<div
			className="ag-theme-balham"
			style={{
				height: '500px',
				width: '600px',
			}}
		>
			<AgGridReact {...generateAgGridData(100, 20)} />
		</div>
	</div>
));
