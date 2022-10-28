import React, {
	Children,
	cloneElement,
	forwardRef,
	ReactElement,
	Ref,
	useEffect,
	useRef,
	useState,
} from 'react';
import classnames from 'classnames';
import { isElement } from 'react-is';

import ProgressVertical from './Progress/variations/Progress.vertical';
import ProgressHorizontal from './Progress/variations/Progress.horizontal';

import styles from './Stepper.module.scss';

export type StepperOrientation = 'horizontal' | 'vertical';

export type StepperProps = {
	orientation?: StepperOrientation;
	children: ReactElement | ReactElement[];
	loading?: boolean;
};

const Stepper = forwardRef(
	(
		{ children, orientation = 'vertical', loading, ...rest }: StepperProps,
		ref: Ref<HTMLDivElement>,
	) => {
		const listRef = useRef<null | HTMLOListElement>(null);
		const [progressIndex, setProgressIndex] = useState(0);

		useEffect(() => {
			// Find the last active step in the list and store its index
			const listEntries = listRef.current ? Array.from(listRef.current.children) : [];
			const indexOfProgress = listEntries.map(entry => entry.ariaCurrent).lastIndexOf('step');
			setProgressIndex(indexOfProgress);
		}, []);

		const value = progressIndex + 1;
		const max = Children.count(children);

		return (
			<div
				className={classnames(styles.stepper, [styles[`stepper_${orientation}`]])}
				{...rest}
				ref={ref}
			>
				{orientation === 'vertical' && <ProgressVertical value={value} max={max} />}
				{orientation === 'horizontal' && <ProgressHorizontal value={value} max={max} />}
				<ol className={styles.stepper__steps} ref={listRef}>
					{children &&
						Children.map(
							children,
							(child, index) =>
								isElement(child) && (
									<>
										{cloneElement(child, {
											'data-index': index + 1,
											orientation: orientation === 'horizontal' ? 'vertical' : 'horizontal',
										})}
									</>
								),
						)}
				</ol>
			</div>
		);
	},
);

Stepper.displayName = 'Stepper';

export default Stepper;
