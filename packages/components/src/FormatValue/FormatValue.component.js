import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import I18N_DOMAIN_COMPONENTS from '../constants';

import theme from './FormatValue.module.scss';

export const REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS = /(^\s*)?([\s\S]*?)(\s*$)/;
const REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS = /(\t| |\n)/g;
const REG_EXP_CAPTUR_LINE_FEEDING = /(\n)/g;
const REG_EXP_LINE_FEEDING = /\n/;
const REG_EXP_WHITE_SPACE_CHARACTERS = /^\s+/;

/**
 * replaceCharacterByIcon - replace a character by the corresponding icon
 *
 * @param  {string} value string to transform
 * @return {Component}    component with the replaced special characters by icon
 */
function replaceCharacterByIcon(value, index, t) {
	switch (value) {
		case '\t':
			return (
				<Icon
					key={index}
					aria-label={t('FORMAT_VALUE_TAB_CHARACTER', { defaultValue: 'tab character' })}
					className={classNames(
						theme['td-white-space-character'],
						theme['td-tab-character'],
						'td-white-space-character',
					)}
					name="talend-empty-cell"
				/>
			);
		case ' ':
			return (
				<Icon
					key={index}
					aria-label={t('FORMAT_VALUE_SPACE_CHARACTER', { defaultValue: 'space character' })}
					className={classNames(theme['td-white-space-character'], 'td-white-space-character')}
					name="talend-empty-space"
				/>
			);
		case '\n':
			return (
				<span key={index}>
					<Icon
						aria-label={t('FORMAT_VALUE_LINE_FEEDING_CHARACTER', {
							defaultValue: 'line feeding character',
						})}
						className={classNames(theme['td-white-space-character'], 'td-white-space-character')}
						name="talend-carriage-return"
					/>
				</span>
			);
		default:
			const whitespaces = value.match(REG_EXP_WHITE_SPACE_CHARACTERS)?.[0];
			return (
				<>
					{whitespaces &&
						[...whitespaces]?.map(() => (
							<Icon
								key={index}
								aria-label={t('FORMAT_VALUE_WHITE_SPACE_CHARACTER', {
									defaultValue: 'whitespace character',
								})}
								className={classNames(
									theme['td-white-space-character'],
									theme['td-other-characters'],
									'td-white-space-character',
								)}
								name="talend-empty-char"
							/>
						))}
					<span key={index} className={classNames(theme['td-value'], 'td-value')}>
						{value.trimStart()}
					</span>
				</>
			);
	}
}

/**
 * isEmptyCharacter - filter function to remove unused character
 *
 * @param  {string} value string to filter
 * @return {string}       string (truthly if no empty)
 */
function isEmptyCharacter(value) {
	return value;
}

const SPLIT_REGEX = [
	REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
	REG_EXP_CAPTUR_LINE_FEEDING,
	REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
];

export function FormatValueComponent({ value, className }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	let formattedValue = value;
	if (typeof value === 'string') {
		const hiddenCharsRegExpMatch = value.match(REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS);
		if (
			hiddenCharsRegExpMatch[1] ||
			hiddenCharsRegExpMatch[3] ||
			REG_EXP_LINE_FEEDING.test(value)
		) {
			formattedValue = hiddenCharsRegExpMatch
				.slice(1)
				.flatMap((flatMapValue, index) => flatMapValue?.split(SPLIT_REGEX[index]))
				.filter(isEmptyCharacter)
				.map((mappedValue, index) => replaceCharacterByIcon(mappedValue, index, t));
		}
	}
	return <span className={className}>{formattedValue}</span>;
}

FormatValueComponent.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
};

export default FormatValueComponent;

// const value = '<?xml version="1.0" encoding="UTF-8"?>\n<ServiceResponse xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://qualysapi.qualys.com/qps/xsd/version.xsd">\n  <responseCode>SUCCESS</responseCode>\n  <count>1</count>\n  <data>\n    <Portal-Version>\n      <PortalApplication-VERSION>3.16.0.0-9 OFFICIAL #127 (2023-08-29T14:15:40Z)</PortalApplication-VERSION>\n      <QWEB__VM-VERSION>2.16.0-2</QWEB__VM-VERSION>\n      <CA-VERSION>3.16.0.1</CA-VERSION>\n    </Portal-Version>\n    <QWeb-Version>\n      <WEB-VERSION>10.23.3.0-2</WEB-VERSION>\n      <SCANNER-VERSION>12.15.57-1</SCANNER-VERSION>\n      <VULNSIGS-VERSION>2.5.889-3</VULNSIGS-VERSION>\n    </QWeb-Version>\n  </data>\n</ServiceResponse>');
