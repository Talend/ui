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
		<StackHorizontal gap="M" role="tablist">
			{children}
		</StackHorizontal>
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
	let content = (
		<button
			role="tab"
			aria-selected={props['aria-controls'] === context?.value}
			className={classNames(style.tab, { [style.tab_large]: context?.size === 'L' })}
			onClick={e => context?.onChange(e, props['aria-controls'])}
			disabled={props.disabled}
			type="button"
		>
			<StackHorizontal gap="XXS" align="center" display="inline">
				{props.icon && <SizedIcon size="S" name={props.icon} />}
				<span className={style.tab__copy}>{props.title}</span>
				{props.tag && <TagDefault>{props.tag}</TagDefault>}
			</StackHorizontal>
		</button>
	);
	if (props.tooltip) {
		content = <Tooltip title={props.tooltip}>{content}</Tooltip>;
	}
	return content;
}
Tab.displayName = 'Tab';
