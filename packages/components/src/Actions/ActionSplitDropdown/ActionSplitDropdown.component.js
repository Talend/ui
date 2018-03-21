import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { SplitButton, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../Icon';
import theme from './ActionSplitDropdown.scss';
import { wrapOnClick } from '../Action/Action.component';

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

function ActionSplitDropdown(props) {
	const { icon, items, label, emptyDropdownLabel, className, ...rest } = props;

	const Title = (
		<span>
			{icon ? <Icon name={icon} /> : null}
			<span>{label}</span>
		</span>
	);

	return (
		<SplitButton
			onClick={wrapOnClick(props)}
			title={Title}
			id={uuid.v4()}
			className={classNames(className, theme['tc-split-dropdown'])}
			{...rest}
		>
			{items.length ? (
				items.map((item, index) => (
					<MenuItem {...item} key={index} onClick={wrapOnClick(item)}>
						{item.icon && <Icon name={item.icon} />}
						{item.label}
					</MenuItem>
				))
			) : (
				<MenuItem disabled>{emptyDropdownLabel}</MenuItem>
			)}
		</SplitButton>
	);
}

ActionSplitDropdown.displayName = 'ActionSplitDropdown';

ActionSplitDropdown.propTypes = {
	icon: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string,
			label: PropTypes.string,
			...MenuItem.propTypes,
		}),
	).isRequired,
	label: PropTypes.string.isRequired,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func,
	emptyDropdownLabel: PropTypes.string,
	className: PropTypes.string,
};

ActionSplitDropdown.defaultProps = {
	items: [],
};

export default ActionSplitDropdown;
