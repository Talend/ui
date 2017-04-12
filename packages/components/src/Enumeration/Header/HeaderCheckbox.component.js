import React, { PropTypes } from 'react';
import { headerClasses } from './Header.component';

function HeaderCheckbox({ toggleAll, onToggleAll }) {
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
					<span>
						<span className="sr-only">Toggle all</span>
					</span>
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
