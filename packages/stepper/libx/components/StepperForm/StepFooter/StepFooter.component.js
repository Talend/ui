import { jsx, jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary, ButtonSecondary, Divider, StackHorizontal } from '@talend/design-system';
import I18N from '../../../constants/i18n';
import { StepperFormContext } from '../StepperForm.context';
import style from '../StepperForm.module.css';
const StepFooter = ({ children, dataFeature, isLoading, onCancel, onPrevious, onNext }) => {
	const { t } = useTranslation(I18N.STEPPER_NAMESPACE);
	const { currentStep, steps } = useContext(StepperFormContext);
	const currentStepNavigation = steps[currentStep].navigation;
	return /* @__PURE__ */ jsx('div', {
		className: style['stepper-form__footer'],
		children: /* @__PURE__ */ jsxs(StackHorizontal, {
			gap: 'M',
			align: 'center',
			children: [
				/* @__PURE__ */ jsx(ButtonSecondary, {
					onClick: onCancel,
					'data-feature': dataFeature?.cancel,
					children: t('CANCEL', 'Cancel'),
				}),
				/* @__PURE__ */ jsx(Divider, { orientation: 'vertical' }),
				onPrevious &&
					/* @__PURE__ */ jsx(ButtonSecondary, {
						onClick: onPrevious,
						'data-feature': dataFeature?.previous,
						children: t('PREVIOUS', 'Previous'),
					}),
				children,
				onNext &&
					/* @__PURE__ */ jsx(ButtonPrimary, {
						onClick: onNext,
						'data-feature': dataFeature?.next,
						disabled: isLoading,
						children: currentStepNavigation?.next ? t('NEXT', 'Next') : t('VALIDATE', 'Validate'),
					}),
			],
		}),
	});
};
export { StepFooter };
//# sourceMappingURL=StepFooter.component.js.map
