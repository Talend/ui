import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@talend/react-components';

import theme from './FormatValue.scss';

export const REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS = /(^\s*)?([\s\S]*?)(\s*$)/;
export const REG_EXP_HAS_WHITE_SPACE_CHARACTERS = /(^\s*)?([\s\S]*?)(\s*$)/;
const REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS = /(\t| |\n)/g;
const REG_EXP_CAPTUR_LINE_FEEDING = /(\n)/g;
const REG_EXP_LINE_FEEDING = /\n/g;
const REG_EXP_WHITE_SPACE_CHARACTERS = /^\s/g;

/**
 * replaceCharacterByIcon - description
 *
 * @param  {string} value string to transform
 * @return {Component}    component with the replaced special characters by icon
 */
function replaceCharacterByIcon(value) {
	switch (value) {
		case '\t':
			return (
				<Icon
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
					className={classNames(theme['td-white-space-character'], 'td-white-space-character')}
					name="talend-empty-space"
				/>
			);
		case '\n':
			return (
				<span>
					<Icon
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
function replaceWhiteCharacters(content, regexp) {
	const splitting = content.split(regexp);
	return splitting.filter(isEmptyCharacter).map(replaceCharacterByIcon);
}

export default function FormatValue(props) {
	let content = [];

	const hiddenCharsRegExpMatch = props.value.match(REG_EXP_LEADING_TRAILING_WHITE_SPACE_CHARACTERS);

	if (hiddenCharsRegExpMatch[1]) {
		content = replaceWhiteCharacters(
			hiddenCharsRegExpMatch[1],
			REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
		);
	}

	if (hiddenCharsRegExpMatch[2]) {
		const formattedContent = replaceWhiteCharacters(
			hiddenCharsRegExpMatch[2],
			REG_EXP_CAPTUR_LINE_FEEDING,
		);
		content = [...content, ...formattedContent];
	}

	if (hiddenCharsRegExpMatch[3]) {
		const formattedContent = replaceWhiteCharacters(
			hiddenCharsRegExpMatch[3],
			REG_EXP_REPLACED_WHITE_SPACE_CHARACTERS,
		);
		content = [...content, ...formattedContent];
	}

	return <span>{content.map(addKeyAttribute)}</span>;
}

FormatValue.propTypes = {
	value: PropTypes.string,
};
