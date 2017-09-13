import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from 'talend-icons/dist/react';

import { Badge, IconsProvider } from '../src/';

const defaultStyle = {
	display: 'flex',
};

const columnStyle = {
	flexGrow: '1',
	maxWidth: '250px',
	padding: '0 10px',
};

const icons = {
	'talend-cross': talendIcons['talend-cross'],
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

storiesOf('Badge', module)
	.addWithInfo('default', () => (
		<section>
			<IconsProvider defaultIcons={icons} />
			<div style={defaultStyle}>
				<div style={columnStyle}>
					<Badge label="Group A" {...onSelect('A')} />
					<Badge label={longStr} {...onSelect('B')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Group A" {...onDelete('A')} {...onSelect('A')} />
					<Badge label={longStr} {...onDelete('B')} {...onSelect('B')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Group A" {...onDelete('As')} {...onSelect('As')} selected />
					<Badge label={longStr} {...onDelete('Bs')} {...onSelect('Bs')} selected />
				</div>
				<div style={columnStyle}>
					<Badge label="Group A" {...onDelete('Ad')} disabled />
					<Badge label={longStr} {...onDelete('Bd')} disabled />
				</div>
			</div>
			<div style={defaultStyle}>
				<div style={columnStyle}>
					<Badge label="Little Gem Magnolia" category="Trees" {...onSelect('L')} />
					<Badge label="Mexican Plum" category="Trees" {...onSelect('M')} />
					<Badge label="Rose" category="Flowers" {...onSelect('R')} />
					<Badge label="Dog" category="Animals" {...onSelect('D')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Little Gem Magnolia" category="Trees" {...onDelete('L')} {...onSelect('L')} />
					<Badge label="Mexican Plum" category="Trees" {...onDelete('M')} {...onSelect('M')} />
					<Badge label="Rose" category="Flowers" {...onDelete('R')} {...onSelect('R')} />
					<Badge label="Dog" category="Animals" {...onDelete('D')} {...onSelect('D')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Little Gem Magnolia" category="Trees" {...onDelete('Ls')} {...onSelect('Ls')} selected />
					<Badge label="Mexican Plum" category="Trees" {...onDelete('Ms')} {...onSelect('Ms')} selected />
					<Badge label="Rose" category="Flowers" {...onDelete('Rs')} {...onSelect('Rs')} selected />
					<Badge label="Dog" category="Animals" {...onDelete('Ds')} {...onSelect('Ds')} selected />
				</div>
				<div style={columnStyle}>
					<Badge label="Little Gem Magnolia" category="Trees" {...onDelete('Ld')} {...onSelect('Ld')} disabled />
					<Badge label="Mexican Plum" category="Trees" {...onDelete('Md')} {...onSelect('Md')} disabled />
					<Badge label="Rose" category="Flowers" {...onDelete('Rd')} {...onSelect('Rd')} disabled />
					<Badge label="Dog" category="Animals" {...onDelete('Dd')} {...onSelect('Dd')} disabled />
				</div>
			</div>
		</section>
	));
