/* eslint-disable react/no-unused-prop-types */
import { useControl, UseControlReturns } from '../../../useControl';
import { StackVertical } from '../../Stack';
import { createContext } from 'react';

export type TabsProviderPropTypes = {
	defaultActiveKey?: string;
	activeKey?: string;
	onSelect?: (event: any, key: string) => void;
	size?: string;
	id?: string;
};

type WithChildren = {
	children: React.ReactNode[];
};

export const TabsInternalContext = createContext<
	(UseControlReturns<string> & { size?: string }) | null
>(null);

export function TabsProvider(props: TabsProviderPropTypes & WithChildren) {
	const controlled = useControl<string>(props, {
		valueKey: 'activeKey',
		defaultValueKey: 'defaultActiveKey',
		onChangeKey: 'onSelect',
		defaultValue: '',
		selector: (e: any, id: string) => {
			return id;
		},
	});
	return (
		<nav id={props.id}>
			<StackVertical gap={0}>
				<TabsInternalContext.Provider value={{ size: props.size, ...controlled }}>
					{props.children}
				</TabsInternalContext.Provider>
			</StackVertical>
		</nav>
	);
}
