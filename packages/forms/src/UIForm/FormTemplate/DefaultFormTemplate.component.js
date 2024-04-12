import theme from '../UIForm.module.scss';

export default function DefaultFormTemplate({ widgetsRenderer, buttonsRenderer, children }) {
	return [
		<div className={theme['form-content']}>{widgetsRenderer()}</div>,
		children,
		buttonsRenderer(),
	];
}
