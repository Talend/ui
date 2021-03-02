import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import uuid from 'uuid';
import theme from './ActionSplitDropdown.scss';
import wrapOnClick from '../wrapOnClick';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import ActionButton from '../ActionButton';
import ActionDropdown from '../ActionDropdown';

/**
 * @param {object} props react props
 * @example
 const props = {
	label: 'Add File',
	icon: 'fa fa-plus',
	onClick: action('onAdd'),
	items: [
		{
			label: 'From Local',
			onClick: action('From Local click'),
		},
		{
			label: 'From Remote',
			onClick: action('From Remote click'),
		},
	],
	emptyDropdownLabel: 'No option',
};
 <ActionSplitDropdown {...props} />
 */

export default function ActionSplitDropdown(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { items, label, emptyDropdownLabel, className, ...rest } = props;

	return (
		<>
			<ActionButton
				onClick={wrapOnClick(props)}
				title={label}
				id={uuid.v4()}
				className={classNames(className, theme['tc-split-dropdown'])}
				{...rest}
			/>
			<ActionDropdown
				items={
					items.length ? (
						items.map((item, index) => (
							<ActionButton {...item} key={index} onClick={wrapOnClick(item)} icon={item.icon}>
								{item.label}
							</ActionButton>
						))
					) : (
						<span>{emptyDropdownLabel}</span>
					)
				}
			>
				{t('ACTION_MENU_OPEN', { defaultValue: 'Open "{{label}}" menu', label })}
			</ActionDropdown>
		</>
	);
}

ActionSplitDropdown.displayName = 'ActionSplitDropdown';

ActionSplitDropdown.propTypes = {
	icon: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string,
			label: PropTypes.string,
		}),
	),
	label: PropTypes.string.isRequired,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func,
	emptyDropdownLabel: PropTypes.string,
	className: PropTypes.string,
	t: PropTypes.func,
};

ActionSplitDropdown.defaultProps = {
	items: [],
};
