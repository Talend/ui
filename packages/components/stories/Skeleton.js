import React from 'react';
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import Skeleton from '../src/Skeleton';
import IconProvider from '../src/IconsProvider';

const stories = storiesOf('Skeleton', module);
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
			<Skeleton type="circle" size="small" />
			<div>medium</div>
			<Skeleton type="circle" size="medium" />
			<div>large</div>
			<Skeleton type="circle" size="large" />
			<div>custom</div>
			<Skeleton type="circle" size="small" width={50} height={50} />

			<h4>Texts :</h4>
			<div>small:</div>
			<Skeleton type="text" size="small" />
			<div>medium:</div>
			<Skeleton type="text" size="medium" />
			<div>large:</div>
			<Skeleton type="text" size="large" />
			<div>extra-large:</div>
			<Skeleton type="text" size="extra-large" />
			<div>custom width:</div>
			<Skeleton type="text" size="extra-large" width={400} />

			<h4>Button: </h4>
			<Skeleton type="button" />

			<h4>Icons :</h4>
			<Skeleton type="icon" name="talend-locked" />
		</div>
	));
