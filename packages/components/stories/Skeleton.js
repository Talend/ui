import React from 'react';
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import Skeleton, { SKELETON_SIZES, SKELETON_TYPES } from '../src/Skeleton';
import IconProvider from '../src/IconsProvider';

const stories = storiesOf(Skeleton.displayName, module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

const icons = {
	'talend-locked': talendIcons['talend-locked'],
};

stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.addWithInfo('default', () => (
		<div>
			<IconProvider defaultIcons={icons} />
			<h4>Circles :</h4>
			<div>small</div>
			<Skeleton type={SKELETON_TYPES.circle} size={SKELETON_SIZES.small} />
			<div>medium</div>
			<Skeleton type={SKELETON_TYPES.circle} size={SKELETON_SIZES.medium} />
			<div>large</div>
			<Skeleton type={SKELETON_TYPES.circle} size={SKELETON_SIZES.large} />
			<div>custom size override class definition </div>
			<Skeleton type={SKELETON_TYPES.circle} size={SKELETON_SIZES.small} width={50} height={50} />

			<h4>Texts :</h4>
			<div>small:</div>
			<Skeleton type={SKELETON_TYPES.text} size={SKELETON_SIZES.small} />
			<div>medium:</div>
			<Skeleton type={SKELETON_TYPES.text} size={SKELETON_SIZES.medium} />
			<div>large:</div>
			<Skeleton type={SKELETON_TYPES.text} size={SKELETON_SIZES.large} />
			<div>extra-large:</div>
			<Skeleton type={SKELETON_TYPES.text} size={SKELETON_SIZES.xlarge} />
			<div>custom width:</div>
			<Skeleton type={SKELETON_TYPES.text} size={SKELETON_SIZES.small} width={400} />

			<h4>Button: </h4>
			<Skeleton type={SKELETON_TYPES.button} />

			<h4>Icons :</h4>
			<Skeleton type={SKELETON_TYPES.icon} name="talend-locked" />
		</div>
	));
