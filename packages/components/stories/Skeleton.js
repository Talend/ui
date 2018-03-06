import React from 'react';
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import Skeleton from '../src/Skeleton';
import IconProvider from '../src/IconsProvider';

import theme from './Skeleton.scss';

const stories = storiesOf(Skeleton.displayName, module);
const icons = {
	'talend-locked': talendIcons['talend-locked'],
	'talend-table': talendIcons['talend-table'],
};

if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			<IconProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => (
		<div>
			<h4>Circles :</h4>
			<div>small</div>
			<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} />
			<div>medium</div>
			<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.medium} />
			<div>large</div>
			<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.large} />
			<div>custom size override class definition </div>
			<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} width={50} height={50} />

			<h4>Texts :</h4>
			<div>small:</div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
			<div>medium:</div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.medium} />
			<div>large:</div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<div>extra-large:</div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.xlarge} />
			<div>custom width:</div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} width={400} />

			<h4>Button: </h4>
			<Skeleton type={Skeleton.TYPES.button} />

			<h4>Icons :</h4>
			<Skeleton type={Skeleton.TYPES.icon} name="talend-locked" />
			<h4>Icons with custom css:</h4>
			<Skeleton
				type={Skeleton.TYPES.icon}
				name="talend-table"
				className={theme['skeleton-96x96']}
			/>
		</div>
	));
