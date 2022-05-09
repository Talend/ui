import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import I18N_DOMAIN_COMPONENTS from '../constants';
import theme from './FormatValue.scss';

export const REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS = /(^\s*)?([\s\S]*?)(\s*$)/;
export const REG_EXP_HAS_WHITE_SPACE_CHARACTERS = /(^\s*)?([\s\S]*?)(\s*$)/;
const REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS = /(\t| |\n)/g;
const REG_EXP_CAPTUR_LINE_FEEDING = /(\n)/g;
const REG_EXP_LINE_FEEDING = /\n/;
const REG_EXP_WHITE_SPACE_CHARACTERS = /^\s/;

/**
 * replaceCharacterByIcon - replace a character by the corresponding icon
 *
 * @param  {string} value string to transform
 * @return {Component}    component with the replaced special characters by icon
 */
function replaceCharacterByIcon(value, t) {
	switch (value) {
		case '\t':
			return (
				<Icon
					key={value}
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
					key={value}
					aria-label={t('FORMAT_VALUE_SPACE_CHARACTER', { defaultValue: 'space character' })}
					className={classNames(theme['td-white-space-character'], 'td-white-space-character')}
					name="talend-empty-space"
				/>
			);
		case '\n':
			return (
				<span>
					<Icon
						key={value}
						aria-label={t('FORMAT_VALUE_LINE_FEEDING_CHARACTER', {
							defaultValue: 'line feeding character',
						})}
						className={classNames(theme['td-white-space-character'], 'td-white-space-character')}
						name="talend-carriage-return"
					/>
					{'\n'}
				</span>
			);
		default:
			if (REG_EXP_WHITE_SPACE_CHARACTERS.test(value)) {
				return (
					<Icon
						key={value}
						aria-label={t('FORMAT_VALUE_WHITE_SPACE_CHARACTER', {
							defaultValue: 'white space character',
						})}
						className={classNames(
							theme['td-white-space-character'],
							theme['td-other-characters'],
							'td-white-space-character',
						)}
						name="talend-empty-char"
					/>
				);
			}
			return (
				<span key={value} className={classNames(theme['td-value'], 'td-value')}>
					{value}
				</span>
			);
	}
}

/**
 * hasWhiteSpaceCharacters - test a string if there are empty space trailing/leading or line feeding
 *
 * @param  {string} value string to test
 * @return {boolean}       indicate if the string to test has white space
 */
export function hasWhiteSpaceCharacters(value) {
	if (!value || typeof value !== 'string') {
		return false;
	}

	const hiddenCharsRegExpMatch = value.match(REG_EXP_HAS_WHITE_SPACE_CHARACTERS);

	if (hiddenCharsRegExpMatch[1] || hiddenCharsRegExpMatch[3]) {
		return true;
	}

	return REG_EXP_LINE_FEEDING.test(value);
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

/**
 * replaceWhiteCharacters - description
 *
 * @param  {string} content string part to replace by corresponding HTML
 * @param  {RegExp} regexp  string to replace
 * @return {array}          replaced content
 */
function replaceWhiteCharacters(content, regexp, t) {
	const splitting = content.split(regexp);
	return splitting.filter(isEmptyCharacter).map(value => replaceCharacterByIcon(value, t));
}

export function FormatValueComponent({ value, className }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	let formattedValue = value;
	if (hasWhiteSpaceCharacters(value)) {
		formattedValue = [];
		const hiddenCharsRegExpMatch = value.match(REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS);

		if (hiddenCharsRegExpMatch[1]) {
			formattedValue = replaceWhiteCharacters(
				hiddenCharsRegExpMatch[1],
				REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
				t,
			);
		}

		if (hiddenCharsRegExpMatch[2]) {
			const formattedContent = replaceWhiteCharacters(
				hiddenCharsRegExpMatch[2],
				REG_EXP_CAPTUR_LINE_FEEDING,
				t,
			);
			formattedValue = [...formattedValue, ...formattedContent];
		}

		if (hiddenCharsRegExpMatch[3]) {
			const formattedContent = replaceWhiteCharacters(
				hiddenCharsRegExpMatch[3],
				REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
				t,
			);
			formattedValue = [...formattedValue, ...formattedContent];
		}
	}
	return <span className={className}>{formattedValue}</span>;
}

FormatValueComponent.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
};

export default FormatValueComponent;
