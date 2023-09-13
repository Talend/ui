import { forwardRef, isValidElement } from 'react';
import type { Ref, ReactChild, ReactText, ReactElement } from 'react';

import classnames from 'classnames';

import { IconNameWithSize } from '@talend/icons';

import { mergeRefs } from '../../../mergeRef';
import { DataAttributes } from '../../../types';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';
import { TagDefault } from '../../Tag';
import Tooltip from '../../Tooltip';
import { TooltipChildrenFnProps, TooltipChildrenFnRef } from '../../Tooltip/Tooltip';

import styles from './TabStyles.module.scss';

type TabTitleProps = {
	icon?: IconNameWithSize<'S'>;
	tag?: string | number;
};

// --------------------------------------------------
// Built-in title (This comes from inside !)
// --------------------------------------------------

type BuiltInTitleProps = TabTitleProps & {
	children: ReactText;
};

const BuiltInTitle = ({ children, icon, tag }: BuiltInTitleProps) => {
	return (
		<StackHorizontal gap="XXS" align="center" display="inline">
			{icon && <SizedIcon size="S" name={icon} />}
			<span className={styles.tab__copy}>{children}</span>
			{tag && <TagDefault>{tag}</TagDefault>}
		</StackHorizontal>
	);
};

// --------------------------------------------------
// Extraneous title (This comes from outside !)
// --------------------------------------------------

type ExtraneousTitleProps = {
	children: ReactElement;
};

const ExtraneousTitle = ({ children }: ExtraneousTitleProps) => {
	return <span className={styles.tab__copy}>{children}</span>;
};

// --------------------------------------------------
// Tab component (Main component)
// --------------------------------------------------

export type TapProps = DataAttributes &
	TabTitleProps & {
		children: ReactChild;
		id: string;
		onClickTab?: (tabId: string) => void;
		size?: 'M' | 'L';
		tooltip?: string;
	};

const TabNavigation = forwardRef(
	(
		{ children, icon, id, onClickTab, size, tag, tooltip, ...dataAttributes }: TapProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		const component = (
			triggerProps?: TooltipChildrenFnProps,
			triggerRef?: TooltipChildrenFnRef,
		) => {
			return (
				<button
					{...dataAttributes}
					{...triggerProps}
					// aria-controls={id}
					// aria-selected={selectedId === id}
					className={classnames(styles.tab, { [styles.tab_large]: size === 'L' })}
					onClick={() => onClickTab?.(id)}
					ref={mergeRefs([ref, triggerRef])}
					// tabIndex={selectedId === id ? 0 : -1}
					type="button"
				>
					{isValidElement(children) ? (
						<ExtraneousTitle>{children}</ExtraneousTitle>
					) : (
						<BuiltInTitle icon={icon} tag={tag}>
							{children as ReactText}
						</BuiltInTitle>
					)}
				</button>
			);
		};

		if (tooltip) {
			return <Tooltip title={tooltip}>{component}</Tooltip>;
		}

		return component();
	},
);

TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;
