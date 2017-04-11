import React, { PropTypes } from 'react';
import { headerClasses } from './Header.component';

function HeaderCheckbox({ toggleAll, onToggleAll }) {
	return (
		<header className={headerClasses()}>
			<div className="checkbox">
				<label>
					<input
						type="checkbox"
					    onChange={onToggleAll}
						checked={!!toggleAll}
					/>
					<span>Toggle all</span>
				</label>
			</div>
		</header>
	);
}

HeaderCheckbox.propTypes = {
	toggleAll: PropTypes.bool,
	onToggleAll: PropTypes.func,
};

export default HeaderCheckbox;
