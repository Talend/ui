import React, { PropTypes } from 'react';
import Action from '../../Actions/Action';
import { headerClasses, renderActions } from './Header.component';

function HeaderCheckbox({ headerDefault, toggleAllChecked, toggleAllLabel, onToggleAll }) {
	const toggleAllId = 'toggle-all';
	return (
		<header className={headerClasses()}>
			<div className="checkbox">
				<label htmlFor={toggleAllId}>
					<input
						id={toggleAllId}
						type="checkbox"
						onChange={onToggleAll}
						checked={!!toggleAllChecked}
					/>
					<strong>{toggleAllLabel}</strong>
				</label>
			</div>
			{renderActions(headerDefault)}
		</header>
	);
}

HeaderCheckbox.propTypes = {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	toggleAllChecked: PropTypes.bool,
	toggleAllLabel: PropTypes.string,
	onToggleAll: PropTypes.func,
};

HeaderCheckbox.defaultProps = {
	toggleAllLabel: 'Toggle all',
};

export default HeaderCheckbox;
