import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { Badge, IconsProvider } from '../src/';

const defaultStyle = {
	display: 'flex',
};

const greyBackgroundStyle = {
	'background-color': `rgba(246, 246, 246, 0.5)`,
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
			<h1>New visual</h1>
			<IconsProvider defaultIcons={icons} />
			<div style={defaultStyle} id="header">
				<div style={columnStyle}>
					<span>Tags as links</span>
				</div>
				<div style={columnStyle}>
					<span>Read-only</span>
				</div>
				<div style={columnStyle}>
					<span>Edit mode</span>
				</div>
				<div style={columnStyle}>
					<span>Edit mode with ellipsis</span>
				</div>
			</div>
			<hr />
			<div style={defaultStyle} id="default">
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.large} aslink {...onSelect('A')} />
					<br />
					<Badge label="Label" display={Badge.SIZES.small} aslink {...onSelect('B')} />
					<br />
					<Badge
						label="Categ not visible"
						display={Badge.SIZES.large}
						category="Cat"
						aslink
						{...onSelect('B')}
					/>
					<Badge
						label="Categ not visible"
						display={Badge.SIZES.small}
						category="Cat"
						aslink
						{...onSelect('B')}
					/>
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.large} {...onSelect('A')} />
					<br />
					<Badge label="Label" display={Badge.SIZES.small} {...onSelect('B')} />
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category="Cat"
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category="Cat"
						{...onSelect('B')}
						{...onDelete('A')}
					/>
				</div>
				<div style={columnStyle}>
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						edit
						{...onSelect('A')}
						{...onDelete('A')}
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
				</div>
				<div style={columnStyle}>
					<Badge
						label={longStr}
						display={Badge.SIZES.large}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.large}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.large}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
				</div>
			</div>
			<hr />
		</section>

		<section>
			<h1>New visual - Disabled</h1>
			<IconsProvider defaultIcons={icons} />
			<div style={defaultStyle} id="header">
				<div style={columnStyle}>
					<span>Tags as links</span>
				</div>
				<div style={columnStyle}>
					<span>Read-only</span>
				</div>
				<div style={columnStyle}>
					<span>Edit mode</span>
				</div>
				<div style={columnStyle}>
					<span>Edit mode with ellipsis</span>
				</div>
			</div>
			<hr />
			<div style={defaultStyle} id="default">
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.large} aslink {...onSelect('A')} disabled />
					<br />
					<Badge label="Label" display={Badge.SIZES.small} aslink {...onSelect('B')} disabled />
					<br />
					<Badge
						label="categ not visible"
						display={Badge.SIZES.large}
						category="Cat"
						aslink
						{...onSelect('B')}
						disabled
					/>
					<br />
					<Badge
						label="categ not visible"
						display={Badge.SIZES.small}
						category="Cat"
						aslink
						{...onSelect('B')}
						disabled
					/>
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.large} {...onSelect('A')} disabled />
					<br />
					<Badge label="Label" display={Badge.SIZES.small} {...onSelect('B')} disabled />
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category="Cat"
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category="Cat"
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
				</div>
				<div style={columnStyle}>
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						edit
						{...onSelect('A')}
						{...onDelete('A')}
						disabled
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<br />
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
				</div>
				<div style={columnStyle}>
					<Badge
						label={longStr}
						display={Badge.SIZES.large}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category="Cat"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.large}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category="Cat"
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label="Label"
						display={Badge.SIZES.large}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.large}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category={longStr}
						icon="talend-clock"
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
				</div>
			</div>
			<hr />
		</section>

		<section style={greyBackgroundStyle}>
			<h1>New visual - white background</h1>
			<IconsProvider defaultIcons={icons} />
			<div style={defaultStyle} id="header">
				<div style={columnStyle}>
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
				<div style={columnStyle}>
					<span>Edit mode with ellipsis</span>
				</div>
			</div>
			<hr />
			<div style={defaultStyle} id="default">
				<div style={columnStyle}>enabled</div>
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.small} white aslink {...onSelect('B')} />
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.small} white {...onSelect('B')} />
				</div>
				<div style={columnStyle}>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						white
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
				</div>
				<div style={columnStyle}>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category="Cat"
						white
						edit
						{...onSelect('B')}
						{...onDelete('A')}
					/>
				</div>
			</div>
			<hr />
			<div style={defaultStyle} id="default">
				<div style={columnStyle}>disabled</div>
				<div style={columnStyle}>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						white
						aslink
						{...onSelect('B')}
						disabled
					/>
				</div>
				<div style={columnStyle}>
					<Badge label="Label" display={Badge.SIZES.small} white {...onSelect('B')} disabled />
				</div>
				<div style={columnStyle}>
					<Badge
						label="Label"
						display={Badge.SIZES.small}
						white
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
				</div>
				<div style={columnStyle}>
					<Badge
						label={longStr}
						display={Badge.SIZES.small}
						category="Cat"
						white
						edit
						{...onSelect('B')}
						{...onDelete('A')}
						disabled
					/>
				</div>
			</div>
			<hr />
		</section>

		<section>
			<h1>Old Examples</h1>
			<IconsProvider defaultIcons={icons} />
			<div style={defaultStyle} id="header">
				<div style={columnStyle}>
					<span>Read Only</span>
				</div>
				<div style={columnStyle}>
					<span>With delete</span>
				</div>
				<div style={columnStyle}>
					<span>Selected</span>
				</div>
				<div style={columnStyle}>
					<span>Disabled</span>
				</div>
			</div>
			<hr />
			<div style={defaultStyle} id="default">
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
			<div style={defaultStyle} id="category">
				<div style={columnStyle}>
					<Badge label="Little Gem Magnolia" category="Trees" {...onSelect('L')} />
					<Badge label="Mexican Plum" category="Trees" {...onSelect('M')} />
					<Badge label="Rose" category="Flowers" {...onSelect('R')} />
					<Badge label="Dog" category="Animals" {...onSelect('D')} />
				</div>
				<div style={columnStyle}>
					<Badge
						label="Little Gem Magnolia"
						category="Trees"
						{...onDelete('L')}
						{...onSelect('L')}
					/>
					<Badge label="Mexican Plum" category="Trees" {...onDelete('M')} {...onSelect('M')} />
					<Badge label="Rose" category="Flowers" {...onDelete('R')} {...onSelect('R')} />
					<Badge label="Dog" category="Animals" {...onDelete('D')} {...onSelect('D')} />
				</div>
				<div style={columnStyle}>
					<Badge
						label="Little Gem Magnolia"
						category="Trees"
						{...onDelete('Ls')}
						{...onSelect('Ls')}
						selected
					/>
					<Badge
						label="Mexican Plum"
						category="Trees"
						{...onDelete('Ms')}
						{...onSelect('Ms')}
						selected
					/>
					<Badge label="Rose" category="Flowers" {...onDelete('Rs')} {...onSelect('Rs')} selected />
					<Badge label="Dog" category="Animals" {...onDelete('Ds')} {...onSelect('Ds')} selected />
				</div>
				<div style={columnStyle}>
					<Badge
						label="Little Gem Magnolia"
						category="Trees"
						{...onDelete('Ld')}
						{...onSelect('Ld')}
						disabled
					/>
					<Badge
						label="Mexican Plum"
						category="Trees"
						{...onDelete('Md')}
						{...onSelect('Md')}
						disabled
					/>
					<Badge label="Rose" category="Flowers" {...onDelete('Rd')} {...onSelect('Rd')} disabled />
					<Badge label="Dog" category="Animals" {...onDelete('Dd')} {...onSelect('Dd')} disabled />
				</div>
			</div>
		</section>
	</React.Fragment>
));
