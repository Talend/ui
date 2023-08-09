import { StepHeaderProps } from './StepHeader.types';
import style from '../StepperForm.module.scss';

export const StepHeader = ({ title, subtitle }: StepHeaderProps) => {
	return (
		<>
			<h2 className={style['stepper-form__header__title']}>{title}</h2>
			{subtitle && <span className={style['stepper-form__header__subtitle']}>{subtitle}</span>}
		</>
	);
};
