import React from 'react';
import { Args, ReactFramework, StoryContext, StoryFn } from '@storybook/react';

type Selector = ':hover' | ':focus' | ':active';

const WithSelector = ({
	children,
	selector,
}: React.PropsWithChildren<any> & { selector: Selector }) => {
	const [className, setClassName] = React.useState<string>('');
	const [styles, setStyles] = React.useState<string[]>([]);
	const ref = React.useRef<HTMLElement>();

	React.useEffect(() => {
		if (!ref.current) return;
		setStyles([]);
		const selectors = Array.from(ref.current.classList).map(clazz => {
			const fullSelector = `.${clazz}${selector}`;
			const newFullSelector = fullSelector.replace(':', '--');
			return [fullSelector, newFullSelector];
		});
		const styleSheets = Array.from(document.styleSheets).filter(
			styleSheet => !styleSheet.href || styleSheet.href.startsWith(window.location.origin),
		);
		let newClassName;
		const newStyles: string[] = [];
		styleSheets.forEach(styleSheet => {
			Array.from(styleSheet.cssRules).forEach(cssRule => {
				selectors.forEach(([fullSelector, newFullSelector]) => {
					if ((cssRule as CSSStyleRule).selectorText?.startsWith(fullSelector)) {
						newStyles.push(
							`${(cssRule as CSSStyleRule).selectorText.replace(fullSelector, newFullSelector)} { ${
								(cssRule as CSSStyleRule).style.cssText
							}}`,
						);
						newClassName = newFullSelector.substring(1);
					}
				});
			});
		});
		if (newClassName && newStyles.length) {
			setClassName(newClassName);
			setStyles(newStyles);
		}
	}, [ref.current, selector]);

	React.useEffect(() => {
		if (!ref.current) return;
		ref.current.className = `${ref.current.className} ${className}`;
	}, [ref, className]);

	return (
		<>
			{styles && <style>{styles.join(' ')}</style>}
			{React.cloneElement(children, {
				ref,
			})}
		</>
	);
};

WithSelector.decorator =
	(selector: Selector) => (storyFn: StoryFn, args: Args, context: StoryContext<ReactFramework>) =>
		<WithSelector selector={selector}>{storyFn(args, context)}</WithSelector>;

export default WithSelector;
