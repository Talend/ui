import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ActionIconToggle } from '../../../Actions';

import theme from './IconsToggle.scss';

function IconsToggle({ id, options, onChange, selected }) {
	const [active, setActive] = useState(selected);

	function getActionIcon(option) {
		return (<ActionIconToggle
			key={option.name}
			id={`${id}-${option.name}`}
			icon={option.icon}
			label={option.label}
			aria-label={option.ariaLabel}
			active={active === option.name}
			disabled={active === option.name}
			onClick={e => {
				setActive(option.name);
				onChange(e, option.name);
			}}
		/>);
	}

	return (<div className={classNames(theme['tc-display-mode-toggle'], 'tc-display-mode-toggle')}>
		{ options.map(getActionIcon) }
	</div>);
}

IconsToggle.propTypes = {
	id: PropTypes.string,
	selected: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		icon: PropTypes.string,
		label: PropTypes.string,
		ariaLabel: PropTypes.string,
	})),
	onChange: PropTypes.func.isRequired,
};

export default IconsToggle;
