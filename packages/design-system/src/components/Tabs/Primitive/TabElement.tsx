import { FC, ReactElement, ReactText } from 'react';

import { IconNameWithSize } from '@talend/icons';

import { DataAttributes } from '../../../types';

export type TabTitleDefault = {
	title: ReactText;

	icon?: IconNameWithSize<'S'>;
	tag?: string | number;
	tooltip?: string;
};

export type TabTitleElement = {
	title: ReactElement<DataAttributes & HTMLElement>;

	icon?: never;
	tag?: never;
	tooltip?: never;
};

export type TabTitle = TabTitleDefault | TabTitleElement;

export type TabProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'title'> &
	DataAttributes &
	TabTitle & { id: string };

const Tab: FC<TabProps> = () => {
	return <div>I should not be rendered !</div>;
};

Tab.displayName = 'Tab';

export default Tab;
