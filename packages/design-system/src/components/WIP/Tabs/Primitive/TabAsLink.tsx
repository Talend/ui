import { forwardRef, ReactElement, Ref } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import { DataAttributes } from '../../../../types';
import { StackHorizontal } from '../../../Stack';
import { SizedIcon } from '../../../Icon';

import styles from './TabStyles.module.scss';
import Tooltip from '../../../Tooltip';
import { TagDefault } from '../../../Tag';
import Linkable, { LinkableType } from '../../../Linkable';

type TabChildren = Omit<LinkableType, 'icon' | 'children' | 'as'> & {
	title: string;
	icon?: IconNameWithSize<'S'>;
	tag?: string | number;
	size?: 'M' | 'L';
	isActive?: boolean;
} & ({ tooltip?: string; as?: never } | { tooltip?: never; as?: ReactElement });

export type TabAsLinkProps = DataAttributes & TabChildren;

const TabComponent = forwardRef(
	(props: Omit<TabAsLinkProps, 'tooltip'>, ref: Ref<HTMLAnchorElement>) => {
		const { icon, title, tag, size, isActive, as = 'a', ...rest } = props;
		return (
			<Linkable
				{...rest}
				as={as}
				ref={ref}
				aria-selected={isActive}
				className={classnames(styles.tab, { [styles.tab_large]: size === 'L' })}
			>
				<StackHorizontal gap="XXS" align="center" display="inline">
					{icon && <SizedIcon size="S" name={icon} />}
					<span className={styles.tab__copy}>{title}</span>
					{tag && <TagDefault>{tag}</TagDefault>}
				</StackHorizontal>
			</Linkable>
		);
	},
);

const TabAsLink = forwardRef((props: TabAsLinkProps, ref: Ref<HTMLAnchorElement>) => {
	const { tooltip, ...otherProps } = props;

	if (tooltip) {
		return (
			<Tooltip title={tooltip}>
				<TabComponent {...otherProps} ref={ref} />
			</Tooltip>
		);
	}

	return <TabComponent {...otherProps} ref={ref} />;
});

TabAsLink.displayName = 'TabAsLink';

export default TabAsLink;
