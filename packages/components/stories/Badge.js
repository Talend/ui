import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { Badge, IconsProvider } from '../src/';

const defaultStyle = {
	display: 'flex',
};

const columnStyleInfo = {
	flexGrow: '1',
	maxWidth: '70px',
	padding: '0 10px',
};

const columnStyle = {
	flexGrow: '1',
	maxWidth: '250px',
	padding: '0 10px',
};

const icons = {
	'talend-cross': talendIcons['talend-cross'],
	'talend-clock': talendIcons['talend-clock'],
};

function onDelete(name) {
	return {
		onDelete: action(`remove badge ${name}`),
	};
}

function onSelect(name) {
	return {
		onSelect: action(`select badge ${name}`),
	};
}

const longStr = 'Very, very, very, very, very, very, very, very long tag';

storiesOf('Badge', module).add('default', () => (
	<React.Fragment>
		<section>
			<h1>Display Large (Default) - new</h1>
			<IconsProvider defaultIcons={icons} />
			<div style={defaultStyle} id="header">
				<div style={columnStyleInfo}>
					<span>/</span>
				</div>
				<div style={columnStyle}>
					<span>Tags as links</span>
				</div>
				<div style={columnStyle}>
					<span>Read-only</span>
				</div>
				<div style={columnStyle}>
					<span>Edit mode</span>
				</div>
			</div>
			<hr />
			<div style={defaultStyle} id="default">
				<div style={columnStyleInfo}>
					<span>Default</span>
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display="large" aslink {...onSelect('A')} />
					<br />
					<Badge label="Label" display="small" aslink {...onSelect('B')} />
					<br />
					<Badge label="categ not visible" display="large" category="Cat" aslink {...onSelect('B')} />
					<br />
					<Badge label="categ not visible" display="small" category="Cat" aslink {...onSelect('B')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display="large" {...onSelect('A')} />
					<br />
					<Badge label="Label" display="small" {...onSelect('B')} />
					<br />
					<Badge label="Label" display="large" category="Cat" {...onSelect('B')} {...onDelete('A')} />
					<br />
					<Badge label="Label" display="small" category="Cat" {...onSelect('B')} {...onDelete('A')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display="large" edit {...onSelect('A')} {...onDelete('A')} />
					<br />
					<Badge label="Label" display="small" edit {...onSelect('B')} {...onDelete('A')} />
					<br />
					<Badge label="Label" display="large" category="Cat" edit {...onSelect('B')} {...onDelete('A')} />
					<br />
					<Badge label="Label" display="small" category="Cat" edit {...onSelect('B')} {...onDelete('A')} />
					<br />
					<Badge label="Label" display="large" category="Cat" icon="talend-clock" edit {...onSelect('B')} {...onDelete('A')} />
					<br />
					<Badge label="Label" display="small" category="Cat" icon="talend-clock" edit {...onSelect('B')} {...onDelete('A')} />
				</div>
			</div>
			<hr />
		</section>
	</React.Fragment>
));
