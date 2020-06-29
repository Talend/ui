import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@talend/react-components';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_DATAGRID from '../../constant';
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
					aria-label={t('FORMAT_VALUE_SPACE_CHARACTER', { defaultValue: 'space character' })}
					className={classNames(theme['td-white-space-character'], 'td-white-space-character')}
					name="talend-empty-space"
				/>
			);
		case '\n':
			return (
				<span>
					<Icon
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
			return <span>{value}</span>;
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
 * addKeyAttribute - add key attribute in the array to avoid react warning
 *
 * @param  {Component} component component to modify
 * @param  {int} index     current index
 * @return {type}           shallow component with key attribute
 */
function addKeyAttribute(component, index) {
	return { ...component, key: index };
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

export function FormatValueComponent(props) {
	const { t } = useTranslation(I18N_DOMAIN_DATAGRID);
	let content = [];

	const hiddenCharsRegExpMatch = props.value.match(REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS);

	if (hiddenCharsRegExpMatch[1]) {
		content = replaceWhiteCharacters(
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
		content = [...content, ...formattedContent];
	}

	if (hiddenCharsRegExpMatch[3]) {
		const formattedContent = replaceWhiteCharacters(
			hiddenCharsRegExpMatch[3],
			REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
			t,
		);
		content = [...content, ...formattedContent];
	}

	return <span>{content.map(addKeyAttribute)}</span>;
}

FormatValueComponent.propTypes = {
	value: PropTypes.string,
};

export default FormatValueComponent;
