import classNames from 'classnames';

/**
 * This function take cssModules files & generate a function that you can use to
 * duplicate the classes: the generated from the css module & the generic allowing any host app
 * to override / extend the style
 * @param  {...object} cssThemes the css module you want to handle
 * @example {
 * // myScssFile.scss
 * .error {
 * 		color: red;
 * }
 *
 * // MyJsFile
 * import myCSS from './myScssFile.scss'
 * import { getTheme } from '../theme';
 *
 * const theme = getTheme(myCSS);
 * const rendererThing = <div className={theme('error', 'test')}></div>
 * // This will output -> <div class="error test error_X341DZ"/>
 * }
 */
export function getTheme(...cssThemes: string[]) {
	return function applyTheme(...params: any) {
		const classnamesParams = params.reduce((acc: any, param: any) => {
			if (Array.isArray(param)) {
				acc.push(...param.map(element => applyTheme(element)));
			} else if (typeof param === 'object') {
				const newObj = Object.entries(param).reduce((objAcc: any, [key, value]: [string, any]) => {
					// eslint-disable-next-line no-param-reassign
					objAcc[key] = value;
					cssThemes.forEach((cssTheme: any) => {
						if (cssTheme[key]) {
							// eslint-disable-next-line no-param-reassign
							objAcc[cssTheme[key]] = value;
						}
					});
					return objAcc;
				}, {});
				acc.push(newObj);
			} else if (typeof param === 'string') {
				acc.push(param);
				cssThemes.forEach((cssTheme: any) => {
					if (cssTheme[param]) {
						acc.push(cssTheme[param]);
					}
				});
			}
			return acc;
		}, []);

		return classNames(...classnamesParams);
	};
}

export default getTheme;
