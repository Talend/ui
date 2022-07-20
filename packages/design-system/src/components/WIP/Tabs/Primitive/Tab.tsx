import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import { Tab as ReakitTab, TabState } from 'reakit';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import { DataAttributes } from '../../../../types';
import { StackHorizontal } from '../../../Stack';
import { SizedIcon } from '../../../Icon';

import styles from './TabStyles.module.scss';
import Tooltip from '../../../Tooltip';
import { TagDefault } from '../../../Tag';

type TabChildren =
	| {
			title: string;
			icon?: IconNameWithSize<'S'>;
			tag?: string | number;
	  }
	| { children: string };

type TabSize = {
	size?: 'M' | 'L';
};

type TabTooltip = {
	tooltip?: string;
};

export type TabPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLButtonElement> &
	TabSize &
	TabTooltip &
	TabChildren;

type TabPropsTypes = TabPropsTypesWithoutState & TabState;

const Tab = forwardRef((props: TabPropsTypes, ref: Ref<HTMLButtonElement>) => {
	const { tooltip, ...otherProps } = props;

	const component = () => {
		if ('children' in otherProps) {
			const { children, size, ...rest } = otherProps;
			return (
				<ReakitTab
					{...rest}
					ref={ref}
					className={classnames(styles.tab, { [styles.tab_large]: size === 'L' })}
				>
					<span className={styles.tab__copy}>{children}</span>
				</ReakitTab>
			);
		}

		const { icon, title, tag, size, ...rest } = otherProps;
		return (
			<ReakitTab
				{...rest}
				ref={ref}
				className={classnames(styles.tab, { [styles.tab_large]: size === 'L' })}
			>
				<StackHorizontal gap="XXS" align="center" display="inline">
					{icon && <SizedIcon size="S" name={icon} />}
					<span className={styles.tab__copy}>{title}</span>
					{tag && <TagDefault>{tag}</TagDefault>}
				</StackHorizontal>
			</ReakitTab>
		);
	};

	if (tooltip) {
		return <Tooltip title={tooltip}>{component()}</Tooltip>;
	}

	return component();
});

Tab.displayName = 'Tab';

export default Tab;
