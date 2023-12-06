import React, { Fragment, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';

import { FloatingArrow, FloatingPortal, Placement } from '@floating-ui/react';
import classNames from 'classnames';

import tokens from '@talend/design-tokens';

import { renderOrClone } from '../../renderOrClone';
import { usePopover } from './usePopover';

import theme from './Popover.module.scss';

type PopoverOptions = {
	initialOpen?: boolean;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	isFixed?: boolean;
	onOpenChange?: (open: boolean) => void;
	hasPadding?: boolean;
};

export type PopoverProps = {
	disclosure: ReactNode;
	children: ReactNode | ((props: any) => ReactNode);
} & PopoverOptions;

export type PopoverStateReturn = {
	hide: () => void;
};

export function Popover({
	children,
	modal = true,
	isFixed = false,
	disclosure,
	hasPadding = true,
	...restOptions
}: PopoverProps) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const arrowRef = useRef<SVGSVGElement>(null);
	const popover = usePopover({ modal, arrowRef, ...restOptions });

	const Wrapper = isFixed ? FloatingPortal : Fragment;
	const onClick = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	let childrenProps = popover.getReferenceProps({ onClick });
	if (disclosure && React.isValidElement(disclosure)) {
		childrenProps = popover.getReferenceProps({ onClick, ...disclosure.props });
	}

	return (
		<>
			{renderOrClone(disclosure, { ...childrenProps, ref: popover.refs.setReference })}
			<Wrapper>
				<div
					ref={popover.refs.setFloating}
					className={classNames(theme.popover, { [theme.withPadding]: hasPadding })}
					style={{ ...popover.floatingStyles, display: popover.open ? 'block' : 'none' }}
					aria-labelledby={popover.labelId}
					aria-describedby={popover.descriptionId}
					{...popover.getFloatingProps(restOptions)}
				>
					<FloatingArrow
						ref={arrowRef}
						context={popover.context}
						strokeWidth={1}
						stroke={tokens.coralColorIllustrationShadow}
						fill={tokens.coralColorNeutralBackground}
					/>
					{typeof children === 'function'
						? children({
								...popover.getFloatingProps(),
								open: popover.open,
								setOpen: popover.setOpen,
								hide: () => popover.setOpen(false),
						  })
						: children}
				</div>
			</Wrapper>
		</>
	);
}
