import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import { DataAttributes } from '../../../types';
import { StackHorizontal } from '../../Stack';
import { SizedIcon } from '../../Icon';

import styles from './TabStyles.module.scss';
import Tooltip from '../../Tooltip';
import { TagDefault } from '../../Tag';
import { TabStateReturn } from './TabState';

type TabChildren =
	| {
			title: string;
			icon?: IconNameWithSize<'S'>;
			tag?: string | number;
	  }
	| { children: ReactNode };

type TabSize = {
	size?: 'M' | 'L';
};

type TabTooltip = {
	tooltip?: string;
};

export type TabPropsTypesWithoutState = DataAttributes &
	Omit<HTMLAttributes<HTMLButtonElement>, 'content' | 'className' | 'style' | 'type'> &
	TabSize &
	TabTooltip &
	TabChildren & {
		id: string;
	};

type TabPropsTypes = TabPropsTypesWithoutState & TabStateReturn;

const Tab = forwardRef((props: TabPropsTypes, ref: Ref<HTMLButtonElement>) => {
	const { tooltip, ...otherProps } = props;
	const component = () => {
		if ('children' in otherProps) {
			const { children, size, setSelectedId, selectedId, id, tabs, ...rest } = otherProps;
			return (
				// eslint-disable-next-line jsx-a11y/role-supports-aria-props
				<button
					{...rest}
					onClick={() => setSelectedId(id)}
					tabIndex={selectedId === id ? 0 : -1}
					aria-controls={id}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-selected={selectedId === id}
					type="button"
					ref={ref}
					className={classnames(styles.tab, { [styles.tab_large]: size === 'L' })}
				>
					<span className={styles.tab__copy}>{children}</span>
				</button>
			);
		}

		const { icon, title, tag, size, setSelectedId, selectedId, id, ...rest } = otherProps;
		return (
			// eslint-disable-next-line jsx-a11y/role-supports-aria-props
			<button
				{...rest}
				onClick={() => setSelectedId(id)}
				tabIndex={selectedId === id ? 0 : -1}
				aria-controls={id}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-selected={selectedId === id}
				type="button"
				ref={ref}
				className={classnames(styles.tab, { [styles.tab_large]: size === 'L' })}
			>
				<StackHorizontal gap="XXS" align="center" display="inline">
					{icon && <SizedIcon size="S" name={icon} />}
					<span className={styles.tab__copy}>{title}</span>
					{tag && <TagDefault>{tag}</TagDefault>}
				</StackHorizontal>
			</button>
		);
	};

	if (tooltip) {
		return <Tooltip title={tooltip}>{component()}</Tooltip>;
	}

	return component();
});

Tab.displayName = 'Tab';

export default Tab;
