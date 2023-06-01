import classNames from 'classnames';

type THEMES = Record<string, string>;
type ParamType = string | string[] | Record<string, boolean> | undefined;
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
export function getTheme(...cssThemes: THEMES[]) {
	return function applyTheme(...params: ParamType[]) {
		const classnamesParams = params.reduce((acc, param) => {
			if (Array.isArray(param)) {
				acc.push(...(param as string[]).map(element => applyTheme(element)));
			} else if (typeof param === 'object') {
				const newObj = Object.entries(param as Record<string, boolean>).reduce(
					(objAcc, [key, value]: [string, boolean]) => {
						// eslint-disable-next-line no-param-reassign
						objAcc[key] = value;
						cssThemes.forEach(cssTheme => {
							if (cssTheme[key]) {
								// eslint-disable-next-line no-param-reassign
								objAcc[cssTheme[key]] = value;
							}
						});
						return objAcc;
					},
					{} as Record<string, boolean>,
				);
				acc.push(newObj);
			} else if (typeof param === 'string') {
				acc.push(param);
				cssThemes.forEach(cssTheme => {
					if (cssTheme[param]) {
						acc.push(cssTheme[param]);
					}
				});
			}
			return acc;
		}, [] as ParamType[]);

		return classNames(...classnamesParams);
	};
}

export default getTheme;
