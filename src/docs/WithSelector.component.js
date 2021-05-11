import React from 'react';

const WithSelector = ({ children, selector }) => {
	const [className, setClassName] = React.useState('');
	const [styles, setStyles] = React.useState([]);
	const ref = React.useRef();

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
		const newStyles = [];
		for (const styleSheet of styleSheets) {
			for (const cssRule of styleSheet.cssRules) {
				for (const [fullSelector, newFullSelector] of selectors) {
					if (cssRule.selectorText?.startsWith(fullSelector)) {
						newStyles.push(
							`${cssRule.selectorText.replace(fullSelector, newFullSelector)} { ${
								cssRule.style.cssText
							}}`,
						);
						newClassName = newFullSelector.substring(1);
					}
				}
			}
		}
		if (newClassName && newStyles.length) {
			setClassName(newClassName);
			setStyles(newStyles);
		}
	}, [ref, selector]);

	return (
		<>
			{styles && <style>{styles.join(' ')}</style>}
			{React.cloneElement(children, {
				ref,
				className,
			})}
		</>
	);
};

export default WithSelector;
