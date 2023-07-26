import { StepperFormHeaderProps } from './StepperFormHeader.types';
import style from '../StepperForm.module.scss';

export const StepperFormHeader = ({ title, subtitle }: StepperFormHeaderProps) => {
	return (
		<>
			<h2 className={style['stepper-form__header__title']}>{title}</h2>
			{subtitle && <span className={style['stepper-form__header__subtitle']}>{subtitle}</span>}
		</>
	);
};
