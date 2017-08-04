import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
	SplitButton,
	MenuItem,
} from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../Icon';
import theme from './ActionSplitDropdown.scss';


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
function rClick(event, onClick, action, model) {
	return onClick(event, { action, model });
}

function ActionSplitDropdown(props) {
	const {
		icon,
		items,
		label,
		model,
		onClick,
		emptyDropdownLabel,
		className,
		...rest
	} = props;

	const Title = (
		<span>
			{icon ? <Icon name={icon} /> : null}
			<span>{label}</span>
		</span>
	);

	return (
		<SplitButton
			onClick={event => rClick(event, onClick, { label, ...rest }, model)}
			title={Title}
			id={uuid.v4()}
			className={classNames(className, theme['tc-split-dropdown'])}
			{...rest}
		>
			{
				items.length ?
					items.map((item, index) => (
						<MenuItem {...item} key={index}>
							{ item.icon && <Icon name={item.icon} /> }
							{ item.label }
						</MenuItem>
					)) : <MenuItem disabled>{emptyDropdownLabel}</MenuItem>
			}
		</SplitButton>
	);
}

ActionSplitDropdown.propTypes = {
	icon: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		icon: PropTypes.string,
		label: PropTypes.string,
		...MenuItem.propTypes,
	})).isRequired,
	label: PropTypes.string.isRequired,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func.isRequired,
	emptyDropdownLabel: PropTypes.string,
	className: PropTypes.string,
};

export default ActionSplitDropdown;
