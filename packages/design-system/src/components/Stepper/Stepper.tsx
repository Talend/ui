import classnames from 'classnames';
import { Children, cloneElement, forwardRef, ReactElement, Ref } from 'react';
import { isElement } from 'react-is';

import ProgressHorizontal from './Progress/variations/Progress.horizontal';
import ProgressVertical from './Progress/variations/Progress.vertical';

import styles from './Stepper.module.scss';

export type StepperOrientation = 'horizontal' | 'vertical';

export type StepperProps = {
	currentStepIndex?: number;
	orientation?: StepperOrientation;
	children: ReactElement | ReactElement[];
	loading?: boolean;
};

const Stepper = forwardRef(
	(
		{ currentStepIndex = 0, children, orientation = 'vertical', loading, ...rest }: StepperProps,
		ref: Ref<HTMLDivElement>,
	) => {
		const value = currentStepIndex + 1;
		const max = Children.count(children);

		return (
			<div
				className={classnames(styles.stepper, [styles[`stepper_${orientation}`]])}
				{...rest}
				ref={ref}
			>
				{orientation === 'vertical' && <ProgressVertical value={value} max={max} />}
				{orientation === 'horizontal' && <ProgressHorizontal value={value} max={max} />}
				<ol className={styles.stepper__steps}>
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
