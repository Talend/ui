import React, { PropTypes } from 'react';
import Action from '../../Actions/Action';
import { headerClasses, renderActions } from './Header.component';

function HeaderCheckbox({ headerDefault, toggleAll, toggleAllLabel, onToggleAll }) {
	return (
		<header className={headerClasses()}>
			<div className="checkbox">
				<label htmlFor="toggle-all">
					<input
						id="toggle-all"
						type="checkbox"
						onChange={onToggleAll}
						checked={!!toggleAll}
					/>
					<strong>{toggleAllLabel}</strong>
				</label>
			</div>
			{headerDefault.length > 0 && renderActions(headerDefault)}
		</header>
	);
}

HeaderCheckbox.propTypes = {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	toggleAll: PropTypes.bool,
	onToggleAll: PropTypes.func,
	toggleAllLabel: PropTypes.string,
};

HeaderCheckbox.defaultProps = {
	toggleAllLabel: 'Toggle all',
};

export default HeaderCheckbox;
