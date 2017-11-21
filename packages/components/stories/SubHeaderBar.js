import React from 'react';
import {
    // eslint-disable-line import/no-extraneous-dependencies
    action,
    storiesOf,
} from '@storybook/react';
import { IconsProvider, SubHeaderBar } from '../src/index';

const viewSubHeader = {
	iconFile: 'talend-file-csv-o',
	title: 'Marketing',
	subTitle: 'Creator John Doe',
};

const returnArrowProps = {
	id: 'returnArrow',
	icon: 'talend-arrow-left',
	onClick: action('return action'),
};

const props = {
	...viewSubHeader,
	returnAction: returnArrowProps,
};

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories.addWithInfo('default-dock and toggle', () => (
	<div>
		<IconsProvider />
		<SubHeaderBar {...props} />
	</div>
));
