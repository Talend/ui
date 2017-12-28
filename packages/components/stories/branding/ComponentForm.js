import React from 'react';
import PropTypes from 'prop-types';

export const defaultComponentsBranding = {
	headerBar: {
		reverse: true,
		theme: 'primaryDarker',
	},
	sidePanel: {
		reverse: true,
		theme: 'primary',
	},
};

export function ComponentForm({ key, name, component, onChange }) {
	function onThemeChange(event) {
		return onChange(name, 'theme', event.target.value);
	}
	function onReverseChange() {
		return onChange(name, 'reverse', !component.reverse);
	}

	return (
		<form>
			<legend>{name}</legend>
			<div className="form-group">
				<div>
					<input id={`comp-theme-${key}`} className="form-control" value={component.theme} onChange={onThemeChange} />
					<label htmlFor={`comp-theme-${key}`} className="control-label">Theme</label>
				</div>
				<div className="checkbox">
					<label>
						<input id={`reverseColor-${key}`} type="checkbox" checked={component.reverse} onChange={onReverseChange} />
						<span>Reverse Color</span>
					</label>
				</div>
			</div>
		</form>
	);
}
ComponentForm.propTypes = {
	key: PropTypes.any,
	name: PropTypes.string.isRequired,
	component: PropTypes.shape({
		theme: PropTypes.string,
		reverse: PropTypes.bool,
	}),
	onChange: PropTypes.func.isRequired,
};
