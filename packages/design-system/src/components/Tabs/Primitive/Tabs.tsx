import { useContext } from 'react';
import { SizedIcon } from '../../Icon';
import { TagDefault } from '../../Tag';
import { StackHorizontal } from '../../Stack';
import { TabsInternalContext } from './TabsProvider';
import { Tooltip } from '../../Tooltip';
import style from './TabStyles.module.scss';
import { IconNameWithSize } from '@talend/icons';
import classNames from 'classnames';

export type TabsPropTypes = {
	children: React.ReactNode[];
};

export function Tabs({ children }: TabsPropTypes) {
	return (
		<ul className={style.tablist} role="tablist">
			{children}
		</ul>
	);
}
Tabs.displayName = 'Tabs';

export type TabPropTypes = {
	['aria-controls']: string;
	title: string;
	disabled?: boolean;
	icon?: IconNameWithSize<'S'>;
	tag?: string | number;
	tooltip?: string;
};

export function Tab(props: TabPropTypes) {
	const context = useContext(TabsInternalContext);
	const content = (
		<button
			role="tab"
			className={classNames(style.tab, { [style.tab_large]: context?.size === 'L' })}
			type="button"
			aria-selected={props['aria-controls'] === context?.value}
			onClick={e => context?.onChange(e, props['aria-controls'])}
			disabled={props.disabled}
		>
			<StackHorizontal gap="XXS" align="center" display="inline">
				{props.icon && <SizedIcon size="S" name={props.icon} />}
				<span className={style.tab__copy}>{props.title}</span>
				{props.tag && <TagDefault>{props.tag}</TagDefault>}
			</StackHorizontal>
		</button>
	);
	if (props.tooltip) {
		<li>
			<Tooltip title={props.tooltip}>{content}</Tooltip>
		</li>;
	}
	return <li>{content}</li>;
}
Tab.displayName = 'Tab';
