import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import style from '../StepperForm.module.css';
const StepHeader = ({ title, subtitle }) => {
	return /* @__PURE__ */ jsxs(Fragment, {
		children: [
			/* @__PURE__ */ jsx('h2', {
				className: style['stepper-form__header__title'],
				children: title,
			}),
			subtitle &&
				/* @__PURE__ */ jsx('span', {
					className: style['stepper-form__header__subtitle'],
					children: subtitle,
				}),
		],
	});
};
export { StepHeader };
//# sourceMappingURL=StepHeader.component.js.map
