import React from 'react';
import PropTypes from 'prop-types';

const primary = {
	color: '#9c0909',
	reverseColor: '#FFFFFF',
	hoverColor: '#f3ecec',
	hoverReverseColor: '#9c0909',
	selectedColor: '#d94949',
	selectedReverseColor: '#0f0f0f',
	isDefault: true,
};

const primaryDarker = {
	color: '#7e2f4e',
	reverseColor: '#FFFFFF',
	hoverColor: '#401727',
	hoverReverseColor: '#ffffff',
	selectedColor: '#b26d88',
	selectedReverseColor: '#000000',
};

export const defaultThemes = {
	primary,
	primaryDarker,
};

export function ThemeForm({ key, name, theme, onChange }) {
	function onValueChange(event, property) {
		return onChange(name, property, event.target.value);
	}
	function onDefaultChange() {
		return onChange(name, 'isDefault', !theme.isDefault);
	}

	return (
		<form>
			<div className="form-group">
				<div>
					<input id={`name-${key}`} className="form-control" value={name} onChange={event => onValueChange(event, 'name')} />
					<label htmlFor={`name-${key}`} className="control-label">Name</label>
				</div>
				<div className="checkbox">
					<label>
						<input id={`is-default-${key}`} type="checkbox" checked={theme.isDefault} onChange={onDefaultChange} />
						<span>Default theme</span>
					</label>
				</div>
			</div>

			<legend style={{ margin: 0 }}>Simple</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={theme.color} onChange={event => onValueChange(event, 'color')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={theme.reverseColor} onChange={event => onValueChange(event, 'reverseColor')} />
				</div>
			</div>

			<legend style={{ margin: 0 }}>Hover</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={theme.hoverColor} onChange={event => onValueChange(event, 'hoverColor')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={theme.hoverReverseColor} onChange={event => onValueChange(event, 'hoverReverseColor')} />
				</div>
			</div>

			<legend style={{ margin: 0 }}>Selected</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={theme.selectedColor} onChange={event => onValueChange(event, 'selectedColor')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={theme.selectedReverseColor} onChange={event => onValueChange(event, 'selectedReverseColor')} />
				</div>
			</div>
		</form>
	);
}
ThemeForm.propTypes = {
	key: PropTypes.any,
	name: PropTypes.string.isRequired,
	theme: PropTypes.shape({
		color: PropTypes.string,
		reverseColor: PropTypes.string,
		hoverColor: PropTypes.string,
		hoverReverseColor: PropTypes.string,
		selectedColor: PropTypes.string,
		selectedReverseColor: PropTypes.string,
		isDefault: PropTypes.bool,
	}),
	onChange: PropTypes.func.isRequired,
};
