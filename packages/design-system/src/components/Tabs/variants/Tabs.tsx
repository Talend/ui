import { Children, forwardRef, ReactElement, Ref } from 'react';

import { TabProps } from '../Primitive/TabElement';
import TabList from '../Primitive/TabList';
import TabNavigation from '../Primitive/TabNavigation';
import TabPanel from '../Primitive/TabPanel';

type TabElement = ReactElement<TabProps>;

export type TabsPropTypes = {
	children: TabElement | TabElement[];
	onSelectTab?: (tabId: string) => void;
	selectedTab?: string;
	size?: 'M' | 'L';
};

const renderTabNavigation = (
	child: TabElement,
	onSelectTab?: (tabId: string) => void,
	size?: 'M' | 'L',
) => {
	const { id, title, icon, tag, tooltip } = child.props;

	return (
		<TabNavigation
			key={id}
			icon={icon}
			id={id}
			onClickTab={onSelectTab}
			size={size}
			tag={tag}
			tooltip={tooltip}
		>
			{title}
		</TabNavigation>
	);
};

const renderTabPanel = (child: TabElement) => {
	const { id, children } = child.props;

	return (
		<TabPanel key={id} id={id}>
			{children}
		</TabPanel>
	);
};

const Tabs = forwardRef(
	({ children, onSelectTab, selectedTab, size }: TabsPropTypes, ref: Ref<HTMLDivElement>) => {
		return (
			<div ref={ref}>
				<TabList>
					{Children.map(children, child => {
						return renderTabNavigation(child, onSelectTab, size);
					})}
				</TabList>

				{Children.map(children, child => {
					// Only render selected tab
					return selectedTab === child.props.id ? renderTabPanel(child) : undefined;
				})}
			</div>
		);
	},
);

Tabs.displayName = 'Tabs';

export default Tabs;
