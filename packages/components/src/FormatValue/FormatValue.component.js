import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import I18N_DOMAIN_COMPONENTS from '../constants';
import Icon from '../Icon';

import theme from './FormatValue.module.scss';

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
		const regExp = new RegExp('(' + value.trim() + ')');
		const hiddenCharsRegExpMatch = value.split(regExp);
		if (
			hiddenCharsRegExpMatch[0] ||
			hiddenCharsRegExpMatch[2] ||
			REG_EXP_LINE_FEEDING.test(value)
		) {
			formattedValue = hiddenCharsRegExpMatch
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
