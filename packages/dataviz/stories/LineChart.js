import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import LineChart from '../src';

const data = [{
	'name': 'W20 2016',
	'User 2 malade': 7,
	'Coco  Bongo': 1,
	'Owner 3 tds.talend.com': 1,
	'Owner 2 Cocorico': 0,
	'Other users': 2
}, {
	'name': 'W46 2016',
	'User 2 malade': 0,
	'Coco  Bongo': 0,
	'Owner 3 tds.talend.com': 5,
	'Owner 2 Cocorico': 0,
	'Other users': 0
}, {
	'name': 'W20 2017',
	'User 2 malade': 1,
	'Coco  Bongo': 2,
	'Owner 3 tds.talend.com': 0,
	'Owner 2 Cocorico': 18,
	'Other users': 0
}, {
	'name': 'W46 2017',
	'User 2 malade': 0,
	'Coco  Bongo': 16,
	'Owner 3 tds.talend.com': 0,
	'Owner 2 Cocorico': 5,
	'Other users': 0
}, {
	'name': 'W3 2018',
	'User 2 malade': 2,
	'Coco  Bongo': 1,
	'Owner 3 tds.talend.com': 3,
	'Owner 2 Cocorico': 0,
	'Other users': 0
}, {
	'name': 'W38 2018',
	'User 2 malade': 13,
	'Coco  Bongo': 7,
	'Owner 3 tds.talend.com': 0,
	'Owner 2 Cocorico': 0,
	'Other users': 0
}, {
	'name': 'W8 2019',
	'User 2 malade': 4,
	'Coco  Bongo': 0,
	'Owner 3 tds.talend.com': 5,
	'Owner 2 Cocorico': 0,
	'Other users': 0
}];

storiesOf('LineChart', module)
	.add('default', () =>
		<div style={{height: '300px', padding: '20px'}}>
			<LineChart data={data} colors={['blue', '#70A338', '#CA7129', 'pink', '#C95357']} />
		</div>
	);
